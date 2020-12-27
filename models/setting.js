const obj_schema = new _mongoose.Schema({
    type: {type: Number, default: null},
    value: {type: Array, default: null},
},{id: false, versionKey: 'v', timestamps: true });

obj_schema.index({type: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('setting', obj_schema);