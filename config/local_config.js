module.exports = {
    SERVER_PORT: `6630`,
    APP_KEY: `ag123FSG!@#6546`,
    MONGODB: {
        HOST: `localhost`,
        PORT: `27017`,
        USERNAME: `lgbt_user`,
        PASSWORD: `12345678`,
        NAME: `lgbt_vietnam`,
        SRV: ``,
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
    EMAIL: {
        HOST: 'smtp.gmail.com',
        PORT: 587,
        USERNAME: 'appdu.hotro@gmail.com',
        PASSWORD: 'ylnkfupxfeynqprv',
        FROM_NAME: 'Sainbolt App',
    },
    JWT: {
        PRIVATE_KEY: `key_123543%G)G`,
        AGE: `5d`,
    },
    BCRYPT: {
        SALT: 10
    },
    ALLOW_HEADER: `Origin, X-Requested-With, Content-Type, Accept, timestamp, Authorization, hash_key`,
    SIZE_FILE_LIMIT: `15mb`,
};