const bcrypt = require('bcryptjs');
const user_model = require(`../models/user`);
const setting_model = require(`../models/setting`);

class Init {
    constructor() {
    }

    async create_data_default() {
        try {
            const users = await this.create_user();
            const settings = await this.create_setting();
            _log.log(`Init data done`);
        } catch (e) {
            _log.err(`Init data fail`, e.toString());
        }
    }

    /**
     * Tạo list bot messenger flatform
     * @returns {Promise<*>}
     */
    async create_setting() {
        try {
            let setting = await setting_model.find({type: _contains.SETTING.TYPE.PLATFORM});
            if (setting.length === 0) {
                const setting_default = [
                    {
                        type: _contains.SETTING.TYPE.PLATFORM,
                        value: [
                            {
                                title: "Live Stream & Meeting platform",
                                subtitle: "Ứng dụng live stream chia sẻ video trực tiếp",
                                attachment_id: 192257479089044,
                                image_url: "https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/133420619_1023140508170314_1014845409600071761_n.jpg?_nc_cat=109&ccb=2&_nc_sid=730e14&_nc_ohc=fd7kTkDdEI0AX9gLovj&_nc_ht=scontent.fhan2-5.fna&oh=e1de5fe267d257e017f6b50fbe4bd776&oe=600E4279",
                                payload: `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_1`,
                                title_button: "Lựa chọn",
                                status: _contains.SETTING.STATUS.ACTIVE,
                            },
                            {
                                title: "Social platform",
                                subtitle: "Mạng xã hội chia sẻ nội dung và tương tác",
                                attachment_id: 828950521291762,
                                image_url: "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/133132622_1023159614835070_4339965576262158696_n.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=1kxV4wryLY4AX92yduN&_nc_ht=scontent.fhan2-1.fna&oh=239ff3047049ad1a110cc2a1e4bd4000&oe=600E8117",
                                payload: `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_2`,
                                title_button: "Lựa chọn",
                                status: _contains.SETTING.STATUS.ACTIVE,
                            },
                            {
                                title: "Online Shopping",
                                subtitle: "Ứng dụng kinh doanh và mua hàng online",
                                image_url: "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/133640621_1023159601501738_63041509809506325_n.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=HhwsFqO2iqIAX9pRKNR&_nc_ht=scontent.fhan2-1.fna&oh=f3f8455671b3142759272b3857c1b6f9&oe=600B0F48",
                                attachment_id: 1796817517159720,
                                payload: `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_3`,
                                title_button: "Lựa chọn",
                                status: _contains.SETTING.STATUS.ACTIVE,
                            },
                            {
                                title: "News Online",
                                subtitle: "Truyển tải tin tức về các chủ đề tới người đọc",
                                attachment_id: 215596983470707,
                                image_url: "https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/133297786_1023161784834853_3156164981437887707_n.jpg?_nc_cat=105&ccb=2&_nc_sid=730e14&_nc_ohc=U7M_VLiMMzwAX_hwhuf&_nc_ht=scontent.fhan2-4.fna&oh=a19a3e02f065756619517155da93a32a&oe=600D636F",
                                payload: `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_4`,
                                title_button: "Lựa chọn",
                                status: _contains.SETTING.STATUS.ACTIVE,
                            },
                            {
                                title: "System Admin",
                                subtitle: "Quản trị doanh nghiệp hoặc hệ thống",
                                attachment_id: 4384837678209312,
                                image_url: "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/133579519_1023159604835071_1797166402872626382_n.jpg?_nc_cat=111&ccb=2&_nc_sid=730e14&_nc_ohc=zZGUdhfDpTsAX8UA2AK&_nc_ht=scontent.fhan2-2.fna&oh=bb61c0e5cef3ec081643fb7d843af434&oe=600B9047",
                                payload: `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_5`,
                                title_button: "Lựa chọn",
                                status: _contains.SETTING.STATUS.ACTIVE,
                            },
                            {
                                title: "Landing Page",
                                subtitle: "Dẵn dắt giới thiệu thương hiệu tới người dùng",
                                attachment_id: 2718374775092860,
                                image_url: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/133615014_1023159621501736_7044558055662516896_n.jpg?_nc_cat=108&ccb=2&_nc_sid=730e14&_nc_ohc=Xf7Ah6699sEAX-H9rm0&_nc_ht=scontent.fhan2-3.fna&oh=3d190b33992bc8c72d1aebe947dccc22&oe=600EAFF2",
                                payload: `${_logic.BOT.PAYLOAD_LIST_PLATFORM}_6`,
                                title_button: "Lựa chọn",
                                status: _contains.SETTING.STATUS.ACTIVE,
                            }
                        ]
                    }
                ];
                setting = await setting_model.insertMany(setting_default);
            }
            return setting;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Tạo user
     * @param genders: Danh sách giới tính
     * @returns {Promise<*>}
     */
    async create_user() {
        try {
            // if (!genders || !genders.length) return;
            let users = await user_model.find({});
            if (users.length === 0) {
                let data_user = [];
                for (let item of _contains.USER.DATA_DEFAULT) {
                    // gender_random = genders[Math.floor(Math.random() * genders.length)];
                    item.password = await bcrypt.hash(item.password, _config.BCRYPT.SALT);
                    // item.genderId = gender_random._id;
                    data_user.push(item);
                }
                users = await user_model.insertMany(data_user);
                // users = await  user_model.create({..._contains.USER.DATA_DEFAULT,
                //     password: await bcrypt.hash(_contains.USER.DATA_DEFAULT.password, _config.BCRYPT.SALT),
                // });
            }
            return users;
        } catch (e) {
            throw e;
        }
    }
}


module.exports = Init;