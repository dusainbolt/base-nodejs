const validate_helper = require(`../utils/validate`);
const question_model = require(`../models/question`);
const lesson_model = require(`../models/lesson`);
const user_model = require(`../models/user`);

class Question {
    constructor() {
    }

    async _get_point_system(req, res) {
        try {
            _log.log(`params`, req.query);
            const data = await user_model.aggregate([
                {
                    $match: {
                        status: _contains.USER.STATUS.ACTIVE,
                        role: _contains.USER.ROLE.USER_COURSE,
                    }
                },
                {
                    $lookup:
                        {
                            from: "points",
                            localField: "_id",
                            foreignField: "user",
                            as: "points"
                        }
                },
                {
                    $project: {
                        "_id": "$_id",
                        "totalPointExercise": {
                            $reduce: {
                                input: "$points",
                                initialValue: 0,
                                in: {$add: ["$$value", "$$this.value"]}
                            }
                        },
                        "fullName": "$fullName",
                        "avatar": "$avatar",
                    }
                },
            ]);
            // const data_user_point = await user_model.find(
            //     {status: _contains.USER.STATUS.ACTIVE, role: _contains.USER.ROLE.USER_COURSE}
            // ).populate({
            //     path: "point"
            // }).select(_contains.USER.PARAMS_AVATAR);
            return res.send(_helper.render_response_success(req, data, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Question;