const validate_helper = require(`../utils/validate`);
const lesson_model = require(`../models/lesson`);
const user_model = require(`../models/user`);
const lesson_manage_model = require(`../models/lesson_manage`);
const class_model = require(`../models/class`);
const point_model = require(`../models/point`);

class Lesson {
    constructor() {
    }

    async _get_my_list_lesson(req, res) {
        try {
            _log.log(`params`, req.query);
            const params = _helper.getParamsSearch(req.query);
            const options = {
                offset: params.count_skip,
                limit: params.page_size,
                sort: {[params.sort_by]: _logic[params.sort_type]},
                populate: {path: 'listManage', match: {user: req.user._id}}
            }
            const my_list_lesson = await lesson_model.paginate({
                class: req.user.class,
                show: _contains.LESSON.ACTIVE,
                status: _contains.LESSON.STATUS.END,
            }, options);
            return res.send(_helper.render_response_success(req, my_list_lesson, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_my_list_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _content_after_lesson(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_content_after_lesson().validate(req.body);
            const {lessonId, youtubeUrl, questionExercise} = req.body;
            const data_update = {youtubeUrl, questionExercise};
            await lesson_model.findByIdAndUpdate(lessonId, data_update);
            return res.send(_helper.render_response_success(req, {youtubeUrl, questionExercise}, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_content_after_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _reply_after_lesson(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_content_after_lesson().validate(req.body);
            const {lessonId, exerciseUrl, replyExercise} = req.body;
            const data_update = {exerciseUrl, replyExercise};
            await lesson_manage_model.findOneAndUpdate(
                {lesson: lessonId, user: req.user._id},
                data_update);
            return res.send(_helper.render_response_success(req, {exerciseUrl, replyExercise}, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_reply_after_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _add_manage_lesson(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_add_manage_lesson().validate(req.body);
            const {status, description, lessonId, expectedTime} = req.body;
            const durationTime = Math.floor(new Date().getTime() / 1000) - expectedTime;
            const is_join = parseInt(status) === _contains.LESSON.STATUS_MANAGE.JOINED;
            if (is_join) {
                if (durationTime > _logic.JOIN_DURATION_TIME) {
                    return res.send(_helper.render_response_error(req, null, _res.ERROR_CODE.JOIN_DURATION_TIME, _res.MESSAGE.JOIN_DURATION_TIME));
                }
            }else{
                if(durationTime > _logic.REJECT_DURATION_TIME){
                    return res.send(_helper.render_response_error(req, null, _res.ERROR_CODE.REJECT_DURATION_TIME, _res.MESSAGE.REJECT_DURATION_TIME));
                }
            }
            let new_point;
            if(is_join){
                new_point = await new point_model({
                    value: _logic.POINT.JOIN_LESSON,
                    lesson: lessonId,
                    user: req.user._id,
                }).save();
            }
            const new_manage = await new lesson_manage_model({
                status, description, lesson: lessonId, user: req.user._id, pointManage: is_join ? new_point._id : null,
            }).save();
            req.user.addPoint(new_point._id);
            await lesson_model.findByIdAndUpdate(lessonId, {$addToSet: {listManage: new_manage._id}});
            return res.send(_helper.render_response_success(req, new_manage, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_add_manage_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _reply_exercise(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_reply_exercise().validate(req.body);
            // const {lessonId, status} = req.body;
            // const timeEvent = Math.floor(new Date().getTime() / 1000);
            // await lesson_model.findByIdAndUpdate(lessonId, {
            //     $set: {
            //         status,
            //         [parseInt(status) === _contains.LESSON.STATUS.HAPPENING ? `startTime` : `endTime`]: timeEvent
            //     }
            // });
            return res.send(_helper.render_response_success(req, null, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_start_end_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _start_end_lesson(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_start_lesson().validate(req.body);
            const {lessonId, status} = req.body;
            const timeEvent = Math.floor(new Date().getTime() / 1000);
            await lesson_model.findByIdAndUpdate(lessonId, {
                $set: {
                    status,
                    [parseInt(status) === _contains.LESSON.STATUS.HAPPENING ? `startTime` : `endTime`]: timeEvent
                }
            });
            return res.send(_helper.render_response_success(req, {status, timeEvent}, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_start_end_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_my_lesson(req, res) {
        try {
            _log.log(`params`, req.query);
            const my_lesson = await user_model.findById(req.user._id).populate({
                path: 'class',
                populate: {
                    path: 'listLesson', match:
                        {show: {$eq: _contains.LESSON.ACTIVE}, status: {$ne: _contains.LESSON.STATUS.END}}
                }
            }).select({fullName: 1});
            return res.send(_helper.render_response_success(req, my_lesson, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_my_lesson`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_lesson_item(req, res) {
        try {
            _log.log(`params`, req.query);
            await validate_helper.get_validate_get_lesson_id().validate(req.query);
            const my_lesson = await user_model.findById(req.user._id).populate({
                path: 'class',
                populate: {path: 'listLesson', $match: {_id: {$ne: req.query.lessonId}}}
            }).select({fullName: 1});
            return res.send(_helper.render_response_success(req, my_lesson, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_lesson_item`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _insert_list_quit(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_insert_list_quit_lesson().validate(req.body);
            const {listUserIdQuit, lessonId} = req.body;
            const arr_user_quit = listUserIdQuit.split(",");

            // tao data point quit
            const data_insert_point = arr_user_quit.map(user => ({
                type: _contains.POINT.TYPE.QUIT_LESSON,
                user,
                lesson: lessonId,
                value: _logic.POINT.QUIT_LESSON
            }));

            // them point quit vao bang point
            const list_point_quit = await point_model.insertMany(data_insert_point);

            // add point quit to user
            await Promise.all(arr_user_quit.map((user, index) => {
                return  user_model.findByIdAndUpdate(user, {$addToSet: {point: list_point_quit[index]._id}});
            }));

            // tao data lesson quit
            const data_insert = arr_user_quit.map((user, index) => ({
                status: _contains.LESSON.STATUS_MANAGE.QUIT,
                user,
                lesson: lessonId,
                pointManage: list_point_quit[index]._id,
            }));

            const list_manage = await lesson_manage_model.insertMany(data_insert);
            const list_manage_id = list_manage.map(item => item._id);

            // update list id lesson manage vao lesson
            const lesson_update = await lesson_model.findByIdAndUpdate(lessonId, {
                "$push": {"listManage": {"$each": list_manage_id}}
            })
            return res.send(_helper.render_response_success(req, lesson_update, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_insert_list_quit`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_manage_lesson(req, res) {
        try {
            _log.log(`params`, req.query);
            await validate_helper.get_validate_admin_get_lesson().validate(req.query);
            const {classId, lessonId} = req.query;
            const lesson_manage = await lesson_model.findById(lessonId).populate({
                path: 'listManage',
                populate: {
                    path: 'user', select: _contains.USER.PARAMS_AVATAR,
                },
                options: {sort: {[_logic.SORT_CREATE]: _logic.DESC}}
            }).select({_id: 1});
            const list_user_join = lesson_manage.listManage.map(item => {
                return item.user._id;
            });

            const list_user_quit = await class_model.findById(classId).populate(
                {
                    path: 'listUser', select: _contains.USER.PARAMS_AVATAR,
                    match: {_id: {$nin: list_user_join}},
                }
            ).select({_id: 1});
            return res.send(_helper.render_response_success(req, {
                lesson_manage,
                list_user_quit
            }, _res.MESSAGE.SUCCESS));

        } catch (e) {
            _log.err(`_get_manage_lesson`, e);
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
            },
                {
                    path: 'listManage',
                    populate: {
                        path: 'user', select: _contains.USER.PARAMS_AVATAR,
                    },
                    options: {sort: {[_logic.SORT_CREATE]: _logic.DESC}}
                }
            ]);
            const listUserJoin = lesson.listManage.map(item => {
                return item.user._id;
            });

            const listUserQuit = await class_model.findById(lesson.class._id).populate(
                {
                    path: 'listUser', select: _contains.USER.PARAMS_AVATAR,
                    match: { _id: { $nin: listUserJoin  } },
                }
            ).select({_id: 1});
            return res.send(_helper.render_response_success(req, {lesson, listUserQuit}, _res.MESSAGE.SUCCESS));
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