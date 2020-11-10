module.exports = {
    STATUS: {
        SUCCESS: 1,
        ERROR: 0,
    },
    MESSAGE: {
        SUCCESS: `success`,
        ERROR: `error`,
        NOT_FOUND: `Url not found`,
        BODY_INVALID: `Body invalid`,
        ACCOUNT_INVALID: `Account invalid`,
        VALIDATE_ERROR: `ValidationError`,
        REGISTER_SUCCESS: "Register success",
        REDIS_ERROR: "Redis error",
        REGISTER_NOT_FOUND: "Email end time or invalid",
        VERIFY_CODE_INVALID: "Verify code invalid",
        AUTH: {
            FAIL: `Authentication failed`,
            TIMESTAMPS_INVALID: `Timestamps invalid`,
            HASH_KEY_INVALID: `HashKey invalid`,
        },
    },
    //ERROR_CODE bao gồm cả các value ở VALIDATE phía dưới
    ERROR_CODE: {
        NOT_FOUND: 404,
        INVALID_GENDER_ID: 4, // loi genderId
        INVALID_ERROR: 5, // loi khong xac dinh
        DUPLICATE_EMAIL: 6, // loi trung email
        REDIS_ERROR: 7, // loi redis
        REDIS_REGISTER_NOT_FOUND: 8, // khong tim thay email hoac het time 5p
        VERIFY_CODE_INVALID: 9,
        AUTH: {
            FAIL: 1,
            TIMESTAMPS_INVALID: 2,
            HASH_KEY_INVALID: 3,
        },
    },
    VALIDATE: {
        mixed: {
            default: 'MSG_INVALID',
            required: 'MSG_REQUIRED',
        },
        string: {
            min: 'MSG_STRING_MIN',
            max: 'MSG_STRING_MAX',
            email: 'MSG_STRING_EMAIL',
            length: 'MSG_STRING_LENGTH'
        },
    },
};