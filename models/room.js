const constants = require(`../constants/constants.js`);

let obj_schema = new _mongoose.Schema({
    name: { type: String, require: true },
    color: { type: String, default: null },

    members: [{
        userId: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        timeJoin: { type: Date, default: Date.now },
        status: { type: Number, default:  constants.ROOM.MEMBER_STATUS.ACTIVE},
    }],

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
}, { id: false, versionKey: 'v' });

obj_schema.index({ name: 1 });
obj_schema.set('toJSON', { getters: true });
obj_schema.set('toObject', { getters: true });

module.exports = _mongoose.model('room', obj_schema);