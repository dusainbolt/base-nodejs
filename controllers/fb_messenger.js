const receive = require('../messenger-api/receive');

class FBMessenger {
    constructor() {
    }

    async _get_test(req, res) {
        try {
            const { type, key, url, quick_reply } = req.query;
            let attachment_id = null;
            const message = {
                text: key,
                // if quick question
                quick_reply: !quick_reply ? null : {
                    payload: quick_reply
                }
            }
            console.log(message);
            const postback = {
                payload: key
            }
            // 108642264227705
            // 4681411058600771
            const messengerPSID = 4681411058600771;
            if(type){
                await receive.handleReceivePostback(messengerPSID, postback);

            }else{
                await receive.handleReceiveMessage(messengerPSID, message);
            }
            // _bot.settingStartedButtonPostback();
            // attachment_id = await _bot.uploadAttachmentFromUrl(url);

            res.status(200).send('EVENT_RECEIVED: ' + attachment_id);
        } catch (e) {
            _log.err(`_get_test`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _post_webhook(req, res) {
        try {
            let body = req.body;

            // Checks this is an event from a page subscription
            if (body.object === 'page') {

                // Iterates over each entry - there may be multiple if batched
                body.entry.forEach(function (entry) {

                    // Gets the message. entry.messaging is an array, but
                    // will only ever contain one message, so we get index 0
                    const webhook_event = entry.messaging[0];
                    // Get the sender PSID
                    const { sender, message, postback, account_linking } = webhook_event;
                    console.log('Sender PSID: ' + sender.id, message, postback, account_linking);

                    // Check if the event is a message or postback and
                    // pass the event to the appropriate handler function
                    if (message) {
                        receive.handleReceivePostback(sender.id, message);
                    } else if (postback) {
                        receive.handleReceiveMessage(sender.id, postback);
                    }
                });

                // Returns a '200 OK' response to all requests
                res.status(200).send('EVENT_RECEIVED');
            } else {
                // Returns a '404 Not Found' if event is not from a page subscription
                res.sendStatus(404);
            }
        } catch (e) {
            _log.err(`_get_list`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

    async _get_webhook(req, res) {
        try {
            // Your verify token. Should be a random string.
            let VERIFY_TOKEN = _config.TOKEN_BOT_MESSENGER

            // Parse the query params
            let mode = req.query['hub.mode'];
            let token = req.query['hub.verify_token'];
            let challenge = req.query['hub.challenge'];

            // Checks if a token and mode is in the query string of the request
            if (mode && token) {

                // Checks the mode and token sent is correct
                if (mode === 'subscribe' && token === VERIFY_TOKEN) {

                    // Responds with the challenge token from the request
                    console.log('WEBHOOK_VERIFIED');
                    res.status(200).send(challenge);

                } else {
                    // Responds with '403 Forbidden' if verify tokens do not match
                    res.sendStatus(403);
                }
            }
        } catch (e) {
            _log.err(`_get_list`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }

}

module.exports = FBMessenger;