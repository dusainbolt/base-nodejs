let obj_schema = new _mongoose.Schema({
    userId: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    roomId: { type: _mongoose.Schema.Types.ObjectId, ref: 'room', required: true },

    message: { type: String, require: true },
    color: { type: String, default: null },

    emotions: [{
        userId: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        time: { type: Date, default: Date.now },//Thời điểm thả cảm xúc cho message
    }],

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },

    status: { type: Number, default: 1 }, //1: Hiển thị, 2: Bị thu hồi
}, { id: false, versionKey: 'v' });

obj_schema.index({ userId: 1, roomId: 1 });
obj_schema.set('toJSON', { getters: true });
obj_schema.set('toObject', { getters: true });

module.exports = _mongoose.model('message', obj_schema);