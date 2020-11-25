const obj_schema = new _mongoose.Schema({
    name: {type: String, default: null},
    status: {type: Number, default: _contains.COURSE.STATUS.PENDING},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: null},
}, {id: false, versionKey: 'v'});

obj_schema.index({name: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('subject', obj_schema);