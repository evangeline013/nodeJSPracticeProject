const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const { accessKeyId, secretAccessKey } = require('../config/keys');

const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
});

module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {
        const key = `${req.user.id}/${uuid()}.jpeg`;

        s3.getSignedUrl(
            'putObject',
            {
                Bucket: 'blog-dev-000',
                ContentType: 'image/jpeg',
                Key: key,
            },
            (err, url) => res.send({ key, url }),
        );
    });
};