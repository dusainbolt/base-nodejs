const validate_helper = require(`../utils/validate`);
const user_model = require(`../models/user`);
const course_rq_model = require(`../models/course_rq`);
const moment = require(`moment`);
const bcrypt = require('bcryptjs');

class Course {

    constructor() {
    }

    async _email_notify_account_all(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_send_email_notify_course().validate(req.body);
            const {message, subject, noteClick, link} = req.body;

            // search rgex
            // const searchFullName = new RegExp('Lục Tuấn Nam', "i");
            // fullName: {$regex: searchFullName},
            const list_email_user_course = await user_model.find({
                role: _contains.USER.ROLE.USER_COURSE,
                status: _contains.USER.STATUS.ACTIVE,
            }).select({email: 1, birthday: 1, fullName: 1, _id: false});
            const subject_notify = `${_logic.SUBJECT_NOTIFY} - ${subject}`;
            list_email_user_course.map((user, index) => {
                 _helper.send_email( `dulh${index}181199@gmail.com`, subject_notify, _logic.TEMPLATE_EMAIL_NOTIFY_ACCOUNT, {
                    fullName: user.fullName, link, myName: _logic.NAME, message, noteClick,
                    onClick: !!noteClick,
                    email: user.email,
                    password: moment.unix(user.birthday).format("DD/MM/YYYY")
                });
            });
            return res.send(_helper.render_response_success(req, null, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _request_course(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_request_course().validate(req.body);
            const {reply, status, courseId} = req.body;
            await course_rq_model.findOneAndUpdate({_id: courseId}, {status, reply});
            const userRequest = await user_model.findOne({courseRequest: courseId}, _contains.USER.PARAMS_EMAIl_REQUEST_COURSE);
            _helper.send_email(userRequest.email, _logic.SUBJECT_REQUEST_COURSE, _logic.TEMPLATE_COURSE_RQ, {
                status: parseInt(status) === _contains.COURSE.STATUS.APPROVE,
                fullName: userRequest.fullName,
                facebookGroup: _logic.FB_GROUP_NOW,
                myName: _logic.NAME,
                reply,
            });
            return res.send(_helper.render_response_success(req, userRequest.email, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_request_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_detail(req, res) {
        try {
            _log.log(`params`, req.query);
            await validate_helper.get_validate_course_detail().validate(req.query);
            const courseDetail = await course_rq_model.findOne({user: req.query.userId});
            return res.send(_helper.render_response_success(req, courseDetail, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`get_detail_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_list_user(req, res) {
        try {
            _log.log(`params`, req.query);
            const {sortType, sortBy, pageSize, pageNum} = req.query;
            const sort_type = sortType ? sortType : _logic.TYPE_ASC;
            const sort_by = sortBy ? sortBy : _logic.SORT_CREATE;
            const page_size = pageSize ? pageSize : _logic.PAGE_SIZE;
            const count_skip = pageNum ? pageNum * page_size : _logic.PAGE_SKIP;
            const options = {
                offset: parseInt(count_skip),
                limit: parseInt(page_size),
                select: _contains.COURSE.PRAMS_COURSE_USER,
                sort: {[sort_by]: _logic[sort_type]},
                populate: {path: 'user', select: _contains.USER.PARAMS_COURSE_LIST},
            }
            const dataCourse = await course_rq_model.paginate({}, options);
            return res.send(_helper.render_response_success(req, dataCourse, _res.MESSAGE.SUCCESS));

        } catch (e) {
            _log.err(`_get_list_user`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _register(req, res) {
        try {
            _log.log(`Body`, req.body);
            return res.send(_helper.render_response_error(req, null, _res.ERROR_CODE.REGISTER_CLOSE, _res.MESSAGE.REGISTER_CLOSE));
            // await validate_helper.get_validate_register(user_model).validate(req.body);
            // const {email} = req.body;
            // const code = _helper.render_verify_code();
            // //set info register to redis
            // const register_data = JSON.stringify({...req.body, code});
            // _redis.select(_logic.DBO_REGISTER);
            // _redis.set(`${_logic.SUB_REGISTER_COURSE}${email}`, register_data, _logic.REDIS_EXPIRES, _logic.TIME_OUT_REGISTER);
            // // convert code & send email to user
            // const array_code_verify = code.toString().split("");
            // const time_out = new moment().add(_logic.TIME_OUT_REGISTER, `seconds`).format(_logic.FORMAT_24H_TIME);
            // _helper.send_email(email, _logic.SUBJECT_REGISTER, _logic.TEMPLATE_EMAIL, {array_code_verify, time_out});
            // return res.send(_helper.render_response_success(req, {email}, _res.MESSAGE.REGISTER_SUCCESS));
        } catch (e) {
            _log.err(`register`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _verify_code(req, res) {
        try {
            _log.log(`Body`, req.body);
            const {email, code} = req.body;
            await validate_helper.get_validate_verify_code(user_model).validate(req.body);
            // goi data tu redis va xu ly
            const channel_key = `${_logic.SUB_REGISTER_COURSE}${email}`;
            _redis.select(_logic.DBO_REGISTER);
            _redis.get(channel_key, async (err, reply) => {
                const receiver_register = JSON.parse(reply);
                if (err) {
                    return res.send(_helper.render_response_error(req, err, _res.ERROR_CODE.REDIS_ERROR, _res.MESSAGE.REDIS_ERROR));
                } else if (!receiver_register) {
                    return res.send(_helper.render_response_error(req, err, _res.ERROR_CODE.REDIS_REGISTER_NOT_FOUND, _res.MESSAGE.REGISTER_NOT_FOUND));
                } else if (parseInt(code) === receiver_register.code) {
                    const passwordBirthday = moment.unix(receiver_register.birthday).format("DD/MM/YYYY");
                    const user_register = await user_model.create({
                        ...receiver_register,
                        password: await bcrypt.hash(passwordBirthday, _config.BCRYPT.SALT),
                        role: _contains.USER.ROLE.USER_COURSE,
                    });
                    const course_rq = await course_rq_model.create({
                        ...receiver_register,
                        user: user_register._id,
                    });
                    user_register.courseRequest = course_rq._id;
                    await user_register.save();
                    _redis.del(channel_key, (err, response) => {
                        if (err && response !== 1) _log.err(`Deleted key error: `, err);
                    });
                    return res.send(_helper.render_response_success(req, {
                        course_rq,
                        user_register
                    }, _res.MESSAGE.REGISTER_SUCCESS));
                } else {
                    return res.send(_helper.render_response_error(req, null, _res.ERROR_CODE.VERIFY_CODE_INVALID, _res.MESSAGE.VERIFY_CODE_INVALID));
                }
            });
        } catch (e) {
            _log.err(`verify_code`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Course;