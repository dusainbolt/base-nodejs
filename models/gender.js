const constants = require(`../constants/constants.js`);

let obj_schema = new _mongoose.Schema({
    name: { type: String, require: true },
    icon: { type: String, require: true },

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
    status: { type: Number, default: constants.GENDER.STATUS.ACTIVE },
}, { id: false, versionKey: 'v' });

obj_schema.index({ name: 1 });
obj_schema.set('toJSON', { getters: true });
obj_schema.set('toObject', { getters: true });

module.exports = _mongoose.model('gender', obj_schema);