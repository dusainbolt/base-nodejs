const crypto_js = require(`crypto-js`);
const moment = require(`moment`);
const jwt = require(`jsonwebtoken`);
const user_model = require(`../models/user`);

/**
 * Set auth
 * @param req
 * @param res
 * @param next
 * @returns {void|*}
 */
const setAuth = async (req, res, next) => {
    try {
        let {headers, method, url} = req;
        let ip = req.connection.remoteAddress;
        _log.log(ip + ` ` + method + ' ' + url);
        if (skipPage(req.path)) return next();

        // if (process.env.NODE_ENV === 'local') return next();
        let {referer, hash_key, timestamp} = headers;
        //Check timestamps
        let timestamp_server = moment().valueOf();
        _log.log('timestamp_server', timestamp_server);
        if (timestamp < timestamp_server - 1000 * 100 || timestamp > timestamp_server) {//Chỉ cho phép thời gian client chậm 100s so với server
            return res.send({
                status: _res.STATUS.ERROR,
                message: _res.MESSAGE.AUTH.TIMESTAMPS_INVALID,
                error_code: _res.ERROR_CODE.AUTH.TIMESTAMPS_INVALID,
            })
        }

        //Check hash_key
        let input = _config.APP_KEY + `_` + timestamp + `_` + url;
        console.log("---------->INPUT", input, url);
        let hash_key_server = crypto_js.MD5(input).toString();
        _log.log(`hash_key_server`, hash_key_server);
        if (hash_key_server !== hash_key) {
            return res.send({
                status: _res.STATUS.ERROR,
                message: _res.MESSAGE.AUTH.HASH_KEY_INVALID,
                error_code: _res.ERROR_CODE.AUTH.HASH_KEY_INVALID,
            })
        }
        const author = req.header('Authorization');
        const token = author ? author.replace('Bearer ', '') : "";
        _log.log('token_server', token);
        const data = jwt.verify(token, _config.JWT.PRIVATE_KEY);
        const user = await user_model.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            return res.status(401).send({ error: 'Not authorized to access this resource' })
        }
        req.token = token;
        req.user = user;
        return next();
    } catch (e) {
        _log.log('authentication error:', e.name);
        return res.status(401).send({
            status: _res.STATUS.ERROR,
            message: e.toString(),
        })
    }
};

/**
 * Những router được bỏ qua không cần authen
 * @param path
 * @returns {boolean}
 */
const skipPage = (path) => {
    let pages = [
        '/',
        '/user/login',
        '/user/password-recovery',
        '/user/registration',
        '/user/verify_code'
    ];
    return pages.indexOf(path) !== -1
};


module.exports = setAuth;