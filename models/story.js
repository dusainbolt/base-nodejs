const constants = require(`../constants/constants.js`);

let obj_schema = new _mongoose.Schema({
    userId: { type: _mongoose.Schema.Types.ObjectId, ref: 'user', required: true },

    content: { type: String, require: true },
    images: [{ type: String, default: [] }],

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },

    status: { type: Number, default: constants.STORY.STATUS.PUBLIC },
}, { id: false, versionKey: 'v' });

// obj_schema.index({ name: 1 });
obj_schema.set('toJSON', { getters: true });
obj_schema.set('toObject', { getters: true });

module.exports = _mongoose.model('story', obj_schema);