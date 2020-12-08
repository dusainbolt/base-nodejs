class Validate {

    static get_validate_content_after_lesson() {
        return _yup.object().shape({
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
        });
    };

    static get_validate_change_status_class() {
        return _yup.object().shape({
            classId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (classId) => _mongoose.Types.ObjectId.isValid(classId)),
            status: _yup.string().required(),
        });
    };

    static get_validate_join_class() {
        return _yup.object().shape({
            classId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (classId) => _mongoose.Types.ObjectId.isValid(classId)),
        });
    };

    static get_validate_change_avatar_class() {
        return _yup.object().shape({
            avatar: _yup.string().required(),
            classId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (classId) => _mongoose.Types.ObjectId.isValid(classId)),
        });
    };

    static get_validate_add_manage_lesson() {
        return _yup.object().shape({
            status: _yup.string().required(),
            expectedTime: _yup.number().required(),
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
        });
    }

    static get_validate_add_comment_question() {
        return _yup.object().shape({
            message: _yup.string().required().max(700),
            questionId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (questionId) => _mongoose.Types.ObjectId.isValid(questionId)),
        });
    }

    static get_validate_list_comment_for_question() {
        return _yup.object().shape({
            questionId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (questionId) => _mongoose.Types.ObjectId.isValid(questionId)),
        });
    }

    static get_validate_list_question_for_lesson() {
        return _yup.object().shape({
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
        });
    }

    static get_validate_insert_list_quit_lesson() {
        return _yup.object().shape({
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
            listUserIdQuit: _yup.string().required(),
        });
    }

    static get_validate_start_lesson() {
        return _yup.object().shape({
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
            status: _yup.string().required(),
        });
    }

    static get_validate_reply_exercise() {
        return _yup.object().shape({
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
            manageId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (manageId) => _mongoose.Types.ObjectId.isValid(manageId)),
            userId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (userId) => _mongoose.Types.ObjectId.isValid(userId)),
            value: _yup.string().required(),
        });
    }

    static get_validate_admin_get_lesson() {
        return _yup.object().shape({
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
        });
    }

    static get_validate_get_lesson_id() {
        return _yup.object().shape({
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
        });
    }

    static get_validate_get_manage_lesson() {
        return _yup.object().shape({
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
            classId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (classId) => _mongoose.Types.ObjectId.isValid(classId)),
        });
    }


    static get_validate_get_user_class() {
        return _yup.object().shape({
            classId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (classId) => _mongoose.Types.ObjectId.isValid(classId)),
        });
    }

    static get_validate_add_question() {
        return _yup.object().shape({
            message: _yup.string().required().max(700),
            lessonId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (lessonId) => _mongoose.Types.ObjectId.isValid(lessonId)),
        });
    }

    static get_validate_add_subject() {
        return _yup.object().shape({
            name: _yup.string().required().max(100),
            description: _yup.string().required().max(255),
        });
    }
    static get_validate_add_lesson() {
        return _yup.object().shape({
            title: _yup.string().required().max(255),
            description: _yup.string().required().max(255),
            expectedTime: _yup.number().required(),
            duration: _yup.number().required(),
            classId: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (classId) => _mongoose.Types.ObjectId.isValid(classId)),
        });
    }

    static get_validate_add_class() {
        return _yup.object().shape({
            name: _yup.string().required().max(255),
            subject: _yup.string().required().test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                (subject) => _mongoose.Types.ObjectId.isValid(subject)),
        });
    }

    static get_validate_send_email_notify_course() {
        return _yup.object().shape({
            message: _yup.string().required(),
            subject: _yup.string().required().max(255),
            noteClick: _yup.string().max(255),
            link: _yup.string()
                .when('noteClick', {
                    is: (noteClick) => noteClick,
                    then: _yup.string().required()
                })
        });
    }

    /**
     * Phục vụ _registration
     */
    // co the them shape({...}).test(userName == pass)
    static get_validate_register(user_model) {
        return _yup.object().shape({
            fullName: _yup.string().required().min(2).max(50),
            email: _yup.string().required().email()
                .test('duplicate_email', _res.ERROR_CODE.DUPLICATE_EMAIL,
                    async (email) => await user_model.findOne({email}) === null),
            gender: _yup.number().required().max(3),
            job:_yup.string().required().max(50),
            jobAddress: _yup.string().required().max(50),
            birthday: _yup.number().required(),
            facebook: _yup.string().required().url(),
            country: _yup.string().required().max(50),
            phoneNumber: _yup.string().max(13),
            frequency: _yup.number().max(3),
            durationTime: _yup.number().max(3),
            targetTop: _yup.number().max(3),
            wishJob: _yup.number().max(3),
            completeExercise: _yup.number().max(3),
            outCondition: _yup.number().max(3),
            nowSkill: _yup.string().required(),
            mission: _yup.string().required(),

        });
    };
    /**
    * Phục vụ verify_code (register...)
    */
    static get_validate_verify_code(user_model) {
        return _yup.object().shape({
            email: _yup.string().required().email()
                .test('duplicate_email', _res.ERROR_CODE.DUPLICATE_EMAIL,
                    async (email) => await user_model.findOne({email}) === null),
            code: _yup.string().required().length(6)
        });
    };
    /**
     * Phục vụ dang nhap - Login
     */
    static get_validate_login(user_model) {
        return _yup.object().shape({
            email: _yup.string().required().email()
                .test('invalid', _res.ERROR_CODE.INVALID_EMAIL,
                    async (email) => await user_model.findOne({email}) !== null),
            password: _yup.string().required().min(6).max(21),
        });
    };

    static get_validate_change_avatar() {
        return _yup.object().shape({
            avatar: _yup.string().required(),
        });
    };

    /**
     * Phục vụ get_all gender
     */
    static get_validate_get_all_gender() {
        return _yup.object().shape({
            status: _yup.number().required()
        });
    }

    static get_validate_course_detail() {
        return _yup.object().shape({
            userId: _yup.string().required()
                .test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                    (userId) => _mongoose.Types.ObjectId.isValid(userId)),
        });
    }

    static get_validate_request_course() {
        return _yup.object().shape({
            reply: _yup.string().required().max(255),
            status: _yup.number().required()
                .test('invalid status', _res.ERROR_CODE.INVALID_VALUE,
                    (status) => status === _contains.COURSE.STATUS.REJECT || status === _contains.COURSE.STATUS.APPROVE),
            courseId: _yup.string().required()
                .test('invalid_objectId', _res.ERROR_CODE.INVALID_OBJECT_ID,
                    (courseId) => _mongoose.Types.ObjectId.isValid(courseId)),
        });
    }
}

module.exports = Validate;