const elastic_search = require('elasticsearch');
let client = null;

try {
    client = new elastic_search.Client({
        host: _config.ELASTIC.HOST,
        port: _config.ELASTIC.PORT,
        username: _config.ELASTIC.USERNAME,
        password: _config.ELASTIC.PASSWORD,
        // log: `trace`,
        // apiVersion: `7.9`,
    });

    client.ping({
        requestTimeout: 1000
    }, (error) => {
        if (error) _log.err(`Elastic connect fail`, error.toString());
        else _log.log(`Elastic connected: ` + _config.ELASTIC.HOST + `:` + _config.ELASTIC.PORT);
    });
} catch (e) {
    throw  e;
}

module.exports = client;