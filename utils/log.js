const fs = require(`fs`);
const moment = require(`moment`);

/**
 * Ghi nội dung log vào file
 * @param data: Dữ liệu cần ghi
 */
let writeLogToFile = (data) => {
    try {

        const dir = './logs';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        let fileName = __dirname + '/../logs/' + moment().format("YYYY_MM_DD_HH") + '.log';
        data = moment().format(`HH:mm:ss.SSS DD/MM/YY `) + data;
        console.log(data);
        data += `\n`;
        fs.appendFile(fileName, data, (error) => {
            if (error) console.log("error when write log: " + error)
        });
    } catch (e) {
        throw e;
    }
};

/**
 * Ghi lại log
 * @param message: Thông điệp
 * @param data: object (tùy chọn)
 */
let log = (message, data) => {
    try {
        if (!message) return;
        if (data !== undefined && data != null) {
            if (typeof data === `object`) data = JSON.stringify(data);
            message += ` ` + data.toString();
        }
        writeLogToFile(`LOG ` + message);
    } catch (e) {
        console.error(e);
    }
};

/**
 * Ghi lại lỗi
 * @param message: Thông điệp
 * @param data: object (tùy chọn)
 */
let err = (message, data) => {
    try {
        if (!message) return;
        if (typeof data === `object` && data.name === `ReferenceError`) data = data.stack;
        if ((data !== undefined && data != null)) {
            if (typeof data === `object`) data = JSON.stringify(data);
            message += ` ` + data.toString();
        }
        writeLogToFile(`ERROR ` + message);
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    log: log,
    err: err,
};