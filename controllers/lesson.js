const validate_helper = require(`../utils/validate`);
const lesson_model = require(`../models/lesson`);

class Subject {
    constructor() {
    }

    async _get_list(req, res) {
        try {
            _log.log(`params`, req.query);
            await validate_helper.get_validate_get_user_class().validate(req.query);
            const params = _helper.getParamsSearch(req.query);
            const options = {
                offset: params.count_skip,
                limit: params.page_size,
                sort: {[params.sort_by]: _logic[params.sort_type]},
                populate: [{path: 'class'}]
            }
            const dataLesson = await lesson_model.paginate({class: req.query.classId}, options);
            return res.send(_helper.render_response_success(req, dataLesson, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Subject;