const obj_schema = new _mongoose.Schema({
    listUser: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'user', default: null }],
    listLesson: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'lesson', required: null }],
    subject: { type: _mongoose.Schema.Types.ObjectId, ref: 'subject', required: true },
    user: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: {type: String, default: null},
    status: {type: Number, default: _contains.CLASS.STATUS.ACTIVE},
    avatar: {type: String, default: _logic.MY_LOGO_S3},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: null},
}, {id: false, versionKey: 'v'});

obj_schema.index({name: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('class', obj_schema);