const helper = require(`../utils/helper.js`);
const validate_helper = require(`../utils/validate.js`);
const user_model = require(`../models/user.js`);
const jwt = require(`jsonwebtoken`);
const moment = require(`moment`);

class User {
    constructor() {
    }

    _test(req, res) {
        try {
            return res.send({
                status: _res.STATUS.SUCCESS,
                message: _res.MESSAGE.SUCCESS,
                data: helper.encode_data(req, data),
            });
        } catch (e) {
            _log.err(`_test`, e);
            return res.send({
                status: _res.STATUS.ERROR,
                message: e.toString(),
                data: helper.encode_data(req, null),
            });
        }
    }

    async _registration(req, res) {
        try {
            _log.log(`Body`, req.body);
            await validate_helper.get_validate_register(user_model).validate(req.body);
            const {email} = req.body;
            const code = helper.render_verify_code();
            //set info register to redis
            const register_data = JSON.stringify({...req.body, code});
            _redis.select(_logic.DBO_REGISTER);
            _redis.set(`${_logic.SUB_REGISTER}${email}`, register_data, _logic.REDIS_EXPIRES, _logic.TIME_OUT_REGISTER);
            // convert code & send email to user
            const array_code_verify = code.toString().split("");
            const time_out = new moment().add(_logic.TIME_OUT_REGISTER, `seconds`).format(_logic.FORMAT_24H_TIME);
            helper.send_email(email, _logic.SUBJECT_REGISTER, _logic.TEMPLATE_EMAIL, {array_code_verify, time_out});
            return res.send(helper.render_response_success(req, {email}, _res.MESSAGE.REGISTER_SUCCESS));
        } catch (e) {
            _log.err(`register`, e);
            return res.send(helper.render_response_error(req, e));
        }
    }

    async _verify_code(req, res) {
        try {
            _log.log(`Body`, req.body);
            const {email, code} = req.body;
            await validate_helper.get_validate_verify_code(user_model).validate(req.body);
            // goi data tu redis va xu ly
            const channel_key = `${_logic.SUB_REGISTER}${email}`;
            _redis.select(_logic.DBO_REGISTER);
            _redis.get(channel_key, async (err, reply) => {
                const receiver_register = JSON.parse(reply);
                if (err) {
                    return res.send(
                        helper.render_response_error(req, err, _res.ERROR_CODE.REDIS_ERROR, _res.MESSAGE.REDIS_ERROR)
                    );
                } else if (!receiver_register) {
                    return res.send(helper.render_response_error(req, err, _res.ERROR_CODE.REDIS_REGISTER_NOT_FOUND, _res.MESSAGE.REGISTER_NOT_FOUND));
                } else if (parseInt(code) === receiver_register.code) {
                    const user_register = await user_model.create({
                        ...receiver_register,
                        userName: email,
                    });
                    _redis.del(channel_key, (err, response) => {
                        if (response === 1) _log.err(`Deleted key success: `, err);
                        // else _log.err(`Deleted error: `, err);
                    });
                    return res.send(helper.render_response_success(req, user_register, _res.MESSAGE.REGISTER_SUCCESS));
                } else {
                    return res.send(helper.render_response_error(req, null, _res.ERROR_CODE.VERIFY_CODE_INVALID, _res.MESSAGE.VERIFY_CODE_INVALID));
                }
            });
        } catch (e) {
            _log.err(`verify_code`, e);
            return res.send(helper.render_response_error(req, e));
        }
    }

    async _login(req, res) {
        try {
            _log.log(`Body`, req.body);
            await validate_helper.get_validate_login().validate(req.body);
            const {email, password} = req.body;
            const user = await user_model.findOne({email, password});

            if (!user) {
                _log.log(_res.MESSAGE.ACCOUNT_INVALID);
                return res.send(helper.render_response_success(req, null,  _res.MESSAGE.ACCOUNT_INVALID));
            }
            console.log("user instance: =======> ", user);
            const token = await user.generateAuthToken();
            // const token = jwt.sign(
            //     {
            //         _id: user._id,
            //         firstName: user.firstName,
            //         name: user.name,
            //     },
            //     _config.JWT.PRIVATE_KEY,
            //     {
            //         expiresIn: _config.JWT.AGE,
            //     }
            // );
            _log.log(_res.MESSAGE.SUCCESS);
            return res.send(helper.render_response_success(req, {user, token},  _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`login`, e);
            return res.send(helper.render_response_error(req, e));
        }
    }
}

module.exports = User;
