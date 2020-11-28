const validate_helper = require(`../utils/validate`);
const subject_model = require(`../models/subject`);

class Subject {
    constructor() {
    }

    async _add_subject(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_add_subject().validate(req.body);
            const new_subject = subject_model.create({
                name: req.body.name,
                user: req.user._id,
            });
            return res.send(_helper.render_response_success(req, new_subject, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_subject_info(req, res) {
        try {
            _log.log(`params`, req.query);
            const dataSubject = await subject_model.find({}).select(_contains.SUBJECT.PARAMS_ALL_INFO);
            return res.send(_helper.render_response_success(req, dataSubject, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
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
            const dataSubject = await subject_model.paginate({}, options);
            return res.send(_helper.render_response_success(req, dataSubject, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Subject;