const aws = require('aws-sdk');
let s3Storage = null;
try {
    s3Storage = new aws.S3({
        accessKeyId : _config.S3.ACCESS_KEY_ID,
        secretAccessKey : _config.S3.SECRET_ACCESS_KEY,
        region: _config.S3.REGION,
    });
} catch (e) {
    throw  e;
}

module.exports = s3Storage;