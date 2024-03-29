class responseAPIMessenger {
    static responseListProjectWeb(list_platform) {
        const elements = list_platform.map(item => {
            const {title, subtitle, image_url, payload, title_button} = item;
            return {
                title, subtitle, image_url,
                buttons: [
                    {
                        "type": "postback",
                        title: title_button,
                        payload,
                    },
                ],
            }
        });
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    elements
                }
            }
        }
    }

    static responseQuickQuestion_1() {
        return {
            text: "Quy mô đơn vị trong dự án hiện tại của bạn:",
            "quick_replies": [
                {
                    content_type: "text",
                    title: "Cá nhân",
                    payload: _logic.BOT.REPLY_QUESTION_USER_OR_BUSINESS,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                },
                {
                    content_type: "text",
                    title: "Nhóm team",
                    payload: _logic.BOT.REPLY_QUESTION_USER_OR_BUSINESS,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                }
            ]
        }
    }

    static responseQuickQuestion_2() {
        return {
            text: "Dự án của bạn đã có tệp khách hàng sử dụng ngay chưa?",
            "quick_replies": [
                {
                    content_type: "text",
                    title: "Đã có",
                    payload: _logic.BOT.REPLY_QUESTION_YOUR_CUSTOMER,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                },
                {
                    content_type: "text",
                    title: "Chưa có",
                    payload: _logic.BOT.REPLY_QUESTION_YOUR_CUSTOMER,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                }
            ]
        }
    }

    static responseQuickQuestion_3() {
        return {
            text: "Dự án của bạn là dựa trên nền tảng đã có sẵn (ứng dụng đang có tương tự với ý tưởng) hay làm mới hoàn toàn?",
            "quick_replies": [
                {
                    content_type: "text",
                    title: "Có sẵn",
                    payload: _logic.BOT.REPLY_THINK_READY_OR_START,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                },
                {
                    content_type: "text",
                    title: "Làm mới",
                    payload: _logic.BOT.REPLY_THINK_READY_OR_START,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                }
            ]
        }
    }

    static responseQuickQuestionUserOrAdmin() {
        return {
            text: "Bạn là người dùng hay quản trị viên?",
            "quick_replies": [
                {
                    content_type: "text",
                    title: "Người dùng",
                    payload: _logic.BOT.REPLY_USER,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                },
                {
                    content_type: "text",
                    title: "Quản trị viên",
                    payload: _logic.BOT.REPLY_ADMIN,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                }
            ]
        }
    }

    static responseListMenuUser() {
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Try the postback button!",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Postback Button",
                            "payload": "DEVELOPER_DEFINED_PAYLOAD"
                        },
                        {
                            "type": "postback",
                            "title": "Postback Button",
                            "payload": "DEVELOPER_DEFINED_PAYLOAD"
                        },
                        {
                            "type": "postback",
                            "title": "Postback Button",
                            "payload": "DEVELOPER_DEFINED_PAYLOAD"
                        }
                    ]
                }
            }
        }
    }

    static responseAccountLink() {
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Try the postback button!",
                    "buttons": [
                        {
                            "type": "account_link",
                            "url": "https://sainboltapp.web.app/verify-bot-messenger?authorization_code=213213"
                        },
                    ]
                }
            }
        }
    }

    static getButtonContactMyProfile() {
        return [
            {
                type: "web_url",
                url: _logic.MY_PROFILE_FB,
                title: "Nhà phát triển",
            }
        ]
    }
}

module.exports = responseAPIMessenger;
