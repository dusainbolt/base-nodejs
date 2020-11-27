module.exports = {
    SERVER_PORT: `6630`,
    APP_KEY: `ag123FSG!@#6546`,
    MONGODB: {
        HOST: `localhost`,
        PORT: `27017`,
        USERNAME: `du_sainbolt`,
        PASSWORD: `12345678`,
        NAME: `sainbolt-app`,
        SRV: ``,
    },
    S3: {
        ACCESS_KEY_ID: `AKIAUYZ7AQ5QF7I5RSM7`,
        SECRET_ACCESS_KEY: `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`,
        REGION: `ap-southeast-1`,
        BUCKET_NAME: `appdu-storage`,
        UPLOAD: {
            Bucket: `appdu-storage`,
            ACL: `public-read`,
            ContentEncoding: 'base64',
            // ContentLength: 2 * 1024 * 1024, //2mb size
        }
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
    SIZE_FILE_LIMIT: `50mb`,
};