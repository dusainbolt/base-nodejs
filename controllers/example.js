const res_constant = require(`../constants/response.js`);
const helper = require(`../utils/helper.js`);

class Example {
    constructor() {
    }

    _test(req, res, io) {
        try {
            let data = `Welcome`;
            return res.send({
                status: res_constant.STATUS.SUCCESS,
                message: res_constant.MESSAGE.SUCCESS,
                data: helper.encode_data(req, data),
            })
        } catch (e) {
            _log.err(`_test`, e);
            return res.send({
                status: res_constant.STATUS.ERROR,
                message: e.toString(),
                data: helper.encode_data(req, null),
            })
        }
    }

    _process01(req, res, io) {
        try {
            _log.log(`Body`, req.body);
            if (!helper.validate_input(req.body, [], [])) {
                _log.log(res_constant.MESSAGE.BODY_INVALID);
                return res.send({
                    status: res_constant.STATUS.ERROR,
                    message: res_constant.MESSAGE.BODY_INVALID,
                    data: helper.encode_data(req, null),
                })
            }

            //something

            _log.log(res_constant.MESSAGE.SUCCESS);
            return res.send({
                status: res_constant.STATUS.SUCCESS,
                message: res_constant.MESSAGE.SUCCESS,
                data: helper.encode_data(req, null),
            })
        } catch (e) {
            _log.err(`process01`, e.toString());
            return res.send({
                status: res_constant.STATUS.ERROR,
                message: e.toString(),
                data: null,
            })
        }
    }
}

module.exports = Example;