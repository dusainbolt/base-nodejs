const redis = require(`redis`);
let connection = null;

try {
    connection = redis.createClient({
        host: _config.REDIS.HOST,
        port: _config.REDIS.PORT,
        password: _config.REDIS.PASSWORD,
    });

    _log.log(`Redis connected: ` + _config.REDIS.HOST + `:` + _config.REDIS.PORT);
} catch (e) {
    throw  e;
}

module.exports = connection;