const { s3 } = require("../s3Service");

function deleteObject(key) {
  return s3.deleteObjects(
    {
      Bucket: process.env.S3_BUCKET,
      Delete: {
        Objects: [
          {
            Key: key
          }
        ]
      }
    }
  ).promise();
}

module.exports = deleteObject;
