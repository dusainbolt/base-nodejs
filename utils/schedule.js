const schedule = require('node-schedule');
const user_model = require('../models/user');
const sendAPI = require('../messenger-api/send');
const moment = require('moment');
const run_schedule = async  () => {
    const rule_1 = new schedule.RecurrenceRule();
    rule_1.dayOfWeek = [0, new schedule.Range(0, 6)];
    rule_1.hour = 6;
    rule_1.minute = 10;
    rule_1.second = 0;

    const rule_2 = new schedule.RecurrenceRule();
    rule_2.dayOfWeek = [0, new schedule.Range(0, 6)];
    rule_2.hour = 0;
    rule_2.minute = 59;
    rule_2.second = 20;

    let s_1 = schedule.scheduleJob(rule_1, async function(fireDate){
        console.log('Chay chao buoi sang cho ae', fireDate);
        const list_user_bot = await user_model.find({messengerPSID: {$ne : null}});
        //     sendAPI.sendWelcomeMessage(3753056791420958);
        for(let i = 1; i < list_user_bot.length; i++){
            setTimeout(()=>{
                sendAPI.sendGoodMorning(list_user_bot[i].messengerPSID, list_user_bot[i].fullName);
            }, i * 2000);
        }
        // _bot.callSendAPIFB(4681411058600771, message);
    });

    let s_2 = schedule.scheduleJob(rule_2, async function(fireDate){

        const currentDate = moment(new Date()).format("YYYY-MM-DD");
        const startCurrentDate = new Date(`${currentDate} 00:01:00`).getTime() / 1000;
        const endCurrentDate =  new Date(`${currentDate} 23:59:00`).getTime() / 1000;

        const list_user_bot = await user_model.find({messengerPSID: {$ne : null}}).populate({
            path: 'class',
            populate: {
                path: 'listLesson', match:
                    {expectedTime: {$gte: startCurrentDate, $lte : endCurrentDate}}
            }
        });
        for(let i = 1; i < list_user_bot.length; i++){
            let user = list_user_bot[i];
            let isLearnToDay = user.class && user.class.listLesson ? user.class.listLesson.length : false;
            setTimeout(()=>{
                try {
                    isLearnToDay ? sendAPI.sendLearnToDay(user.messengerPSID, user.fullName) : sendAPI.sendNotLearnToDay(user.messengerPSID, user.fullName);
                }catch (e){
                    _log.err(e);
                }
            }, i * 1000);
        }
    });

};

// '*/5 * * * *', Execute a cron job every 5 Minutes = */5 * * * *
// '42 * * * *' Execute a cron job when the minute is 42 (e.g. 19:42, 20:42, etc.).
// var date = new Date(2020, 11, 26, 14, 56, 20); // time target on your timezone

// rule.dayOfWeek = [0, new schedule.Range(4, 6)];
// rule.hour = 15;
// rule.minute = 1;
// rule.second = 45;
// cac ngay trong tuan tu thu 5 -> CN luc 15h1p45s

module.exports = {
    run_schedule: run_schedule,
};