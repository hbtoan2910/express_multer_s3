const { s3 } = require("../s3Service");

function putObject(file) {
  return s3
    .putObject(
      {
        Bucket: process.env.S3_BUCKET,
        Key: Date.now() + "-" + file.originalname,
        Body: file.buff, //after upload with Multer, we already have buffer property 
                         //along with fieldname, originalname, encoding, mimetype, & size
      } /* ,
    (err, data) => {
      console.log(data);
    } */
    )
    .promise();
}
/* Reponse data as below, so we better 
   use Upload With Multer for more detailed data
{ ETag: '"d41d8cd98f00b204e9800998ecf8427e"' } */

module.exports = putObject;
