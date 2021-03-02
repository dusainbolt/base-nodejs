const gTTS = require('gtts');
// Import other required libraries
const fs = require('fs');

class handleSpeechText {
    static async run(text){

        const gtts = new gTTS(text, 'en');

        const result = await new Promise((resolve, reject) => {
            gtts.save(_app_root + '/storage/sound/mysound.mp3', (err, data) => err == null ? resolve("Hello") : reject(err));
            // _s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
        });

        console.log(result);


        // const client = new textToSpeech.TextToSpeechClient();
        // const request = {
        //     input: {text: text},
        //     // Select the language and SSML voice gender (optional)
        //     voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        //     // select the type of audio encoding
        //     audioConfig: {audioEncoding: 'MP3'},
        // };
        //
        // // Performs the text-to-speech request
        // const [response] = await client.synthesizeSpeech(request);
        // // Write the binary audio content to a local file
        // const writeFile = util.promisify(fs.writeFile);
        // await writeFile('output.sound', response.audioContent, 'binary');
        // console.log('Audio content written to file: output.sound');
    }
}

module.exports = handleSpeechText;
