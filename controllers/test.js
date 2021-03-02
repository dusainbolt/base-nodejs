const speechText = require('../connection/speech_text');
const _helper = require('../utils/helper');

const text = 'The best blogs share similar properties that make them successful: they post engaging and useful content that attracts visitors and makes them want to read more. Popular blog writers know how to communicate with their target audience, as they understand how their readership thinks and feels.\n' +
    '\n' +
    'Top-rated online blogs have plenty of traffic. Apart from enjoying well-deserved popularity, many blogs can become a lucrative source of income for talented bloggers.\n' +
    '\n' +
    'However, the quality of the content itself is sometimes not enough, meaning that most popular blogs also pay attention to design. Therefore, when creating this list, we also considered the best blog designs.\n' +
    '\n' +
    'If you’re looking for the best blog examples to inspire you, you’re on the right page. We have covered a wide variety of blogs and sorted them by niches. Read on!\n' +
    '\n' +
    '50+ examples of the most popular personal blogs in different niches\n' +
    'We selected some of the most currently popular niches and selected several blog examples for each niche. We researched every blog to learn more about CMS’s and the themes that they’re using. Finally, we included the sources of income for every blog, which can help you to understand how blogs make money.\n' +
    '\n' +
    'This list should inspire you to create your own personal blog in a niche you are passionate about. This is an opportunity to learn from the best in online business. If you feel like your blog deserves to be on this list, contact us.' +
    'The 50+ blogs included in this article met all of our content and design standards. If your goal was to find inspiration for your new blog, we hope that our list helped you in regards to both design and content.\n' +
    '\n' +
    'Ultimately, it’s important to remember several key rules that’ll make you a successful blogger, so let’s review them:\n' +
    '\n' +
    'Choose a profitable niche.\n' +
    'Be consistent.\n' +
    'Make sure your blog has an attractive design.\n' +
    'Have fun!\n' +
    'The last rule is truly what matters when it comes to blogging. As long as you have a real desire to write about the things that you love, people will feel the energy you have invested and appreciate your work!';

class Example {
    constructor() {
    }

    async _get_(req, res) {
        try {
            let data = `Welcome`;
            await speechText.run(text);
            // _helper.getParamsUploadSound('./')
            // const {Location} = await new Promise((resolve, reject) => {
            //     _s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
            // });

            return res.send({
                status: _res.STATUS.SUCCESS,
                message: _res.MESSAGE.SUCCESS,
                data: _helper.encode_data(req, {data}),
            })
        } catch (e) {
            // _log.err(`_test`, e);
            return res.send({
                status: _res.STATUS.ERROR,
                message: e.toString(),
                data: _helper.encode_data(req, null),
            })
        }
    }

    _get_check_view(req, res, io) {
        try {
            _log.log(`begin checkview`);
            const verify_code =  _helper.render_verify_code().toString();
            const array_code_verify = verify_code.split('');
            return res.render('template', {array_code_verify});
        } catch (e) {
            _log.err(`checkview`, e);
            return res.send({
                status: _res.STATUS.ERROR,
                message: e.toString(),
                data: _helper.encode_data(req, null),
            })
        }
    }
}

module.exports = Example;