const request = require('request');
const res_api_messenger = require('../utils/bot');
const setting_model = require('../models/setting');

class handleBot {

    static async getResponseBot(key, title, sender_psId) {
        switch (key) {
            case _logic.BOT.CONTACT_MAKE_WEB_SITE:
            case _logic.BOT.HOW_PROJECT:
                await this.callSendAPIFB(sender_psId, this.getResponseText(_mess_bot.LIST_PLATFORM));
                const setting_platforms = await setting_model.findOne({type: _contains.SETTING.TYPE.PLATFORM});
                return res_api_messenger.responseListProjectWeb(setting_platforms.value);
            case _logic.BOT.CONTACT_MAKE_APP_MOBILE:
                return {"text": "Thanks! VIEW MOBILE"};
            default:
                return {"text": ""};
        }
    };

    // Handles messages events
    static handleMessageFB(sender_psId, received_message) {
        let response;
        // Check if the message contains text
        if (received_message.text) {
            // Create the payload for a basic text message
            response = {
                "text": `You sent the message: "${received_message.text}". Now send me an image!`
            }
        }
        // Sends the response message
        this.callSendAPIFB(sender_psId, response);
    }

    // Handles messaging_post_backs events
    static async handlePostbackFB(sender_psId, received_postback) {
        // Get the payload for the postback
        const {payload, title} = received_postback;
        // Set the response based on the postback payload
        const response = await this.getResponseBot(payload, title, sender_psId);
        // Send the message to acknowledge the postback
        this.callSendAPIFB(sender_psId, response);
    }
    // Sends response messages via the Send API
    static callSendAPIFB(sender_psId, response) {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psId
            },
            "message": response
        }

        console.log("test response",request_body);


        // Send the HTTP request to the Messenger Platform
        request({
            "uri": `${_config.BOT_MESSENGER.API_URL}/messages`,
            "qs": {"access_token": _config.BOT_MESSENGER.TOKEN},
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
                console.log('message sent!')
            } else {
                console.error("Unable to send message:" + err);
            }
        });
    }

    static settingStartedButtonPostback() {
        // Send the HTTP request to the Messenger Platform
        request({
            "uri": `${_config.BOT_MESSENGER.API_URL}/messenger_profile`,
            "qs": {"access_token": _config.BOT_MESSENGER.TOKEN},
            "method": "POST",
            "json": {
                // "fields": [
                //     "get_started"
                // ]
                "greeting": [
                    {
                        "locale": "default",
                        "text": "Xin chào {{user_first_name}}! đây không chỉ là hệ thống nhắn tin. Mà Du sainbolt đã tận dụng nền tảng Facebook Messenger để tạo BOT thông báo cho hệ thống Sainbolt App"
                    }, {
                        "locale": "en_US",
                        "text": "Timeless apparel for the masses."
                    }
                ],
                "get_started": {
                    "payload": _logic.BOT.START_APP
                },
                "ice_breakers": ICE_BREAKERS
            }
        }, (err, res, body) => {
            if (!err) {
                console.log('setting started button postback success!')
            } else {
                console.error("setting fail" + err);
            }
        });
    }

    static getResponseText(text) {
        return {text};
    }
}

module.exports = handleBot;
