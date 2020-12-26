module.exports = {
    SERVER_PORT: `6630`,
    SERVER_PORT_DEFAULT: `0.0.0.0`,
    APP_KEY: `ag123FSG!@#6546`,
    MONGODB: {
        HOST: `cluster0.hxmc8.mongodb.net`,
        PORT: `27017`,
        USERNAME: `dusainbolt`,
        PASSWORD: `du@dev1234`,
        NAME: `sainbolt-app`,
        SRV: "?retryWrites=true&w=majority",
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
        FROM_NAME: 'Sainbolt App',
    },
    JWT: {
        PRIVATE_KEY: `key_123543%G)G`,
        AGE: `3d`,
    },
    BCRYPT: {
        SALT: 10
    },
    ALLOW_HEADER: '*',
    SIZE_FILE_LIMIT: `50mb`,
    TOKEN_BOT_MESSENGER: 'EAACoHZAeLoNkBAFzi36n0Mhg4OdcTmm2rXPEUHq3Ef85VuDjxMLZCtdHrFsY8Fym1QCbGHHb8lDe9RrXLFO31Qv0r4VyJrJZARQhQMRwktcbnZCGIMwHUvmUT1yJuTqzgpLfCroIge5oWn6q5AOVyXE4iaV6mUsZClUCReQt9JmvyNsLUWKfN',
};