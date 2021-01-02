const crypto_js = require(`crypto-js`);
const mailer = require('../connection/email');

class Helper {

    static getPramsUpload(base64_string, folder, path_name = "") {
        // Read content from the file
        const buffer_file_base64 = new Buffer.from(base64_string.replace(/^data:image\/\w+;base64,/, ""), 'base64')

        const type = base64_string.split(';')[0].split('/')[1];
        const stringLength = base64_string.length - 'data:image/png;base64,'.length;
        const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
        if (sizeInBytes > _logic.SIZE_UPLOAD) {
            return false;
        }
        const time_upload = new Date().getTime();
        const file_name = `${folder}/${path_name}_${time_upload}_${this.render_verify_code()}`;
        // Setting up S3 upload parameters
        return {
            ..._config.S3.UPLOAD,
            Key: file_name, // File name you want to save as in S3
            Body: buffer_file_base64,
            ContentType: `image/${type}`,
        };
    }

    static deleteImageFromS3(fullPath) {
        const key = fullPath.slice(_logic.URL_S3.length, fullPath.length);
        _s3.deleteObject({
            Bucket: _config.S3.BUCKET_NAME,
            Key: key,
        }, function (er, data) {
        });
    }

    static convertLowerString(string) {
        return _.lowerCase(string).replace(/\s/g, '')
    }

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

    static getSearchRegexSpecial(string) {
        const term = [];
        for (let i = 0; i < string.length; i++) {
            const char = string.charAt(i);
            const reg = _logic.UNICODE[char];
            term.push(reg);
        }
        return new RegExp(term.join(""));
    }

    /*return verify code: 6 chu so*/
    static render_verify_code(start = _logic.START_CODE, end = _logic.END_CODE) {
        return _.random(start, end);
    }

    static getParamsSearch(requestQuery) {
        const {sortType, sortBy, pageSize, pageNum} = requestQuery;
        const page_size = pageSize ? parseInt(pageSize) : _logic.PAGE_SIZE;
        return {
            sort_type: sortType ? sortType : _logic.TYPE_ASC,
            sort_by: sortBy ? sortBy : _logic.SORT_CREATE,
            count_skip: pageNum ? parseInt(pageNum) * page_size : _logic.PAGE_SKIP,
            page_size,
        }
    }

    static checkTextHello(text) {
        if (text.indexOf('xin chao') !== -1 || text.indexOf('chao ban') !== -1 || text === 'hi' || text === 'hello') {
            return true;
        };
        return false;
    }

    /*
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