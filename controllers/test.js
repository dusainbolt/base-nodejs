const helper = require(`../utils/helper.js`);

class Example {
    constructor() {
    }

    _test(req, res) {
        try {
            let data = `Welcome`;
            return res.send({
                status: _res.STATUS.SUCCESS,
                message: _res.MESSAGE.SUCCESS,
                data: helper.encode_data(req, {data}),
            })
        } catch (e) {
            _log.err(`_test`, e);
            return res.send({
                status: _res.STATUS.ERROR,
                message: e.toString(),
                data: helper.encode_data(req, null),
            })
        }
    }

    _process01(req, res) {
        try {
            _log.log(`Body`, req.body);
            if (!helper.validate_input(req.body, [], [])) {
                _log.log(_res.MESSAGE.BODY_INVALID);
                return res.send({
                    status: _res.STATUS.ERROR,
                    message: _res.MESSAGE.BODY_INVALID,
                    data: helper.encode_data(req, null),
                })
            }

            //something

            _log.log(_res.MESSAGE.SUCCESS);
            return res.send({
                status: _res.STATUS.SUCCESS,
                message: _res.MESSAGE.SUCCESS,
                data: helper.encode_data(req, null),
            })
        } catch (e) {
            _log.err(`process01`, e.toString());
            return res.send({
                status: _res.STATUS.ERROR,
                message: e.toString(),
                data: null,
            })
        }
    }
}

module.exports = Example;