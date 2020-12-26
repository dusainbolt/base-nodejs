class responseAPIMessenger {
    static responseListProjectWeb() {
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Live Stream & Meeting platform",
                        "subtitle": "Ứng dụng live stream chia sẻ video trực tiếp",
                        "image_url": "https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/133420619_1023140508170314_1014845409600071761_n.jpg?_nc_cat=109&ccb=2&_nc_sid=730e14&_nc_ohc=fd7kTkDdEI0AX9gLovj&_nc_ht=scontent.fhan2-5.fna&oh=e1de5fe267d257e017f6b50fbe4bd776&oe=600E4279",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Lựa chọn",
                                "payload": "yes",
                            },
                        ],
                    }, {
                        "title": "Social platform",
                        "subtitle": "Mạng xã hội chia sẻ nội dung và tương tác",
                        "image_url": "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/133132622_1023159614835070_4339965576262158696_n.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=1kxV4wryLY4AX92yduN&_nc_ht=scontent.fhan2-1.fna&oh=239ff3047049ad1a110cc2a1e4bd4000&oe=600E8117",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Lựa chọn",
                                "payload": "yes",
                            },
                        ],
                    },{
                        "title": "Online Shopping",
                        "subtitle": "Ứng dụng kinh doanh và mua hàng online",
                        "image_url": "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/133640621_1023159601501738_63041509809506325_n.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=HhwsFqO2iqIAX9pRKNR&_nc_ht=scontent.fhan2-1.fna&oh=f3f8455671b3142759272b3857c1b6f9&oe=600B0F48",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Lựa chọn",
                                "payload": "yes",
                            },
                        ],
                    },
                        {
                            "title": "News Online",
                            "subtitle": "Truyển tải tin tức về các chủ đề tới người đọc",
                            "image_url": "https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/133297786_1023161784834853_3156164981437887707_n.jpg?_nc_cat=105&ccb=2&_nc_sid=730e14&_nc_ohc=U7M_VLiMMzwAX_hwhuf&_nc_ht=scontent.fhan2-4.fna&oh=a19a3e02f065756619517155da93a32a&oe=600D636F",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Lựa chọn",
                                    "payload": "yes",
                                },
                            ],
                        },
                        {
                            "title": "System Admin",
                            "subtitle": "Quản trị doanh nghiệp hoặc hệ thống",
                            "image_url": "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/133579519_1023159604835071_1797166402872626382_n.jpg?_nc_cat=111&ccb=2&_nc_sid=730e14&_nc_ohc=zZGUdhfDpTsAX8UA2AK&_nc_ht=scontent.fhan2-2.fna&oh=bb61c0e5cef3ec081643fb7d843af434&oe=600B9047",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Lựa chọn",
                                    "payload": "yes",
                                },
                            ],
                        },
                        {
                            "title": "Landing Page",
                            "subtitle": "Dẵn dắt giới thiệu thương hiệu tới người dùng",
                            "image_url": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/133615014_1023159621501736_7044558055662516896_n.jpg?_nc_cat=108&ccb=2&_nc_sid=730e14&_nc_ohc=Xf7Ah6699sEAX-H9rm0&_nc_ht=scontent.fhan2-3.fna&oh=3d190b33992bc8c72d1aebe947dccc22&oe=600EAFF2",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Lựa chọn",
                                    "payload": "yes",
                                },
                            ],
                        },
                    ]
                }
            }
        }
    }
}

module.exports = responseAPIMessenger;
