module.exports = {
    POINT: {
        // check lap pointlist count value neu type khac cham diem bai tap
        COUNT_POINT_MANAGE: {
            $cond: {
                if: {$eq: ["$$this.type", _contains.POINT.TYPE.REPLY_QUESTION]},
                then: 0,
                else: "$$this.value",
            }
        },
        // check lap pointlist count value neu type khac cham diem bai tap
        COUNT_POINT_EXERCISE: {
            $cond: {
                if: {$eq: ["$$this.type", _contains.POINT.TYPE.REPLY_QUESTION]},
                then: "$$this.value",
                else: 0,
            }
        },
        COUNT_EXERCISE: {
            $cond: {
                if: {$eq: ["$$this.type", _contains.POINT.TYPE.REPLY_QUESTION]},
                then: 1,
                else: 0,
            }
        }
    }
};