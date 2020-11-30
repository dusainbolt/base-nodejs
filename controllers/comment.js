const validate_helper = require(`../utils/validate`);
const question_model = require(`../models/question`);
const comment_qs = require(`../models/comment_qs`);

class Question {
    constructor() {
    }

    async _get_list_by_question(req, res) {
        try {
            _log.log(`params`, req.query);
            await validate_helper.get_validate_list_comment_for_question().validate(req.query);
            const data_comment = await question_model.findById(req.query.questionId)
                .populate({
                    path: 'listComment',
                    populate: {path: 'user', select: _contains.USER.PARAMS_AVATAR}
                }).select();
            return res.send(_helper.render_response_success(req, data_comment, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_email_notify_course`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
    async _add_comment_question(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_add_comment_question().validate(req.body);
            const {questionId, message} = req.body;
            let new_comment = await new comment_qs({
                question: questionId, message, user: req.user._id
            }).save();
            await question_model.findByIdAndUpdate(questionId, {$push: {listComment: new_comment._id}});
            return res.send(_helper.render_response_success(req, new_comment, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_add_class`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Question;