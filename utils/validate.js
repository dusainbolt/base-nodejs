class Validate {

    static get_validate_add_subject() {
        return _yup.object().shape({
            name: _yup.string().required().max(255),
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