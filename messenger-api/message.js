// /**
//  * Message that informs the user they are currently logged in.
//  *
//  * @param {String} username System username of the currently logged in user
//  * @returns {Object} Message payload
//  */
const getMessageText = (text) => {
    return {text};
}
const getResponseMedia = (attachment_id, buttons = [], media_type = _logic.TYPE_IMAGE) => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "media",
                "elements": [{media_type, attachment_id, buttons}],
            }
        }
    }
};
//
// /**
//  * Fun message for saying hello to a signed in user.
//  */
const napMessage = {
    text: 'Chào mừng bạn, mình là Lê Huy Du đây là hệ thống BOT tương tác tin nhắn tự động của mình. Hãy sử dụng các chức năng trong câu hỏi Menu nhé ❤',
};

const messageReviewPlatform = getMessageText(_mess_bot.LIST_PLATFORM);

const messageListPlatForm = (list_platform) => {
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

const buttonDeveloper = () => {
    return [
        {
            type: "web_url",
            url: _logic.MY_PROFILE_FB,
            title: "Nhà phát triển",
        }
    ];
}

const messageImagePlatForm = (attachment_id) => {
    return getResponseMedia(attachment_id, buttonDeveloper());
};

const messageScaleForYou = {
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
};

const messageHowCustomer = {
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
};

const messageHowYourPlatform = {
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
};

const messageQuestionUserOrAdmin = {
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

const messagePleaseWriteShortThink = getMessageText(_mess_bot.PLEASE_WRITE_SHORT_THINK);

const messagePleaseActiveBOT = getMessageText(_mess_bot.PLEASE_ACTIVE_BOT);

const messageAccountLink = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "button",
            "text": "Bấm nút đăng nhập ở dưới đấy để kích hoạt",
            "buttons": [
                {
                    "type": "account_link",
                    "url": "https://sainboltapp.web.app/verify-bot-messenger"
                },
            ]
        }
    }
}

module.exports = {
    // loggedInMessage,
    messageListPlatForm,
    messageImagePlatForm,
    messageAccountLink,
    messagePleaseActiveBOT,
    napMessage,
    messageReviewPlatform,
    messageScaleForYou,
    messageHowCustomer,
    messageHowYourPlatform,
    messagePleaseWriteShortThink,
    messageQuestionUserOrAdmin
}