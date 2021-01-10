/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MESSENGER =============================================================
const api = require('./api');
const messages = require('./message');

/**
 * setGetStarted - Sets the Get Started button for the application
 *
 * @returns {undefined}
 */
const setProfileAPI= () => {
    const messageSettingProfile = {
        ...messages.messageGetStarted,
        ...messages.messagePersistentMenu,
        ...messages.messageIceBreakers,
        ...message.messageGreeting,
    }
    api.callMessengerProfileAPI(messageSettingProfile);
};

const getProfileAPI = () => {
    const messageSettingProfile = {
        fields: "account_linking_url,get_started,greeting,persistent_menu,ice_breakers"
    }
    api.callMessengerProfileAPI([], messageSettingProfile, "GET");
};

const setPersonas = () => {
    api.callMessengerPersonasAPI(messages.messageSettingPersonas);
}

const getPersonas = () => {
    api.callMessengerPersonasAPI([], [], "GET");
}

module.exports = {
    setProfileAPI,
    getProfileAPI,
    setPersonas,
    getPersonas
}
