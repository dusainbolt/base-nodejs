const validate_helper = require(`../utils/validate`);
const question_model = require(`../models/question`);
const lesson_model = require(`../models/lesson`);

class Subject {
    constructor() {
    }

    async _add_question(req, res) {
        try {
            _log.log(`body`, req.body);
            await validate_helper.get_validate_add_question().validate(req.body);
            const {lessonId, message} = req.body;
            let new_question = await new question_model({
                lesson: lessonId, message, user: req.user._id
            }).save();
            await lesson_model.findByIdAndUpdate(lessonId,{$push:{listQuestion: new_question._id}} );
            return res.send(_helper.render_response_success(req, new_question, _res.MESSAGE.SUCCESS));
        } catch (e) {
            _log.err(`_add_class`, e);
            return res.send(_helper.render_response_error(req, e));
        }
    }
}

module.exports = Subject;