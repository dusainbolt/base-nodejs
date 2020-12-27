const request = require('request');
const res_api_messenger = require('../utils/bot');
const setting_model = require('../models/setting');

class handleBot {

    static async getResponseBot(key, title, sender_psId) {
        switch (key) {
            case _logic.BOT.CONTACT_MAKE_WEB_SITE:
            case _logic.BOT.HOW_PROJECT:
                await this.callSendAPIFB(sender_psId, this.getResponseText(_mess_bot.LIST_PLATFORM));
                const setting_platforms_question = await setting_model.findOne({type: _contains.SETTING.TYPE.PLATFORM});
                return res_api_messenger.responseListProjectWeb(setting_platforms_question.value);
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_1`:
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_2`:
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_3`:
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_4`:
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_5`:
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_6`:
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_7`:
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_8`:
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_9`:
            case `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_10`:
                const setting_platforms_select = await setting_model.findOne({type: _contains.SETTING.TYPE.PLATFORM})
                const platform = _.find(setting_platforms_select.value, item => item.payload === key);
                await this.callSendAPIFB(sender_psId, this.getResponseMedia(platform.attachment_id, res_api_messenger.getButtonContactMyProfile()))
                // await this.callSendAPIFB(sender_psId, )
                return res_api_messenger.responseQuick1();
            // return await this.callSendAPIFB(sender_psId, this.getResponseText(_mess_bot.LIST_PLATFORM));
            case _logic.BOT.CONTACT_MAKE_APP_MOBILE:
                return {"text": "Thanks! VIEW MOBILE"};
            default:
                return {"text": ""};
        }
    };

    // Handles messages events
    static async handleMessageFB(sender_psId, received_message) {
        let response;
        // Check if the message contains text
        if (received_message.text) {
            // Create the payload for a basic text message
            response = {
                "text": `You sent the message: "${received_message.text}". Now send me an image!`
            }
        }
        // Sends the response message
        await this.callSendAPIFB(sender_psId, response);
    }

    // Handles messaging_post_backs events
    static async handlePostbackFB(sender_psId, received_postback) {
        // Get the payload for the postback
        const {payload, title} = received_postback;
        // Set the response based on the postback payload
        const response = await this.getResponseBot(payload, title, sender_psId);
        // Send the message to acknowledge the postback
        await this.callSendAPIFB(sender_psId, response);
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
        return new Promise((resolve, reject) => {
            request({

                "uri": `${_config.BOT_MESSENGER.API_URL}/messages`,
                "qs": {"access_token": _config.BOT_MESSENGER.TOKEN},
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    console.log('message sent!')
                    resolve(body)
                } else {
                    reject(err);
                    console.error("Unable to send message:" + err);
                }

            });
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

    static uploadAttachmentFromUrl(url) {
        // Send the HTTP request to the Messenger Platform
        return new Promise((resolve, reject) => {
            request({
                "uri": `${_config.BOT_MESSENGER.API_URL}/message_attachments`,
                "qs": {"access_token": _config.BOT_MESSENGER.TOKEN},
                "method": "POST",
                "json": {
                    "message":{
                        "attachment":{
                            "type":"image",
                            "payload":{
                                "is_reusable": true,
                                url
                            }
                        }
                    }
                }
            }, (err, res, body) => {
                if (!err) {
                    console.log('upload successful ' + body.attachment_id);
                    resolve(body.attachment_id)
                } else {
                    console.error("setting fail" + err);
                    reject(err);
                }
            });
        });

    }

    static getResponseText(text) {
        return {text};
    }

    static getResponseMedia(attachment_id, buttons = [], media_type = _logic.TYPE_IMAGE) {
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "media",
                    "elements": [{media_type, attachment_id, buttons}],
                }
            }
        }
    }
}

module.exports = handleBot;
