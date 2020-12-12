const user_model = require(`../models/user`);

class Question {
    constructor() {
    }

    async _get_point_system(req, res) {
        try {
            _log.log(`params`, req.query);
            const { sortType, sortBy } = req.query;
            const sort_by = sortBy || _logic.SORT_TYPE_POINT_DASHBOARD;
            const sort_type = sortType || _logic.DESC;
            const data = await user_model.aggregate([
                {
                    $match: {status: _contains.USER.STATUS.ACTIVE, role: _contains.USER.ROLE.USER_COURSE,}
                },
                {
                    $lookup: {from: "points", localField: "_id", foreignField: "user", as: "points"}
                },
                {
                    $set: {
                        "pointManage": {
                            $reduce: {
                                input: "$points",
                                initialValue: {totalPoint: 0, countExercise: 0, sumPointExercise: 0, sumPointManage: 0},
                                in: {
                                    totalPoint: {$add: ["$$value.totalPoint", "$$this.value"]},
                                    countExercise: {$add: ["$$value.countExercise", _aggre.POINT.COUNT_EXERCISE]},
                                    sumPointManage: {$add: ["$$value.sumPointManage", _aggre.POINT.COUNT_POINT_MANAGE]},
                                    sumPointExercise: {$add: ["$$value.sumPointExercise", _aggre.POINT.COUNT_POINT_EXERCISE]},
                                }
                            }
                        },
                    }
                },
                {
                    $set: {
                        "max": {$max: `$pointManage.${sort_by}`},
                    }
                },
                {$sort: {'pointManage.totalPoint': sort_type}},
                {
                    $group: {
                        _id: "$class",
                        max: {$first: "$max"},
                        sortBy: {$first: sort_by},
                        users: {
                            $push: {
                                _id: "$_id",
                                fullName: "$fullName",
                                avatar: "$avatar",
                                point: "$pointManage",
                            }
                        },
                    }
                }, {
                    $lookup: {from: "classes", localField: "_id", foreignField: "_id", as: "class"}
                }
            ]);
            return res.send(_helper.render_response_success(req, data, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Question;