const receive = require('../messenger-api/receive');
const setup = require('../messenger-api/thread-setup');

class FBMessenger {
    constructor() {
    }

    async _get_test(req, res) {
        try {
            const { type, key, url, quick_reply, method } = req.query;
            let attachment_id = null;
            const message = {
                text: key,
                // if quick question
                quick_reply: !quick_reply ? null : {
                    payload: quick_reply
                }
            }
            const postback = {
                payload: key
            }

            const account_linking = { authorization_code: '5fbb8cc040dbb200049a7a62', status: 'linked' };
            // 108642264227705
            // 4681411058600771
            // 3699306160163292 cua tuan
            // 3630383753741535 cua luong
            const messengerPSID = 3699306160163292;
            if(type === "1"){
                console.log("Handle postback->>>>>>>>>>>>>>>>>>>>>>>", messengerPSID, postback);
                await receive.handleReceivePostback(messengerPSID, postback);
            }else if(type === "2"){
                console.log("Handle setup thread ->>>>>>>>>>>>>>>>>>>>>>>");
                method === "GET" ? setup.getProfileAPI(method) : setup.setProfileAPI();
                // _bot.settingStartedButtonPostback();
            }else if(type === "3"){
                console.log("Handle account_linking->>>>>>>>>>>>>>>>>>>>>>>", messengerPSID, postback);
                await receive.handleReceiveAccountLink(messengerPSID, account_linking);
            }else if (type === "4"){
                console.log("Handle set_personas->>>>>>>>>>>>>>>>>>>>>>>");
                method === "GET" ? setup.getPersonas() : setup.setPersonas();
            }else if(type === "5"){
                console.log("Handle upload media->>>>>>>>>>>>>>>>>");
                setup.uploadMedia();
            }
            else{
                console.log("Handle message->>>>>>>>>>>>>>>>>>>>>>>",messengerPSID, message);
                await receive.handleReceiveMessage(messengerPSID, message);
            }

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
                        receive.handleReceiveMessage(sender.id, message);
                    } else if (postback) {
                        receive.handleReceivePostback(sender.id, postback);
                    }else if(account_linking){
                        receive.handleReceiveAccountLink(sender.id, account_linking)
                    } else{
                        _log.err('Webhook received unknown messagingEvent: ', entry);
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
            let VERIFY_TOKEN = _config.BOT_MESSENGER.TOKEN

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