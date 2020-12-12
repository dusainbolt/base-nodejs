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
                        "class": "$class",
                        "fullName": "$fullName",
                        "avatar": "$avatar",
                        "pointManage": {
                            $reduce: {
                                input: "$points",
                                initialValue: {totalPoint: 0, sumPointExercise: 0, sumPointManage: 0},
                                in: {
                                    totalPoint: {$add: ["$$value.totalPoint", "$$this.value"]},
                                    // countExercise: {$add: ["$$value.sumPointExercise", _aggre.POINT.COUNT_EXERCISE]},
                                    sumPointManage: {$add: ["$$value.sumPointManage", _aggre.POINT.COUNT_POINT_MANAGE]},
                                    sumPointExercise: {$add: ["$$value.sumPointExercise", _aggre.POINT.COUNT_POINT_EXERCISE]},
                                    // avgExercise:  {$avg: _aggre.POINT.COUNT_POINT_EXERCISE}
                                }
                            }
                        },
                    }
                },
            ]);
            return res.send(_helper.render_response_success(req, data, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Question;