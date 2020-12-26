const request = require('request');

class handleBot {
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
    static handlePostbackFB(sender_psId, received_postback) {

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
                // "get_started":{
                //     "payload":"{\"type\":\"legacy_reply_to_message_action\",\"message\":\"Bắt đầu\"}"
                // },
                "greeting": [
                    {
                        "locale":"default",
                        "text":"Hello!"
                    }, {
                        "locale":"en_US",
                        "text":"Timeless apparel for the masses."
                    }
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
