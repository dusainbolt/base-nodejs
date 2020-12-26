const request = require('request');
const res_api_messenger = require('../utils/bot');

class handleBot {
    // Handles messages events
    static handleMessageFB(sender_psId, RECIPIENT_ID, received_message) {
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
    static handlePostbackFB(sender_psId, received_postback) {
        let response;
        // Get the payload for the postback
        let payload = received_postback.payload;
        // Set the response based on the postback payload
        response = this.getResponseBot(payload);
        // Send the message to acknowledge the postback
        this.callSendAPIFB(sender_psId, response);
    }

    static getResponseBot(key){
        switch (key) {
            case _logic.BOT.CONTACT_MAKE_WEB_SITE:
            case _logic.BOT.HOW_PROJECT:
                return res_api_messenger.responseListProjectWeb();
            case _logic.BOT.CONTACT_MAKE_APP_MOBILE:
                return {"text": "Thanks! VIEW MOBILE"};
            default:
                return {"text": ""};
        }
    };
    // Sends response messages via the Send API
    static callSendAPIFB(sender_psId, response) {
        console.log("test response",response);
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psId
            },
            "message": response
        }

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": {"access_token": _config.TOKEN_BOT_MESSENGER},
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
            "uri": "https://graph.facebook.com/v2.6/me/messenger_profile",
            "qs": {"access_token": _config.TOKEN_BOT_MESSENGER},
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
                "ice_breakers": [
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
        }, (err, res, body) => {
            if (!err) {
                console.log('setting started button postback success!')
            } else {
                console.error("setting fail" + err);
            }
        });
    }

}

module.exports = handleBot;
