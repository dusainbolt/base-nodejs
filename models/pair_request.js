const constants = require(`../constants/constants.js`);

let obj_schema = new _mongoose.Schema({
    userId: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    genderId: { type: _mongoose.Schema.Types.ObjectId, ref: 'gender', required: true },
    type: { type: Number, required: true },

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },

    status: { type: Number, default: constants.PAIR_REQUEST.STATUS.UN_FINISH },
}, { id: false, versionKey: 'v' });

obj_schema.index({ userId: 1 });
obj_schema.set('toJSON', { getters: true });
obj_schema.set('toObject', { getters: true });

module.exports = _mongoose.model('pair_request', obj_schema);