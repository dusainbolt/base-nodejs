module.exports = {
    CLASS: {
        STATUS: {
            ACTIVE: 1,
            DONE: 2,
            CLOSE: 3,
        },
    },
    LESSON: {
        STATUS: {
            HAPPENING: 1,
            END: 2,
            PENDING: 3, // len lich
            QUESTION: 4, // chuan bi cau hoi // sap dien ra
        },
    },
    SUBJECT: {
        STATUS: {
            ACTIVE: 1,
            PAUSE: 2,
        },
        PARAMS_ALL_INFO: {
            avatar: 1,
            name: 1
        }
    },
    NOTIFY: {
        TYPE: {
            EMAIL: 1,
            SYSTEM: 2,
            MESSENGER: 3,
        },
    },
    COURSE: {
        STATUS: {
            REJECT: 0,//Tu choi
            APPROVE: 1,//Dong y
            PENDING: 3
        },
        PRAMS_COURSE_USER: {status: 1},
    },
    USER: {
        TYPE: {
            UNKNOWN: 0,//Chưa xác định
            WIFE: 1,//Người vợ (Công)
            HUSBAND: 2, //Người chồng (Thụ)
        },
        STATUS: {
            DEACTIVATE: 0, //Ngừng hoạt động
            ACTIVE: 1, // Hoạt động
            TEMPORARY: 2, //Khóa tạm thời
            COURSE_RQ: 3, // Dang cho xet duyet
            REJECT: 4, //Tu choi
            CONFIRM_AGAIN: 5,
        },
        ROLE: {
            ADMIN_APP: "ADMIN_APP",
            USER_COURSE: "USER_COURSE",
        },
        DATA_DEFAULT: [
            {email: `dulh181199@gmail.com`, password: `du@dev1234`, fullName: `Du Sainbolt`, role: "ADMIN_APP"},
        ],
        PARAMS_EMAIl_REQUEST_COURSE: {
            fullName: 1,
            email: 1,
        },
        PARAMS_COURSE_LIST: {
            job: 1,
            jobAddress: 1,
            gender: 1,
            birthday: 1,
            facebook: 1,
            status: 1,
            country: 1,
            phoneNumber: 1,
            email: 1,
            fullName: 1,
            created: 1,
        },
        PARAMS_CLASS: {
            gender: 1,
            birthday: 1,
            fullName: 1,
            facebook: 1,
            avatar: 1,
            phoneNumber:1,
            email: 1,
        },
        PARAMS_NOTIFY: {
            fullName: 1,
            role: 1,
        },
    }
}
;