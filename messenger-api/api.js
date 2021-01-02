const request = require('request');
/**
 * Send messages in order to the Facebook graph API.
 *
 * @param   {String}          endPoint - Specific endpoint to send data to
 * @param   {Object|Object[]} messageDataArray - Payloads to send individually
 * @param   {Object}          queryParams - Query Parameters
 * @param   {Object}          retries - # of times to attempt to send a message.
 * @returns {undefined}
 */
const callAPI = (endPoint, messageDataArray, queryParams = {}, retries = 5) => {
    // Error if developer forgot to specify an endpoint to send our request to
    if (!endPoint) {
        console.error('callAPI requires you specify an endpoint.');
        return;
    }

    // Error if we've run out of retries.
    if (retries < 0) {
        console.error(
            'No more retries left.',
            {endPoint, messageDataArray, queryParams}
        );

        return;
    }

    // ensure query parameters have a PAGE_ACCESS_TOKEN value
    /* eslint-disable camelcase */
    const query = Object.assign({access_token: _config.BOT_MESSENGER.TOKEN}, queryParams);
    /* eslint-enable camelcase */

    // ready the first message in the array for send.
    const [messageToSend, ...queue] = _.castArray(messageDataArray);
    request({
        uri: `${_config.BOT_MESSENGER.API_URL}/${endPoint}`,
        qs: query,
        method: 'POST',
        json: messageToSend,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            // Message has been successfully received by Facebook.
            console.log(
                `Successfully sent message to ${endPoint} endpoint: `,
                JSON.stringify(body)
            );

            // Continue sending payloads until queue empty.
            if (!_.isEmpty(queue)) {
                callAPI(endPoint, queue, queryParams);
            }
        } else {
            // Message has not been successfully received by Facebook.
            console.error(
                `Failed calling Messenger API endpoint ${endPoint}`,
                response.statusCode,
                response.statusMessage,
                body.error,
                queryParams
            );

            // Retry the request
            console.error(`Retrying Request: ${retries} left`);
            callAPI(endPoint, messageDataArray, queryParams, retries - 1);
        }
    });
};

const callMessagesAPI = (messageDataArray, queryParams = {}) => {
    return callAPI('messages', messageDataArray, queryParams);
};

const callMessengerProfileAPI = (messageDataArray, queryParams = {}) => {
    return callAPI('messenger_profile', messageDataArray, queryParams);
};

module.exports = {
    callMessagesAPI,
    callMessengerProfileAPI
}
