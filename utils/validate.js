const constants = require(`../constants/constants.js`);

class Validate {
    /**
    * Phục vụ _registration
    */
    static get_validate_register(user_model) {
        return _yup.object().shape({
            firstName: _yup.string().required().min(2).max(11),
            name: _yup.string().required().min(2).max(11),
            email: _yup.string().required().email()
                .test('duplicate_email', _res.ERROR_CODE.DUPLICATE_EMAIL,
                    async (email) => await user_model.findOne({email}) === null),
            password: _yup.string().required().min(6).max(21),
            genderId: _yup.string().required()
                .test('invalid-genderId', _res.ERROR_CODE.INVALID_GENDER_ID,
                    (genderId) => _mongoose.Types.ObjectId.isValid(genderId)),
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