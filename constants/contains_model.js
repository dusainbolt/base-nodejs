module.exports = {
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
            country: 1,
            phoneNumber: 1,
            email: 1,
            fullName: 1,
            created: 1,
        },
    }
}
;