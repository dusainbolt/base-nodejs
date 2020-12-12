const validate_helper = require(`../utils/validate.js`);
const user_model = require(`../models/user`);
const lesson_manage_model = require(`../models/lesson_manage`);
const point_model = require(`../models/point`);

const bcrypt = require('bcryptjs')

class User {
    constructor() {
    }

    async _test(req, res) {
        try {
            return res.send({
                status: _res.STATUS.SUCCESS,
                message: _res.MESSAGE.SUCCESS,
                data: _helper.encode_data(req, data),
            });
        } catch (e) {
            _log.err(`_test`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _change_avatar(req, res) {
        try {
            await validate_helper.get_validate_change_avatar().validate(req.body);
            const {user, body: {avatar}} = req;
            const params = _helper.getPramsUpload(avatar, _logic.FOLDER_COURSE_AVATAR, user._id);
            if (!params.Key) {
                return res.send(_helper.render_response_error(req, null, _res.ERROR_CODE.SIZE_IMAGE, _res.MESSAGE.IMAGE_SIZE));
            }
            if (user.avatar && user.avatar.indexOf(_logic.URL_S3) !== -1) {
                _helper.deleteImageFromS3(user.avatar);
            }
            const {Location} = await new Promise((resolve, reject) => {
                _s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
            });
            user.avatar = Location;
            await user.save();
            return res.send(_helper.render_response_success(req, {avatar: Location}, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`change_avatar`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _login(req, res) {
        try {
            _log.log(`Body`, req.body);
            await validate_helper.get_validate_login(user_model).validate(req.body);
            const {email, password} = req.body;
            const user = await user_model.findOne({email, status: _contains.USER.STATUS.ACTIVE});
            const isPasswordMatch = user ? await bcrypt.compare(password, user.password) : false;
            if (!isPasswordMatch) {
                _log.log(_res.MESSAGE.ACCOUNT_INVALID);
                return res.send(_helper.render_response_error(req, null, _res.ERROR_CODE.INVALID_EMAIL, _res.MESSAGE.ACCOUNT_INVALID));
            }
            const token = await user.generateAuthToken();
            return res.send(_helper.render_response_success(req, {user, token}, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`login`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_dashboard(req, res) {
        try {
            _log.log(`params`, req.query);
            const user = req.user;
            const user_data = await user.populate('point').execPopulate();
            const point_history = user_data.point;
            const lesson_history = await lesson_manage_model.find({user: user._id}).populate('lesson').select({status: 1, exerciseUrl: 1});
            // tong so buoi hoc user da join
            const total_join = _.filter(lesson_history, {status: _contains.LESSON.STATUS_MANAGE.JOINED}).length;

            // tong so bai tap user phai lam
            const total_lesson_exercise = _.filter(lesson_history, manage => {
                if(manage.lesson.class.equals(user.class)) return manage;
            }).length;

            //tong so bai tap user da nop
            const total_exercise = _.filter(lesson_history, item => item.exerciseUrl).length;

            // diem trung binh cham bai tap
            const arr_point_exercise = _.filter(point_history, {type: _contains.POINT.TYPE.REPLY_QUESTION});
            const avg_point = _.meanBy(arr_point_exercise, point => point.value);

            // tong so point user co
            const total_point = _.sumBy(point_history, point => point.value);

            return res.send(_helper.render_response_success(req, {
                total_join, total_lesson: lesson_history.length, total_exercise,
                avg_point, total_point, total_lesson_exercise
            }, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`login`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_refresh_user(req, res) {
        try {
            const {user} = req;
            _log.log(_res.MESSAGE.SUCCESS);
            return res.send(_helper.render_response_success(req, {user}, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`login`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _logout(req, res){
        try {
            const { user } = req;
            user.tokens = user.tokens.filter((token) => {
                return token.token !== req.token;
            })
            await user.save();
            return res.send(_helper.render_response_success(req, null, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`logout`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _logout_all(req, res){
        try {
            req.user.tokens.splice(0, req.user.tokens.length);
            await req.user.save();
            return res.send(_helper.render_response_success(req, null, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`logout`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = User;
