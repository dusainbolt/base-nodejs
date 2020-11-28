const obj_schema = new _mongoose.Schema({
    listUser: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'user', default: null }],
    listUserOff: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'user', default: null }],
    title: {type: String, required: true},
    description: {type: String, default: null},
    startTime: {type: Number, default: null},
    endTime: {type: Number, default: null},
    status: {type: Number, default: _contains.LESSON.STATUS.PENDING},
    created: {type: Date, default: Date.now},
},{id: false, versionKey: 'v'});

obj_schema.index({user: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('lesson', obj_schema);