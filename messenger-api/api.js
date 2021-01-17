const request = require('request');
/**
 * Send messages in order to the Facebook graph API.
 *
 * @param   {String}          endPoint - Specific endpoint to send data to
 * @param   {Object|Object[]} messageDataArray - Payloads to send individually
 * @param   {Object}          queryParams - Query Parameters
 * @param   {String}          method - method call API
 * @param   {Object}          retries - # of times to attempt to send a message.
 * @returns {undefined}
 */
const callAPI = (endPoint, messageDataArray, queryParams = {}, method= "POST", retries = 5) => {
    // Error if developer forgot to specify an endpoint to send our request to
    if (!endPoint) {
        _log.err('callAPI requires you specify an endpoint.');
        return;
    }

    // Error if we've run out of retries.
    if (retries < 0) {
        _log.err(
            'No more retries left.',
            {endPoint, messageDataArray, queryParams}
        );

        return;
    }

    // ensure query parameters have a PAGE_ACCESS_TOKEN value
    const query = Object.assign({access_token: _config.BOT_MESSENGER.TOKEN}, queryParams);

    // ready the first message in the array for send.
    const [messageToSend, ...queue] = _.castArray(messageDataArray);

        request({
            uri: `${_config.BOT_MESSENGER.API_URL}/${endPoint}`,
            qs: query,
            method,
            json: messageToSend,
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                // Message has been successfully received by Facebook.
                _log.log(
                    `Successfully sent message to ${endPoint} endpoint: `,
                    JSON.stringify(body)
                );

                // Continue sending payloads until queue empty.
                if (!_.isEmpty(queue)) {
                    callAPI(endPoint, queue, queryParams);
                }
            } else {
                // Retry the request
                _log.err(`Retrying Request: ${retries} left`);
                callAPI(endPoint, messageDataArray, queryParams, method,retries - 1);
            }
        });

};

const callMessagesAPI = (messageDataArray, queryParams = {}) => {
    return callAPI('messages', messageDataArray, queryParams);
};

const callMessengerProfileAPI = (messageDataArray, queryParams = {}, method = "POST") => {
    return callAPI('messenger_profile', messageDataArray, queryParams, method);
};

const callMessengerPersonasAPI = (messageDataArray, queryParams = {}, method = "POST") => {
    return callAPI('personas', messageDataArray, queryParams, method);
};

const callUploadMediaAPI = (messageDataArray, queryParams = {}, method = "POST") => {
    return callAPI('message_attachments', messageDataArray, queryParams, method);
    // "uri": `${_config.BOT_MESSENGER.API_URL}/message_attachments`,
    //     "qs": {"access_token": _config.BOT_MESSENGER.TOKEN},
    // "method": "POST",
    //     "json": {

    // }
};

module.exports = {
    callMessagesAPI,
    callMessengerProfileAPI,
    callMessengerPersonasAPI,
    callUploadMediaAPI
}
