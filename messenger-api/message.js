// /**
//  * Message that informs the user they are currently logged in.
//  *
//  * @param {String} username System username of the currently logged in user
//  * @returns {Object} Message payload
//  */
const messageGetStarted = {
    get_started: {
        payload: 'GET_STARTED'
    }
}

const messagePersistentMenu = {
    persistent_menu: [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                {
                    "type": "postback",
                    "title": _mess_bot.MENU.LIST_PLATFORM,
                    "payload": _logic.BOT.LIST_PLATFORM_MENU,
                },
                {
                    "type": "postback",
                    "title": _mess_bot.MENU.SYSTEM_BOT,
                    "payload": _logic.BOT.MORE_USER_APP,
                },
            ]
        }
    ]
};

const messageIceBreakers = {
    ice_breakers: _mess_bot.ICE_BREAKERS,
}

const messageGreeting = {
    "greeting": [
        {
            "locale": "default",
            "text": "Xin chào {{user_first_name}}! đây không chỉ là hệ thống nhắn tin. Mà Du sainbolt đã tận dụng nền tảng Facebook Messenger để tạo BOT thông báo cho hệ thống Sainbolt App"
        }, {
            "locale": "en_US",
            "text": "Timeless apparel for the masses."
        }
    ],
}

const messageSettingPersonas = {
    name: "Sainbolt BOT",

    //typing
    // response => {id: "2139908752806080"}
    //profile_picture_url: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/137559599_1032609943890037_3547620939236355990_n.jpg?_nc_cat=108&ccb=2&_nc_sid=730e14&_nc_ohc=0FCTJSz3zqYAX8BBFF5&_nc_ht=scontent.fhan2-3.fna&oh=13c2d55b4fbc8a096f8795ee3ada2348&oe=601F34E4",

    //smile
    // response => {id: "2869200563404624"}
    // profile_picture_url :"https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/136411344_1032610553889976_7659976595665175555_n.jpg?_nc_cat=107&ccb=2&_nc_sid=730e14&_nc_ohc=SAWVJqNgZLoAX8BErOW&_nc_ht=scontent.fhan2-5.fna&oh=d441430c14e7df6526c6bfd960d4e544&oe=601EB9D2",

    // loading
    // response => {id: "406642230644793"}
    // profile_picture_url: "https://scontent.fhan2-6.fna.fbcdn.net/v/t1.0-9/135620680_1032610543889977_2190006492332162196_n.jpg?_nc_cat=104&ccb=2&_nc_sid=730e14&_nc_ohc=Kk_FAvbeydsAX-VeSwP&_nc_ht=scontent.fhan2-6.fna&oh=6231df030518f5919e0b29264e784910&oe=60201012",

    //message
    // response => {id: "526084288295131"}
    // profile_picture_url: "https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/137631400_1032610827223282_842162276358314154_n.jpg?_nc_cat=107&ccb=2&_nc_sid=730e14&_nc_ohc=ShevXyMYWwIAX85D4tp&_nc_ht=scontent.fhan2-5.fna&oh=a8798e75380dbf8d06784cc872490cc3&oe=60221B34",
}

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

const messageModePendingDevelop = getMessageText("Rất tiếc! 🥺 chức năng này đang được phát triển và sớm ra mắt tại phiên bản sắp tới 🥳");
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

const messageActiveBotSuccess = (fullName) => {
    return getMessageText(`Xin chào ${fullName}, bạn vừa kích hoạt BOT thành công 🥳🥳. Hãy sử dụng các tính năng mà Bot cung cấp dưới đây nhé nhé. 😍`);
};

const messageModeUserApp = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "button",
            "text": "Danh sách chức năng 🙆",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Xem hồ sơ",
                    "payload": _logic.BOT.VIEW_MY_INFO
                },
                {
                    "type": "postback",
                    "title": "Xem thống kê",
                    "payload": _logic.BOT.VIEW_MY_DASHBOARD
                },
            ]
        }
    }
}

const messageAccountLink = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "button",
            "text": "Bấm nút đăng nhập ở dưới đấy để kích hoạt",
            "buttons": [
                {
                    "type": "account_link",
                    "url": _config.BOT_MESSENGER.ACCOUNT_LINK_URL
                },
            ]
        }
    }
}

module.exports = {
    // loggedInMessage,
    messageListPlatForm,
    messageImagePlatForm,
    messageActiveBotSuccess,
    messageGetStarted,
    messageIceBreakers,
    messageGreeting,
    messagePersistentMenu,
    messageModeUserApp,
    messageSettingPersonas,
    messageAccountLink,
    messagePleaseActiveBOT,
    napMessage,
    messageReviewPlatform,
    messageModePendingDevelop,
    messageScaleForYou,
    messageHowCustomer,
    messageHowYourPlatform,
    messagePleaseWriteShortThink,
    messageQuestionUserOrAdmin
}