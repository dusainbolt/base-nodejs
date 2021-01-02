/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MESSENGER =============================================================
const sendAPI = require('./send');
// ===== STORES ================================================================
const res_api_messenger = require('../utils/bot');
const setting_model = require('../models/setting');
const user_model = require('../models/user');
/*
 * Account Link Event - This event is called when the Link Account
 * or Unlink Account action has been tapped. Read More at:
 * https://developers.facebook.com/docs/messenger-platform/
 * webhook-reference/account-linking
 */
const handleReceiveAccountLink = (event) => {
    const senderId = event.sender.id;

    /* eslint-disable camelcase */
    const status = event.account_linking.status;
    const authCode = event.account_linking.authorization_code;
    /* eslint-enable camelcase */

    console.log('Received account link event with for user %d with status %s ' +
        'and auth code %s ', senderId, status, authCode);

    // switch (status) {
    //     case 'linked':
    //         const linkedUser = UserStore.replaceAuthToken(authCode, senderId);
    //         sendApi.sendSignInSuccessMessage(senderId, linkedUser.username);
    //         break;
    //     case 'unlinked':
    //         UserStore.unlinkMessengerAccount(senderId);
    //         sendApi.sendSignOutSuccessMessage(senderId);
    //         break;
    //     default:
    //         break;
    // }
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
        // select platform + question
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
        case _logic.BOT.REPLY_QUESTION_USER_OR_BUSINESS:
            sendAPI.sendHowCustomer(messengerPSID);
            break;
        case _logic.BOT.REPLY_QUESTION_YOUR_CUSTOMER:
            sendAPI.sendHowYourPlatform(messengerPSID);
            break;
        case _logic.BOT.REPLY_THINK_READY_OR_START:
            sendAPI.sendPleaseWriteThink(messengerPSID);
            break;
        // // start use bot
        // case _logic.BOT.MORE_USER_APP:
        //     return res_api_messenger.responseQuickQuestionUserOrAdmin();
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
            console.error(`Unknown Postback called: ${type}`);
            break;
    }
};

const handleReceiveMessage = async (messengerPSID, message) => {
    // It's good practice to send the user a read receipt so they know
    // the bot has seen the message. This can prevent a user
    // spamming the bot if the requests take some time to return.
    if (message.text && _helper.checkTextHello(message.text.toLowerCase())) {
        sendAPI.sendWelcomeMessage(messengerPSID);
    }
};

module.exports = {
    handleReceiveAccountLink,
    handleReceiveMessage,
    handleReceivePostback
}