const redis = require(`redis`);
let connection = null;

try {
    connection = redis.createClient({..._config.REDIS});
    _log.log(`Redis connected: ` + _config.REDIS.HOST + `:` + _config.REDIS.PORT);

} catch (e) {
    throw  e;
}

module.exports = connection;