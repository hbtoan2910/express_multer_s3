const { s3 } = require("../s3Service");

function getSignedUrl() {
  var params = {
    Bucket: process.env.S3_BUCKET,
    Key: "1654229517199-2.jpg",
    //Expires: 60,
  };
  return s3.getSignedUrl("getObject", params);
}
module.exports = getSignedUrl;
