class CheckView {
    constructor() {
    }

    //show view localhost:port/checkview
    _test(req, res, io) {
        try {
            _log.log(`begin checkview`);
            const verify_code =  _helper.render_verify_code().toString();
            const array_code_verify = verify_code.split('');
            return res.render('template', {array_code_verify});
        } catch (e) {
            _log.err(`checkview`, e);
            return res.send({
                status: _res.STATUS.ERROR,
                message: e.toString(),
                data: _helper.encode_data(req, null),
            })
        }
    }
}

module.exports = CheckView;