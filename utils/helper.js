const crypto_js = require(`crypto-js`);
const mailer = require('../connection/email');
const course_rq_model = require(`../models/course_rq`);

class Helper {

    /*option mail -> va gui email*/
    static send_email(to = _logic.MAIL_TO_DEFAULT, subject = _logic.MAIL_SUBJECT_DEFAULT, template = _logic.template, data) {
        try {
            const mailOptions = {from: _config.EMAIL.FROM_NAME, to, subject, template, context: data};
            mailer.sendMail(mailOptions, (err, info) => {
                if (err) _log.err(`send email error`, err);
                else _log.log(`send email success`, info);
            });
        } catch (e) {
            throw e;
        }
    }

    /*return verify code: 6 chu so*/
    static render_verify_code() {
        return _.random(_logic.START_CODE, _logic.END_CODE);
    }

    // static getStatusCourse(userId){
    //     try {
    //         const courseDetail = await ;
    //         console.log(courseDetail);
    //         return courseDetail;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    /**
     * input exception để kiểm tra và trả về lỗi
     * params: status, message, errorCode, data
     * @private
     */
    static render_response_error(req, exception, errorCode = 5, message = 'INVALID_ERROR', fieldName = null) {
        try {
            let dataError = null;
            if (!exception) {
                dataError = {fieldName};
            } else if (exception.name === _res.MESSAGE.VALIDATE_ERROR && exception.errors) {
                const {path, type, errors, params: {value, ...props}} = exception;
                delete props.path;
                dataError = {fieldName: path, ...props};
                errorCode = errors[0];
                message = `${value} ${_res.MESSAGE.VALIDATE_ERROR} ${type}`;
            } else if (!message) {
                // message = exception.code;
                message = exception.message;
            }
            const data = this.encode_data(req, dataError);
            const status = _res.STATUS.ERROR;
            return {status, message, errorCode, data};
        } catch (e) {
            throw e;
        }
    }

    static render_response_success(req, dataSuccess = null, message = null) {
        try {
            const data = this.encode_data(req, dataSuccess);
            const status = _res.STATUS.SUCCESS;
            return {status, message, data};
        } catch (e) {
            throw e;
        }
    }

    /**
     * Mã hóa dữ liệu trước khi gửi về client
     * @param req
     * @param data
     * @returns {*}
     */
    static encode_data(req, data) {
        try {
            if (process.env.NODE_ENV === 'local') return data;
            let key = req.headers.hash_key;
            return crypto_js.AES.encrypt(JSON.stringify(data), key).toString();
        } catch (e) {
            throw e;
        }
    }
}

module.exports = Helper;