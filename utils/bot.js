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

    static responseQuick1() {
        return {
            text: "Quy mô đơn vị trong dự án hiện tại của bạn:",
            "quick_replies": [
                {
                    content_type: "text",
                    title: "Cá nhân",
                    payload: _logic.BOT.REPLY_QUESTION_USER_OR_BUSINESS,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                },
                // {
                //     content_type: "text",
                //     title : "Doanh Nghiệp",
                //     payload: _logic.BOT.REPLY_QUESTION_USER_OR_BUSINESS,
                //     image_url: _logic.BOT.URL_ICON_QUESTION
                // },
                {
                    content_type: "text",
                    title: "Nhóm team",
                    payload: _logic.BOT.REPLY_QUESTION_USER_OR_BUSINESS,
                    image_url: _logic.BOT.URL_ICON_QUESTION
                }
            ]
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
