var schedule = require('node-schedule');
const user_model = require('../models/user');

const run_schedule =  () => {
    let startTime = new Date(Date.now() + 5000);
    let endTime = new Date(startTime.getTime() + 5000);
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(4, 6)];
    rule.hour = 15;
    rule.minute = 1;
    rule.second = 45;

    var j = schedule.scheduleJob(rule, async function(fireDate){
        console.log('Time for tea!', fireDate);
        // console.log(await user_model.find());
        const message = {
            text: "hello"
        }
        // _bot.callSendAPIFB(4681411058600771, message);
    });
    // return;
};

// '42 * * * *' Execute a cron job when the minute is 42 (e.g. 19:42, 20:42, etc.).
// '*/5 * * * *', Execute a cron job every 5 Minutes = */5 * * * *
// var date = new Date(2020, 11, 26, 14, 56, 20); // time target on your timezone

// rule.hour = 14;
// rule.minute = 59;
// rule.second = 45;

module.exports = {
    run_schedule: run_schedule,
};