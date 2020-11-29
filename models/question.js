const obj_schema = new _mongoose.Schema({
    user: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    lesson: { type: _mongoose.Schema.Types.ObjectId, ref: 'lesson', required: true},
    message: {type: String, required: true},
    react: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'user', default: null }],
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: null},
},{id: false, versionKey: 'v'});

obj_schema.index({user: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('question', obj_schema);