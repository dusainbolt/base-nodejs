/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MESSENGER =============================================================
const sendAPI = require('./send');
// ===== STORES ================================================================
const setting_model = require('../models/setting');
const user_model = require('../models/user');
/*
 * Account Link Event - This event is called when the Link Account
 * or Unlink Account action has been tapped. Read More at:
 * https://developers.facebook.com/docs/messenger-platform/
 * webhook-reference/account-linking
 */
const handleReceiveAccountLink = async (messengerPSID, account_linking) => {
    /* eslint-disable camelcase */
    const {status, authorization_code} = account_linking;
    /* eslint-enable camelcase */
    _log.log('>>>>>>>ACCOUNT-LINK<<<<<<<' + 'status: and auth code %s ', status, authorization_code);
    switch (status) {
        case 'linked':
            const user_active_bot = await user_model.findByIdAndUpdate(authorization_code, {
                messengerPSID: messengerPSID,
            });
            sendAPI.sendActiveBotSuccess(messengerPSID, user_active_bot.fullName);
            break;
        case 'unlinked':
            sendAPI.sendWelcomeMessage(messengerPSID)
            break;
        default:
            break;
    }
};

/*
 * handleReceivePostback — Postback event handler triggered by a postback
 * action you, the developer, specify on a button in a template. Read more at:
 * developers.facebook.com/docs/messenger-platform/webhook-reference/postback
 */
const handleReceivePostback = async (messengerPSID, postback) => {
    // Perform an action based on the type of payload received.
    const type = postback.payload;
    switch (type) {
        case 'GET_STARTED':
            sendAPI.sendWelcomeMessage(messengerPSID);
            break;
        // view platform
        case _logic.BOT.CONTACT_MAKE_WEB_SITE:
        case _logic.BOT.HOW_PROJECT:
        case _logic.BOT.CONTACT_MAKE_APP_MOBILE:
        case _logic.BOT.LIST_PLATFORM_MENU:
        case _logic.BOT.START_APP:
            const setting_platforms_question = await setting_model.findOne({type: _contains.SETTING.TYPE.PLATFORM});
            sendAPI.sendStartAppMessage(messengerPSID, setting_platforms_question.value);
            break;
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
            const setting_platforms = await setting_model.findOne({type: _contains.SETTING.TYPE.PLATFORM})
            const platform_select = _.find(setting_platforms.value, item => item.payload === type);
            sendAPI.sendSelectPlatform(messengerPSID, platform_select.attachment_id);
            break;
        // start use bot
        case _logic.BOT.MORE_USER_APP:
            sendAPI.sendQuestionUserOrAdmin(messengerPSID);
            break;
        // case _logic.BOT.REPLY_USER:
        //     //check active user
        //     const user = await user_model.findOne({messengerPSID}).select(_contains.USER.PARAMS_AVATAR);
        //     if(user){
        //         return res_api_messenger.responseQuickQuestionUserOrAdmin();
        //     }else{
        //         // https://sainboltapp.web.app/training
        //         return res_api_messenger.responseAccountLink();
        //     }
        default:
            sendAPI.sendModePendingDevelop(messengerPSID);
            break;
    }
};

const handleReceiveMessage = async (messengerPSID, message) => {
    // It's good practice to send the user a read receipt so they know
    // the bot has seen the message. This can prevent a user
    // spamming the bot if the requests take some time to return.
    let type = null;
    if (message.text && _helper.checkTextHello(message.text.toLowerCase())) {
        sendAPI.sendWelcomeMessage(messengerPSID);
    } else if (message.quick_reply) {
         type = message.quick_reply.payload;
        switch (type) {
            // quick question
            case _logic.BOT.REPLY_QUESTION_USER_OR_BUSINESS:
                sendAPI.sendHowCustomer(messengerPSID);
                break;
            case _logic.BOT.REPLY_QUESTION_YOUR_CUSTOMER:
                sendAPI.sendHowYourPlatform(messengerPSID);
                break;
            case _logic.BOT.REPLY_THINK_READY_OR_START:
                sendAPI.sendPleaseWriteThink(messengerPSID);
                break;
            case _logic.BOT.REPLY_USER:
                //check active user
                const user = await user_model.findOne({messengerPSID}).select(_contains.USER.PARAMS_AVATAR);
                if (user) {
                    sendAPI.sendModeUserApp(messengerPSID);
                } else {
                    sendAPI.sendAccountLinkVerify(messengerPSID);
                }
                break;
            default:
                sendAPI.sendModePendingDevelop(messengerPSID);
                break;
        }
    }
};

module.exports = {
    handleReceiveAccountLink,
    handleReceiveMessage,
    handleReceivePostback
}