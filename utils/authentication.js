const crypto_js = require(`crypto-js`);
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
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Headers', _config.ALLOW_HEADER);

        let {headers, method, url} = req;
        let ip = req.connection.remoteAddress;

        _log.log(ip + ` ` + method + ' ' + url);
        // if (process.env.NODE_ENV === 'local') return next();
        let {authorization, hash_key, timestamp} = headers;
        //Check timestamps
        // let timestamp_server = moment().valueOf();
        // _log.log('timestamp_server', timestamp_server);
        // if (timestamp < timestamp_server - 1000 * 100 || timestamp > timestamp_server) {//Chỉ cho phép thời gian client chậm 100s so với server
        //     return res.send({
        //         status: _res.STATUS.ERROR,
        //         message: _res.MESSAGE.AUTH.TIMESTAMPS_INVALID,
        //         error_code: _res.ERROR_CODE.AUTH.TIMESTAMPS_INVALID,
        //     })
        // }
        //Check hash_key
        if(url.indexOf(/socket.io/) !== -1 )return next();
        url = url.indexOf("?") !== -1 ? url.substring(0, url.indexOf("?")) : url;
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

        // check authen token

        if (skipPage(req.path)) return next();

        const token = authorization ? authorization.replace('Bearer ', '') : "";
        _log.log('token_server', token);
        const data = jwt.verify(token, _config.JWT.PRIVATE_KEY);
        const user = await user_model.findOne({_id: data._id, 'tokens.token': token, status: _contains.USER.STATUS.ACTIVE});
        if (!user) {
            return res.status(401).send({error: 'Not authorized to access this resource'})
        }
        req.token = token;
        req.user = user;
        _log.log(`access_token: ${user.fullName} - ${user._id}`);
        if (skipAdminPage(req.path)) {
            if (user.role !== _contains.USER.ROLE.ADMIN_APP) {
                return res.status(401).send({error: 'Not authorized to access this resource'})
            }
        }
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
        '/test',
        '/user/login',
        '/user/password-recovery',
        '/user/registration',
        '/user/verify_code',
        '/courses/register',
        '/fb_messenger/webhook',
        '/courses/verify_code',
    ];
    return pages.indexOf(path) !== -1;
};

const skipAdminPage = (path) => {
    let pages = [
        '/courses/list_user',
        '/courses/request_course',
        '/courses/email_notify_course',
        '/notify/list',
        '/subject/add_subject',
        '/class/add_class',
        `/class/chang_status_class`,
        `/lesson/add_lesson`,
        `/lesson/get_lesson_by_admin`,
        `/lesson/start_lesson`,
        `/lesson/add_youtube_url`,
        `/lesson/insert_list_quit`,
        `/lesson/reply_exercise`
    ];
    return pages.indexOf(path) !== -1;
}


module.exports = setAuth;