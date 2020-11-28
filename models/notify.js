const obj_schema = new _mongoose.Schema({
    user: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    class: { type: _mongoose.Schema.Types.ObjectId, ref: 'class', required: true },
    subject: {type: String, default: null},
    message: {type: String, default: null},
    link: {type: String, default: null},
    type: {type: Number, default: _contains.NOTIFY.TYPE.EMAIL},
    created: {type: Date, default: Date.now},
},{id: false, versionKey: 'v'});

obj_schema.index({user: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('notify', obj_schema);