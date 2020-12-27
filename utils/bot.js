class responseAPIMessenger {
    static responseListProjectWeb(list_platform) {
        const elements = list_platform.map(item => {
            const {title, subtitle, image_url, payload, title_button} = item;
            return {
                title, subtitle, image_url,
                buttons: [
                    {
                        "type": "postback",
                        title: title_button,
                        payload,
                    },
                ],
            }
        });
        console.log(elements);
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    elements
                }
            }
        }
    }
}

module.exports = responseAPIMessenger;
