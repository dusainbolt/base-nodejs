module.exports = {
    TYPE: {
        UNKNOWN: 0,//Chưa xác định
        WIFE: 1,//Người vợ (Công)
        HUSBAND: 2, //Người chồng (Thụ)
    },
    STATUS: {
        DEACTIVATE: 0, //Ngừng hoạt động
        ACTIVE: 1, // Hoạt động
        TEMPORARY: 2, //Khóa tạm thời
        REJECT: 4, //Tu choi
    },
    ROLE: {
        ADMIN_APP: "ADMIN_APP",
        USER_COURSE: "USER_COURSE",
    },
    DATA_DEFAULT: [
        { email: `dulh181199@gmail.com`, password: `du@dev1234`, fullName: `Du Sainbolt`, role: "ADMIN_APP" },
    ],
};