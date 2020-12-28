const request = require('request');
const res_api_messenger = require('../utils/bot');
const setting_model = require('../models/setting');

class handleBot {

    /*
    * **__params
    * key: payload or text
    * sender_psId: id user sender to page
    * **__out
    * process in case: handle logic function in case
    * response in call api send message
    * */
    static async getResponseBot(key, sender_psId) {
        switch (key) {
            // view platform
            case _logic.BOT.CONTACT_MAKE_WEB_SITE:
            case _logic.BOT.HOW_PROJECT:
            case _logic.BOT.CONTACT_MAKE_APP_MOBILE:
            case _logic.BOT.LIST_PLATFORM_MENU:
            case _logic.BOT.START_APP:
                await this.callSendAPIFB(sender_psId, this.getResponseText(_mess_bot.LIST_PLATFORM));
                const setting_platforms_question = await setting_model.findOne({type: _contains.SETTING.TYPE.PLATFORM});
                return res_api_messenger.responseListProjectWeb(setting_platforms_question.value);
            // select platform
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
                return res_api_messenger.responseQuickQuestion_1();
            // quick question
            case _logic.BOT.REPLY_QUESTION_USER_OR_BUSINESS:
                return res_api_messenger.responseQuickQuestion_2();
            case _logic.BOT.REPLY_QUESTION_YOUR_CUSTOMER:
                return res_api_messenger.responseQuickQuestion_3();
            case _logic.BOT.REPLY_THINK_READY_OR_START:
                return this.getResponseText(_mess_bot.PLEASE_WRITE_SHORT_THINK);
            case _logic.BOT.MORE_USER_APP:
                return this.getResponseText(_mess_bot.PLEASE_WRITE_SHORT_THINK);
            default:
                return {"text": ""};
        }
    };

    // Handles messages events
    static async handleMessageFB(sender_psId, received_message) {
        let response;
        // Check if the message quick question
        if(received_message.quick_reply) {
            response = await this.getResponseBot(received_message.quick_reply.payload);
        }
        // Check if the message contains text
        else if (received_message.text) {
            // Create the payload for a basic text message
            response = await  this.getResponseBot(received_message.text);
        }
        // Sends the response message
        await this.callSendAPIFB(sender_psId, response);
    }

    // Handles messaging_post_backs events
    static async handlePostbackFB(sender_psId, received_postback) {
        // Get the payload for the postback
        const {payload} = received_postback;
        // Set the response based on the postback payload
        const response = await this.getResponseBot(payload, sender_psId);
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
            "qs": {access_token: _config.BOT_MESSENGER.TOKEN,
                fields: "get_started,greeting,persistent_menu,ice_breakers"
            },
            "method": "GET",
            // "json": {
            //     "fields": [
            //         "ice_breakers",
            //     ]
            // },
            "json": {
                // "greeting": [
                //     {
                //         "locale": "default",
                //         "text": "Xin chào {{user_first_name}}! đây không chỉ là hệ thống nhắn tin. Mà Du sainbolt đã tận dụng nền tảng Facebook Messenger để tạo BOT thông báo cho hệ thống Sainbolt App"
                //     }, {
                //         "locale": "en_US",
                //         "text": "Timeless apparel for the masses."
                //     }
                // ],
                "get_started": {
                    "payload": _logic.BOT.START_APP
                    // "payload":"{\"type\":\"legacy_reply_to_message_action\",\"message\":\"Bắt đầu\"}"
                },
                // "ice_breakers": _mess_bot.ICE_BREAKERS,
                // "persistent_menu": [
                //     {
                //         "locale": "default",
                //         "composer_input_disabled": false,
                //         "call_to_actions": [
                //             {
                //                 "type": "postback",
                //                 "title": _mess_bot.MENU.LIST_PLATFORM,
                //                 "payload": _logic.BOT.LIST_PLATFORM_MENU,
                //             },
                //             {
                //                 "type": "postback",
                //                 "title": _mess_bot.MENU.ACTIVE_BOT,
                //                 "payload": _logic.BOT.LIST_PLATFORM_MENU,
                //             },
                //         ]
                //     }
                // ]
            }
        }, (err, res, body) => {
            if (!err) {
                console.log('setting started button postback success!', JSON.stringify(body))
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
