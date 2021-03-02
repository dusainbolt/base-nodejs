const speechText = require('../connection/speech_text');
const _helper = require('../utils/helper');

class Example {
    constructor() {
    }

    async _get_(req, res) {
        try {
            let data = `Welcome`;
            await speechText.run('a building for human habitation');
            _helper.getParamsUploadSound('./')
            // const {Location} = await new Promise((resolve, reject) => {
            //     _s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
            // });

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

    _get_check_view(req, res, io) {
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

module.exports = Example;