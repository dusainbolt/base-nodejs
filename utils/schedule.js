const schedule = require('node-schedule');
const user_model = require('../models/user');
const sendAPI = require('../messenger-api/send');
const moment = require('moment');


const run_schedule = () => {
    // const ruleTest = "*/5 * * * * *";
    // const test = user.messengerPSID === "4681411058600771";

    // job good morning
    const ruleGoodMorning = new schedule.RecurrenceRule();
    ruleGoodMorning.dayOfWeek = [0, new schedule.Range(0, 6)];
    ruleGoodMorning.hour = 6;
    ruleGoodMorning.minute = 10;
    ruleGoodMorning.second = 15;
    handleJobGoodMorning(ruleGoodMorning);

    const ruleLessonEachDay = new schedule.RecurrenceRule();
    ruleLessonEachDay.dayOfWeek = [0, new schedule.Range(0, 6)];
    ruleLessonEachDay.hour = 12;
    ruleLessonEachDay.minute = 10;
    ruleLessonEachDay.second = 15;
    handleJobLesson(ruleLessonEachDay);

    const ruleGoodNightEachDay = new schedule.RecurrenceRule();
    ruleGoodNightEachDay.dayOfWeek = [0, new schedule.Range(0, 6)];
    ruleGoodNightEachDay.hour = 23;
    ruleGoodNightEachDay.minute = 30;
    ruleGoodNightEachDay.second = 15;
    handleJobGoodNight(ruleGoodNightEachDay);

};

const handleJobGoodNight = (rule) => {
    schedule.scheduleJob(rule, async function (fireDate) {
        const list_user_bot = await user_model.find({messengerPSID: {$ne: null}});
        for (let i = 1; i < list_user_bot.length; i++) {
            let user = list_user_bot[i];
            sendAPI.sendGoodNight(user.messengerPSID, user.fullName);
        }
    });
};

const handleJobLesson = (rule) => {
    schedule.scheduleJob(rule, async function (fireDate) {

        const currentDate = moment(new Date()).format("YYYY-MM-DD");
        const startCurrentDate = new Date(`${currentDate} 00:01:00`).getTime() / 1000;
        const endCurrentDate = new Date(`${currentDate} 23:59:00`).getTime() / 1000;

        const list_user_bot = await user_model.find({messengerPSID: {$ne: null}}).populate({
            path: 'class',
            populate: {
                path: 'listLesson', match:
                    {expectedTime: {$gte: startCurrentDate, $lte: endCurrentDate}}
            }
        });
        let lesson = null;
        let expectedTimeLesson = null;
        let subjectLesson = null;
        for (let i = 1; i < list_user_bot.length; i++) {
            let user = list_user_bot[i];
            let isLearnToDay = user.class && user.class.listLesson ? user.class.listLesson.length : false;
            if (isLearnToDay) {
                lesson = user.class.listLesson[0];
                expectedTimeLesson = moment.unix(lesson.expectedTime).format("HH:mm:ss");
                subjectLesson = lesson.title;
                sendAPI.sendLearnToDay(user.messengerPSID, user.fullName, subjectLesson, expectedTimeLesson)
            } else {
                sendAPI.sendNotLearnToDay(user.messengerPSID, user.fullName);
            }

        }
    });
};

const handleJobGoodMorning = (rule) => {
    schedule.scheduleJob(rule, async function (fireDate) {
        const list_user_bot = await user_model.find({messengerPSID: {$ne: null}});
        for (let i = 1; i < list_user_bot.length; i++) {
            let user = list_user_bot[i];
            sendAPI.sendGoodMorning(user.messengerPSID, user.fullName);
        }
    });
};

module.exports = {
    run_schedule: run_schedule,
};

// '*/5 * * * *', Execute a cron job every 5 Minutes = */5 * * * *
// '42 * * * *' Execute a cron job when the minute is 42 (e.g. 19:42, 20:42, etc.).
// var date = new Date(2020, 11, 26, 14, 56, 20); // time target on your timezone

// rule.dayOfWeek = [0, new schedule.Range(4, 6)];
// rule.hour = 15;
// rule.minute = 1;
// rule.second = 45;
// cac ngay trong tuan tu thu 5 -> CN luc 15h1p45s