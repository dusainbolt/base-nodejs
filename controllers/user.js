const validate_helper = require(`../utils/validate.js`);
const user_model = require(`../models/user.js`);
const bcrypt = require('bcryptjs')

class User {
    constructor() {
    }

    async _test(req, res) {
        try {
            return res.send({
                status: _res.STATUS.SUCCESS,
                message: _res.MESSAGE.SUCCESS,
                data: _helper.encode_data(req, data),
            });
        } catch (e) {
            _log.err(`_test`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _change_avatar(req, res) {
        try {
            await validate_helper.get_validate_change_avatar().validate(req.body);
            const {user, body: {avatar}} = req;
            const params = _helper.getPramsUpload(avatar, _logic.FOLDER_COURSE_AVATAR, user._id);
            if (!params.Key) {
                return res.send(_helper.render_response_error(req, null, _res.ERROR_CODE.SIZE_IMAGE, _res.MESSAGE.IMAGE_SIZE));
            }
            if (user.avatar && user.avatar.indexOf(_logic.URL_S3) !== -1) {
                _helper.deleteImageFromS3(user.avatar);
            }
            console.log(user);
            const {Location} = await new Promise((resolve, reject) => {
                _s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
            });
            user.avatar = Location;
            await user.save();
            return res.send(_helper.render_response_success(req, {avatar: Location}, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`change_avatar`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _login(req, res) {
        try {
            _log.log(`Body`, req.body);
            await validate_helper.get_validate_login(user_model).validate(req.body);
            const {email, password} = req.body;
            const user = await user_model.findOne({email});
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                _log.log(_res.MESSAGE.ACCOUNT_INVALID);
                return res.send(_helper.render_response_error(req, null, _res.ERROR_CODE.INVALID_EMAIL, _res.MESSAGE.ACCOUNT_INVALID));
            }
            const token = await user.generateAuthToken();
            _log.log(_res.MESSAGE.SUCCESS);
            return res.send(_helper.render_response_success(req, {user, token}, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`login`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _logout(req, res){
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            })
            await req.user.save();
            return res.send(_helper.render_response_success(req, null, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`logout`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _logout_all(req, res){
        try {
            req.user.tokens.splice(0, req.user.tokens.length);
            await req.user.save();
            return res.send(_helper.render_response_success(req, null, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`logout`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = User;
