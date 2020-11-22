const bcrypt = require('bcryptjs');
const constants = require(`../constants/constants.js`);
const user_model = require(`../models/user.js`);

class Init {
    constructor() {
    }

    async create_data_default() {
        try {
            let users = await this.create_user();
            _log.log(`Init data done`);
        } catch (e) {
            _log.err(`Init data fail`, e.toString());
        }
    }

    /**
     * Tạo Giới tính
     * @returns {Promise<*>}
     */
    // async create_gender() {
    //     try {
    //         let genders = await gender_model.find({});
    //         if (genders.length === 0)
    //             genders = await gender_model.insertMany(constants.GENDER.DATA_DEFAULT);
    //         return genders;
    //     } catch (e) {
    //         throw e;
    //     }
    // }

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
                for (let item of constants.USER.DATA_DEFAULT) {
                    // gender_random = genders[Math.floor(Math.random() * genders.length)];
                    item.password = await bcrypt.hash(item.password, _config.BCRYPT.SALT);
                    // item.genderId = gender_random._id;
                    data_user.push(item);
                }
                users = await user_model.insertMany(data_user);
                // users = await  user_model.create({...constants.USER.DATA_DEFAULT,
                //     password: await bcrypt.hash(constants.USER.DATA_DEFAULT.password, _config.BCRYPT.SALT),
                // });
            }
            return users;
        } catch (e) {
            throw e;
        }
    }
}


module.exports = Init;