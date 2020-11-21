const res_constant = require(`../constants/response.js`);
const helper = require(`../utils/helper.js`);

class CheckView {
    constructor() {
    }

    //show view localhost:port/checkview
    _test(req, res, io) {
        try {
            _log.log(`begin checkview`);
            const verify_code =  helper.render_verify_code().toString();
            const array_code_verify = verify_code.split('');
            return res.render('template', {array_code_verify});
        } catch (e) {
            _log.err(`checkview`, e);
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

module.exports = CheckView;