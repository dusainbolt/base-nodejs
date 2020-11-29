const validate_helper = require(`../utils/validate`);
const class_model = require(`../models/class`);
const user_model = require(`../models/user`);

class Subject {
    constructor() {
    }

    async _get_list_user(req, res) {
        try {
            _log.log(`params`, req.query);
            await validate_helper.get_validate_get_user_class().validate(req.query);
            const params = _helper.getParamsSearch(req.query);
            const options = {
                offset: params.count_skip,
                limit: params.page_size,
                select: _contains.USER.PARAMS_CLASS,
                sort: {[params.sort_by]: _logic[params.sort_type]},
            }
            const data_user = await user_model.paginate({class: req.query.classId}, options);
            return res.send(_helper.render_response_success(req, data_user, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_one_class(req, res) {
        try {
            _log.log(`params`, req.query);
            await validate_helper.get_validate_get_user_class().validate(req.query);
            const data_class = await class_model.findById(req.query.classId);
            return res.send(_helper.render_response_success(req, data_class, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _add_class(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_add_class().validate(req.body);
            const {name, subject} = req.body;
            const new_class = await class_model.create({name, subject, user: req.user._id,});
            return res.send(_helper.render_response_success(req, new_class, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_add_class`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_list(req, res) {
        try {
            _log.log(`params`, req.query);
            const params = _helper.getParamsSearch(req.query);
            const options = {
                offset: params.count_skip,
                limit: params.page_size,
                sort: {[params.sort_by]: _logic[params.sort_type]},
                populate: [{path: 'user', select: _contains.USER.PARAMS_NOTIFY}]
            }
            const data_class = await class_model.paginate({}, options);
            return res.send(_helper.render_response_success(req, data_class, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_list`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Subject;