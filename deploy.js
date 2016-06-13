const s3 = require('s3')
const credentials = require('./credentials.json')

const client = s3.createClient({
  s3Options: {
    accessKeyId: credentials.aws.accessKeyId,
    secretAccessKey: credentials.aws.secretAccessKey,
    region: 'us-west-2'
  }
})

const params = {
  localDir: './www',
  deleteRemoved: true,
  s3Params: {
    Bucket: credentials.aws.bucket,
    Prefix: ''
  }
}

const uploader = client.uploadDir(params)

uploader.on('error', function (err) {
  console.error('unable to sync:', err.stack)
})

uploader.on('progress', function () {
  console.log('progress', uploader.progressAmount, uploader.progressTotal)
})

uploader.on('end', function () {
  console.log('done uploading')
})
