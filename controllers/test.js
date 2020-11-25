class Example {
    constructor() {
    }

    _get_(req, res) {
        try {
            let data = `Welcome`;
            return res.send({
                status: _res.STATUS.SUCCESS,
                message: _res.MESSAGE.SUCCESS,
                data: _helper.encode_data(req, {data}),
            })
        } catch (e) {
            // _log.err(`_test`, e);
            return res.send({
                status: _res.STATUS.ERROR,
                message: e.toString(),
                data: _helper.encode_data(req, null),
            })
        }
    }
}

module.exports = Example;