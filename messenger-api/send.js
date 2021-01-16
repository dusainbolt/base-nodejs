// ===== MESSENGER =============================================================
const api = require('./api');
const messages = require('./message');
// Turns typing indicator on.
const typingOn = (recipientId) => {
    return {
        recipient: {
            id: recipientId,
        },
        sender_action: 'typing_on', // eslint-disable-line camelcase
        persona_id: "2139908752806080"
    };
};

// mark_seen last message
const markSeen = (recipientId) => {
    return {
        recipient: {
            id: recipientId,
        },
        sender_action: 'mark_seen', // eslint-disable-line camelcase
        persona_id: "526084288295131",
    };
};

// Turns typing indicator off.
const typingOff = (recipientId) => {
    return {
        recipient: {
            id: recipientId,
        },
        sender_action: 'typing_off', // eslint-disable-line camelcase
        persona_id: "406642230644793"
    };
};
//
// Wraps a message json object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
    return {
        recipient: {
            id: recipientId,
        },
        message: messagePayload,
        persona_id: "2869200563404624"
    };
};
//
// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
    const messagePayloadArray = _.castArray(messagePayloads)
        .map((messagePayload) => messageToJSON(recipientId, messagePayload));
    api.callMessagesAPI(
        [
            markSeen(recipientId),
            typingOn(recipientId),
            ...messagePayloadArray,
            typingOff(recipientId),
        ]);
};

const sendWelcomeMessage = (recipientId) => {
    sendMessage(
        recipientId,
        [
            messages.napMessage
        ]);
};

const sendGoodMorning = (recipientId, fullName) => {
    sendMessage(
        recipientId,
        [
            messages.messageGoodMorning(fullName)
        ]);
};

const sendLearnToDay = (recipientId, fullName) => {
    console.log(fullName);
    // sendMessage(
    //     recipientId,
    //     [
    //         messages.messageLearnToday(fullName)
    //     ]);
};

const sendNotLearnToDay = (recipientId, fullName) => {
    sendMessage(
        recipientId,
        [
            messages.messageNotLearnToDay(fullName)
        ]);
};

const sendStartAppMessage =  (recipientId, listPlatform) => {
    sendMessage(
        recipientId,
        [
            messages.messageReviewPlatform,
            messages.messageListPlatForm(listPlatform),
        ]);
}

const sendSelectPlatform =  (recipientId, attachment_id) => {
    sendMessage(
        recipientId,
        [
            messages.messageImagePlatForm(attachment_id),
            messages.messageScaleForYou,
        ]);
}

const sendHowCustomer = (recipientId) => {
    sendMessage(
        recipientId,
        [
            messages.messageHowCustomer,
        ]);
};

const sendHowYourPlatform = (recipientId) => {
    sendMessage(
        recipientId,
        [
            messages.messageHowYourPlatform,
        ]);
};

const sendPleaseWriteThink = (recipientId) => {
    sendMessage(
        recipientId,
        [
            messages.messagePleaseWriteShortThink,
        ]);
}

const sendQuestionUserOrAdmin = (recipientId) => {
    sendMessage(
        recipientId,
        [
            messages.messageQuestionUserOrAdmin,
        ]);
}

const sendAccountLinkVerify = (recipientId) => {
    sendMessage(
        recipientId,
        [
            messages.messagePleaseActiveBOT,
            messages.messageAccountLink,
        ]);
}

const sendActiveBotSuccess = (recipientId, fullName) => {
    sendMessage(
        recipientId,
        [
            messages.messageActiveBotSuccess(fullName),
            messages.messageModeUserApp
        ]);
}

const sendModeUserApp = (recipientId) => {
    sendMessage(
        recipientId,
        [
            messages.messageModeUserApp
        ]);
};

const sendModePendingDevelop = (recipientId) => {
    sendMessage(
        recipientId,
        [
            messages.messageModePendingDevelop,
        ]);
}

const sendInfoUser = (recipientId, userInfo) => {
    sendMessage(
        recipientId,
        [
            messages.messageReplyInfoUser(userInfo),
        ]);
};

module.exports = {
    sendWelcomeMessage,
    sendStartAppMessage,
    sendSelectPlatform,
    sendHowCustomer,
    sendGoodMorning,
    sendHowYourPlatform,
    sendLearnToDay,
    sendNotLearnToDay,
    sendInfoUser,
    sendPleaseWriteThink,
    sendModeUserApp,
    sendQuestionUserOrAdmin,
    sendAccountLinkVerify,
    sendModePendingDevelop,
    sendActiveBotSuccess
}
