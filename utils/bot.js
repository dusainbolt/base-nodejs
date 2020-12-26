const request = require('request');

class responseAPIMessenger {

    static responseListProjectWeb() {
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "list",
                    "top_element_style": "compact",
                    "elements": [
                        {
                            "title": "Classic T-Shirt Collection",
                            "subtitle": "See all our colors",
                            "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",
                            "buttons": [
                                {
                                    "title": "View",
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/collection",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                }
                            ]
                        },
                    ]
                }
            }
        }
    }

}

module.exports = responseAPIMessenger;
