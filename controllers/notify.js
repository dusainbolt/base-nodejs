const validate_helper = require(`../utils/validate`);
const user_model = require(`../models/user`);
const notify_model = require(`../models/notify`);
const moment = require(`moment`);

class Notify {
    constructor() {
    }

    async _get_list(req, res) {
        try {
            _log.log(`params`, req.query);
            const params = _helper.getParamsSearch(req.query);
            const options = {
                offset: params.count_skip,
                limit: params.page_size,
                sort: {[params.sort_by]: _logic[params.sort_type]},
                populate: {path: 'user', select: _contains.USER.PARAMS_NOTIFY},
            }
            const dataNotify = await notify_model.paginate({}, options);
            return res.send(_helper.render_response_success(req, dataNotify, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_list`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _email_account_system(req, res) {
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
            const notify = await notify_model.create({subject, message, link, user: req.user._id});
            list_email_user_course.map((user, index) => {
                if(index === 0 || index === 3){
                    _helper.send_email(user.email, subject_notify, _logic.TEMPLATE_EMAIL_NOTIFY_ACCOUNT, {
                        fullName: user.fullName, link, myName: _logic.NAME, message, noteClick,
                        onClick: !!noteClick,
                        email: user.email,
                        password: moment.unix(user.birthday).format(_logic.FORMAT_DATE_UTC)
                    });
                }
            });
            return res.send(_helper.render_response_success(req, notify, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Notify;