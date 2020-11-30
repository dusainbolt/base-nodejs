const obj_schema = new _mongoose.Schema({
    class: { type: _mongoose.Schema.Types.ObjectId, ref: 'class', required: true },
    user: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    listQuestion: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'question', required: null }],
    listManage: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'lesson_manage', required: null }],
    title: {type: String, required: true},
    description: {type: String, default: null},
    expectedTime: {type: Number, required: true},
    duration: {type: Number, required: true},
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