const jwt = require(`jsonwebtoken`);

const obj_schema = new _mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, default: null, hideJSON: true},
    status: {type: Number, default: _contains.USER.STATUS.ACTIVE},
    fullName: {type: String, required: true},
    job: {type: String, default: null},
    jobAddress: {type: String, default: null},
    gender: {type: Number, default: null},
    birthday: {type: Number, default: null},
    facebook: {type: String, default: null},
    country: {type: String, default: null},
    phoneNumber: {type: String, default: null},
    avatar: {type: String, default: null},
    cover: {type: String, default: null},
    description: {type: String, default: null},
    role: {type: String, default: null},
    messengerPSID: {type: Number, default: null},
    point: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'point', default: null }],
    courseRequest: { type: _mongoose.Schema.Types.ObjectId, ref: 'course_rq', default: null },
    class: { type: _mongoose.Schema.Types.ObjectId, ref: 'class', default: null },
    tokens: {type: Array, default: null, hideJSON: true},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: null},
}, {id: false, versionKey: 'v'});
// timestamps: true, tạo create và updated
obj_schema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        _config.JWT.PRIVATE_KEY,
        {
            expiresIn: _config.JWT.AGE,
        }
    );
    this.tokens = this.tokens.concat({token});
    if (this.status !== _contains.USER.STATUS.ACTIVE) {
        this.status = _contains.USER.STATUS.ACTIVE;
    }
    await this.save();
    return token;
}

obj_schema.methods.addPoint = async function (pointId) {
    this.point = this.point.concat(pointId);
    await this.save();
    return this;
}

// obj_schema.pre('save', function (next) {
//     this.updated = Date.now;
//     next();
// })

obj_schema.index({email: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});
obj_schema.plugin(_mongooseHidden, {hidden: {_id: false}});
obj_schema.plugin(_mongoose_pageinate);

module.exports = _mongoose.model('user', obj_schema);