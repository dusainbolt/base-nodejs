const setting_model = require('../models/setting');

// /**
//  * Message that informs the user they are currently logged in.
//  *
//  * @param {String} username System username of the currently logged in user
//  * @returns {Object} Message payload
//  */
const getMessageText = (text) => {
    return {text};
}
const loggedInMessage = (username) => {
    return {
        text: `You’re still logged in as ${username}.`
    };
};
//
// /**
//  * Fun message for saying hello to a signed in user.
//  */
const napMessage = {
    text: 'Oh hey there! I was just napping while you were gone 😴. But I’m awake now!',
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

module.exports = {
    loggedInMessage,
    napMessage,
    messageReviewPlatform,
    messageListPlatForm,
}