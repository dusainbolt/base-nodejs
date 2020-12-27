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
        // USERNAME: 'dule9xpro@gmail.com',
        // PASSWORD: 'akgcliilpppqygvb',
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
    // ALLOW_HEADER: `Origin, X-Requested-With, Content-Type, Accept, timestamp, Authorization, hash_key`,
    ALLOW_HEADER: '*',
    SIZE_FILE_LIMIT: `50mb`,
    BOT_MESSENGER: {
        API_URL: 'https://graph.facebook.com/v9.0/me',
        TOKEN: 'EAACoHZAeLoNkBAFzi36n0Mhg4OdcTmm2rXPEUHq3Ef85VuDjxMLZCtdHrFsY8Fym1QCbGHHb8lDe9RrXLFO31Qv0r4VyJrJZARQhQMRwktcbnZCGIMwHUvmUT1yJuTqzgpLfCroIge5oWn6q5AOVyXE4iaV6mUsZClUCReQt9JmvyNsLUWKfN',
        // Luu y khi config cac payload cua bot thi phai sua ca switch case trong code
        LIMIT_PAYLOAD_LIST_PLATFORM: 10,
    }
};