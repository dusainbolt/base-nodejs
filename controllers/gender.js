const helper = require(`../utils/helper.js`);
const validate_helper = require(`../utils/validate.js`);
const gender_model = require(`../models/gender.js`);

class Gender {
    constructor() {
    }

    _test(req, res) {
        try {
            _log.log(`_test done`);
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

    async _get_all(req, res) {
        try {
            _log.log(`Body`, req.body);
            const {status} = req.body;
            await validate_helper.get_validate_get_all_gender().validate(req.body);
            let genders = await gender_model.find({status: status});
            _log.log(_res.MESSAGE.SUCCESS);
            return res.send(helper.render_response_success(req, genders, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_get_all`, e);
            return res.send(helper.render_response_error(req, e));
        }
    }
}

module.exports = Gender;
