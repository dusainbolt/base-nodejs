const obj_schema = new _mongoose.Schema({
    user: {type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    listClass: [{type: _mongoose.Schema.Types.ObjectId, ref: 'class', default: null}],
    name: {type: String, default: null},
    avatar: {type: String, default: _logic.MY_LOGO_S3},
    status: {type: Number, default: _contains.SUBJECT.STATUS.ACTIVE},
    created: {type: Date, default: Date.now},
}, {id: false, versionKey: 'v'});

obj_schema.index({name: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('subject', obj_schema);