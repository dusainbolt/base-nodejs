const obj_schema = new _mongoose.Schema({
    user: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    lesson: { type: _mongoose.Schema.Types.ObjectId, ref: 'lesson', required: true },
    description: {type: String, default: null},
    status: {type: Number, default: _contains.LESSON.STATUS_MANAGE.JOINED},
    created: {type: Date, default: Date.now},
},{id: false, versionKey: 'v'});

obj_schema.index({user: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('lesson_manage', obj_schema);