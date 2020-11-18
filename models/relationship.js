const constants = require(`../constants/constants.js`);

let obj_schema = new _mongoose.Schema(
  {
    userFirstId: { type: _mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    userSecondId: { type: _mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    showStoryFirst: { type: Boolean, default: true },
    showStorySecond: { type: Boolean, default: true },

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },

    status: { type: Number, default: constants.RELATIONSHIP.STATUS.ACTIVE }, //1: Hoạt động, 2: Đã bị chặn
  },
  { id: false, versionKey: "v" }
);

obj_schema.index({ userFirstId: 1, userSecondId: 1 });
obj_schema.set("toJSON", { getters: true });
obj_schema.set("toObject", { getters: true });

module.exports = _mongoose.model("relationship", obj_schema);
