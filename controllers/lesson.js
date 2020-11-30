const validate_helper = require(`../utils/validate`);
const lesson_model = require(`../models/lesson`);
const user_model = require(`../models/user`);
const lesson_manage_model = require(`../models/lesson_manage`);

class Lesson {
    constructor() {
    }

    async _add_manage_lesson(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_add_manage_lesson().validate(req.body);
            const {status, description, lessonId} = req.body;
            const new_manage = await new lesson_manage_model({
                status, description, lesson: lessonId, user: req.user._id
            }).save();
            await lesson_model.findByIdAndUpdate(lessonId, {$push: {listManage: new_manage._id}});
            return res.send(_helper.render_response_success(req, new_manage, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_add_manage_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_my_lesson(req, res) {
        try {
            _log.log(`body`, req.body);
            const my_lesson = await user_model.findById(req.user._id).populate({
                path: 'class',
                populate: {path: 'listLesson', match: {status: {$gte: _contains.LESSON.STATUS.QUESTION}}}
            }).select({fullName: 1});
            return res.send(_helper.render_response_success(req, my_lesson, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_my_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_manage_lesson(req, res) {
        try {
            _log.log(`params`, req.query);
            await validate_helper.get_validate_admin_get_lesson().validate(req.query);
            const lesson_manage = await lesson_model.findById(req.query.lessonId).populate({
                path: 'listManage',
                populate: {
                    path: 'user', select: _contains.USER.PARAMS_AVATAR,
                },
                options: {sort: {[_logic.SORT_CREATE]: _logic.DESC}}
            }).select({_id: 1});
            return res.send(_helper.render_response_success(req, lesson_manage, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_admin_get_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_admin_get_lesson(req, res) {
        try {
            _log.log(`params`, req.query);
            await validate_helper.get_validate_admin_get_lesson().validate(req.query);
            const lesson = await lesson_model.findById(req.query.lessonId).populate([{
                path: 'listQuestion',
                populate: [{
                    path: 'user', select: _contains.USER.PARAMS_AVATAR,
                }, {
                    path: 'listComment',
                    populate: {path: 'user', select: _contains.USER.PARAMS_AVATAR}
                }]
            }, {
                path: 'class',
            }]);
            return res.send(_helper.render_response_success(req, lesson, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_admin_get_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }


    async _add_lesson(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_add_lesson().validate(req.body);
            const {classId, title, description, expectedTime, duration} = req.body;
            let new_lesson = await new lesson_model({
                class: classId, title, description, expectedTime, duration, user: req.user._id
            }).save();
            await class_model.findByIdAndUpdate(classId,{$push:{listLesson: new_lesson._id}} );
            return res.send(_helper.render_response_success(req, new_lesson, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_add_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
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
            }
            const dataLesson = await lesson_model.paginate({class: req.query.classId}, options);
            return res.send(_helper.render_response_success(req, dataLesson, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_list`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Lesson;