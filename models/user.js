const constants = require(`../constants/constants.js`);
const jwt = require(`jsonwebtoken`);

const obj_schema = new _mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, default: null},
    status: {type: Number, default: constants.USER.STATUS.ACTIVE},
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
    tokens: [{
        token: {
            type: String,
        },
    }],
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: null},
    // course: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'course_rq' }]
    // job: { type: _mongoose.Schema.Types.ObjectId, ref: 'gender', required: true },
}, {id: false, versionKey: 'v'});

obj_schema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        },
        _config.JWT.PRIVATE_KEY,
        {
            expiresIn: _config.JWT.AGE,
        }
    );
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

obj_schema.index({email: 1});
obj_schema.set('toJSON', {getters: true});
obj_schema.set('toObject', {getters: true});


module.exports = _mongoose.model('user', obj_schema);