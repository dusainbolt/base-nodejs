let nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer
let transporter = null;
const hbs = require('nodemailer-express-handlebars');
const path   = require('path');

try {
    transporter = nodemailer.createTransport({ // config mail server
        host: _config.EMAIL.HOST,
        port: _config.EMAIL.PORT,
        secure: false,
        requireTLS: true,
        pool: true,
        auth: {
            user: _config.EMAIL.USERNAME,
            pass: _config.EMAIL.PASSWORD,
        },
    });
    // config render view template
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.hbs',
            partialsDir: path.join(__dirname, '../views/'),
            layoutsDir: path.join(__dirname, '../views/'),
            defaultLayout: ''
        },
        viewPath: path.join(__dirname, '../views/'),
        extName: '.hbs'
    }));
} catch (e) {
    throw e;
}

module.exports = transporter;