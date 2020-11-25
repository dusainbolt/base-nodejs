const obj_schema = new _mongoose.Schema({
    user: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    subject: {type: Number, default: null},
    status: { type: Number, default: _contains.COURSE.STATUS.PENDING },
    frequency: {type: Number, default: null},
    durationTime: {type: Number, default: null},
    targetTop: {type: Number, default: null},
    wishJob: {type: Number, default: null},
    completeExercise: {type: Number, default: null},
    outCondition: {type: Number, default: null},
    nowSkill: {type: String,default: null },
    mission: {type: String, default: null},
    reply: {type: String, default: null},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: null},
},{id: false, versionKey: 'v'});

obj_schema.index({user: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('course_rq', obj_schema);