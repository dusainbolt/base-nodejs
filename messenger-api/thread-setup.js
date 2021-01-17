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

const uploadMedia = () => {
    const type = "audio";

    // const url = "https://cdn.fbsbx.com/v/t59.3654-21/138275987_694270521190412_5295670704073622457_n.mp3/y2mate.com-Cu%E1%BB%99c-S%E1%BB%91ng-Xa-Nh%C3%A0-Minh-V%C6%B0%C6%A1ng-M4U-mp3cut.net.mp3?_nc_cat=104&ccb=2&_nc_sid=7272a8&_nc_ohc=X1q7Fl2b6O8AX8WVzp_&_nc_ht=cdn.fbsbx.com&oh=d2d75c9049ad8ff22fec5afe8eff937b&oe=6005F699&dl=1";
    const url = "https://cafebiz.cafebizcdn.vn/162123310254002176/2020/5/24/photo1590331614080-15903316154511002647008.png";
    api.callUploadMediaAPI(messages.messageUploadMedia(url));
};

module.exports = {
    setProfileAPI,
    getProfileAPI,
    setPersonas,
    getPersonas,
    uploadMedia
}
