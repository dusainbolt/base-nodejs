module.exports = {
    LIST_PLATFORM: `Dưới đây là danh sách các nền tảng Sainbolt App phát triển. Bạn tham khảo và nhấn vào nút "Lựa chọn" nhé ❤`,
    PLEASE_WRITE_SHORT_THINK: "Hãy viết ngắn gọn ý tưởng của bạn rồi gửi tại đây. Sainbolt App sẽ trả lời bạn sớm nhất ❤",
    PLEASE_ACTIVE_BOT: "Để sử dụng chức năng, trước tiên bạn phải kích hoạt BOT với tài khoản trên hệ thống Sainbolt App 🔥",
    MENU: {
        LIST_PLATFORM: "Danh sách nền tảng",
        SYSTEM_BOT: "Hệ thống Sainbolt App"
    },
    ICE_BREAKERS: [
        {
            "question": "Tôi muốn liên hệ làm website có được không?",
            "payload": _logic.BOT.CONTACT_MAKE_WEB_SITE
        },
        {
            "question": "Bạn có thể làm các dự án website như thế nào?",
            "payload": _logic.BOT.HOW_PROJECT
        },
        {
            "question": "Tôi muốn liên hệ làm app mobile có được không?",
            "payload": _logic.BOT.CONTACT_MAKE_APP_MOBILE
        },
        {
            "question": "Tôi muốn xem các lựa chọn cho thành viên của Sainbolt App",
            "payload": _logic.BOT.MORE_USER_APP
        },
    ]
}