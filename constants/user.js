module.exports = {
    DATA_DEFAULT: [
        { email: `nguyenvanaa@gmail.com`, password: `123456789A`, firstName: `Nguyễn Văn`, name: `AA` },
        { email: `nguyenvanbb@gmail.com`, password: `123456789B`, firstName: `Nguyễn Văn`, name: `BB` },
        { email: `nguyenvancc@gmail.com`, password: `123456789C`, firstName: `Nguyễn Văn`, name: `CC` },
        { email: `hoangthidd@gmail.com`, password: `123456789D`, firstName: `Hoàng Thị`, name: `DD` },
        { email: `hoangthiee@gmail.com`, password: `123456789E`, firstName: `Hoàng Thị`, name: `EE` },
        { email: `hoangthiff@gmail.com`, password: `123456789F`, firstName: `Hoàng Thị`, name: `FF` },
    ],
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


};