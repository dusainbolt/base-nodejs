const constants = require(`../constants/constants.js`);

class Validate {
    /**
    * Phục vụ _registration
    */
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
            country: _yup.string().required().max(100),
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
    static get_validate_login() {
        return _yup.object().shape({
            email: _yup.string().required().email(),
            password: _yup.string().required().min(6).max(21),
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
}

module.exports = Validate;