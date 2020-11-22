const obj_schema = new _mongoose.Schema({
    userId: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    frequency: {type: Number, required: true},
    durationTime: {type: Number, required: true},
    targetTop: {type: Number, required: true},
    wishJob: {type: Number, required: true},
    completeExercise: {type: Number, required: true},
    outCondition: {type: Number, required: true},
    nowSkill: {type: String, required: true},
    mission: {type: String, required: true},
},{id: false, versionKey: 'v'});

module.exports = _mongoose.model('course_rq', obj_schema);