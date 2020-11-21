let local_config = require(`../config/local_config.js`);

let data_config = {};

let dev_config = {
    SERVER_PORT: `6630`,
    SERVER_PORT_DEFAULT: `0.0.0.0`,
    APP_KEY: `ag123FSG$#6546`,
    MONGODB: {
        HOST: `cluster0.hxmc8.mongodb.net`,
        PORT: `27017`,
        USERNAME: `dusainbolt`,
        PASSWORD: `du@dev1234`,
        NAME: `sainbolt-app`,
        SRV: "?retryWrites=true&w=majority",
    },
    REDIS: {
        HOST: `redis-15553.c16.us-east-1-3.ec2.cloud.redislabs.com`,
        PORT: `15553`,
        PASSWORD: `lRNf6cpk9eeRTo0v53N0bbbdWnPz8HTV`,
    },
    // Bad: "My cluster is https://username:password@somehost-1234567.us-east-1.bonsaisearch.net"
    // https://zhgvzfcfuy:vbk3on35ua@:443
    ELASTIC: {
        HOST: `cedar-181992460.us-east-1.bonsaisearch.net`,
        PORT: `443`,
        USERNAME: `zhgvzfcfuy`,
        PASSWORD: `vbk3on35ua`,
    },
    EMAIL: {
        HOST: 'smtp.gmail.com',
        PORT: 587,
        USERNAME: 'appdu.hotro@gmail.com',
        PASSWORD: 'ylnkfupxfeynqprv',
        FROM_NAME: 'LBGT VIET NAM',
    },
    JWT: {
        PRIVATE_KEY: `key_123543%G)G`,
        AGE: `5d`,
    },
    BCRYPT: {
        SALT: 10
    },
    SIZE_FILE_LIMIT: `15mb`,
};
switch (process.env.NODE_ENV) {
    case `local`:
        data_config = dev_config;
        break;
    case `dev`:
        data_config = dev_config;
        break;
    case `prod`:
        data_config = {
            SERVER_PORT: `6630`,
            APP_KEY: `ag123FSG$#6546`,
            MONGODB: {
                HOST: `localhost`,
                PORT: `27018`,
                USERNAME: `admin_lgbt_vietnam`,
                PASSWORD: `123465798aaaA`,
                NAME: `lgbt_vietnam`,
            },
            REDIS: {
                HOST: `localhost`,
                PORT: `6379`,
                PASSWORD: `tr@$234gGFjgfh35`,
            },
            ELASTIC: {
                HOST: `localhost`,
                PORT: `9200`,
                USERNAME: `elastic`,
                PASSWORD: `JHGFLKJO234@$dsa`,
            },
            JWT: {
                PRIVATE_KEY: `key_123543%G)G`,
                AGE: `5d`,
            },
            BCRYPT: {
                SALT: 10
            },
            SIZE_FILE_LIMIT: `15mb`,
        };
        break;
    default:
        console.error(`env invalid`);
        break;
}

module.exports = data_config;