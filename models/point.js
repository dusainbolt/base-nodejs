const FloatType = require('mongoose-float').loadType(_mongoose, 1);

const obj_schema = new _mongoose.Schema({
    user: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    lesson: { type: _mongoose.Schema.Types.ObjectId, ref: 'lesson', default: null },
    value: {type: FloatType, required: true},
    type: {type: Number, required: true, default: _contains.POINT.TYPE.JOIN_LESSON},
    created: {type: Date, default: Date.now},
},{id: false, versionKey: 'v'});

obj_schema.index({user: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('point', obj_schema);