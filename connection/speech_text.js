const gTTS = require('gtts');
// Import other required libraries
const fs = require('fs');

class handleSpeechText {
    static async run(text){

        const gtts = new gTTS(text, 'en');

        const result = await new Promise((resolve, reject) => {
            gtts.save(_app_root + '/storage/sound/mysound.mp3', (err, data) => err == null ? resolve(data) : reject(err));
            // _s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
        });
        const fileContent = fs.readFileSync(_app_root + '/storage/sound/mysound.mp3');
        // Setting up S3 upload parameters
        const params = {
            ..._config.S3.UPLOAD,
            Key: 'my_sound.mp3', // File name you want to save as in S3
            Body: fileContent
        };

        // Uploading files to the bucket
        _s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            fs.unlinkSync(_app_root + '/storage/sound/mysound.mp3');
            console.log(`File uploaded successfully. ${data.Location}`);
        });
        // const ient = new textToSpeech.TextToSpeechClient();
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
