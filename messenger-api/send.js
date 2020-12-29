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
    };
};

// Turns typing indicator off.
const typingOff = (recipientId) => {
    return {
        recipient: {
            id: recipientId,
        },
        sender_action: 'typing_off', // eslint-disable-line camelcase
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
    };
};
//
// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
    const messagePayloadArray = _.castArray(messagePayloads)
        .map((messagePayload) => messageToJSON(recipientId, messagePayload));
    api.callMessagesAPI(
        [
            typingOn(recipientId),
            ...messagePayloadArray,
            typingOff(recipientId),
        ]);
};

// Send a welcome message for a signed in user.
const sendLoggedInWelcomeMessage = (recipientId, username) => {
    sendMessage(
        recipientId,
        [
            messages.napMessage,
            messages.loggedInMessage(username),
        ]);
};

// Send a different Welcome message based on if the user is logged in.
const sendWelcomeMessage = (recipientId) => {
    // const userProfile = UserStore.getByMessengerId(recipientId);
    sendLoggedInWelcomeMessage(recipientId, "Du Sainbolt");
};

const sendStartAppMessage =  (recipientId, listPlatform) => {
    sendMessage(
        recipientId,
        [
            messages.messageReviewPlatform,
            messages.messageListPlatForm(listPlatform),
        ]);
}

module.exports = {
    sendWelcomeMessage,
    sendStartAppMessage,
}
