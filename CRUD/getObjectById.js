const { s3 } = require("../s3Service");

function getObjectById(id) {
  return (
    s3
      .getObject(
        {
          Bucket: process.env.S3_BUCKET,
          Key: id,
        } /* , (err, data) => {
      if (err) console.log(err, err.stack);
      console.log(data);
    } */
      )
      //.promise();
      .createReadStream()
  );
  //dont use Promise or Callback here cause response data has Body Buffer,
  //so we create a readable steam and pipe to res to render it directly in browser
}

/* Response data as below:
{
  AcceptRanges: 'bytes',
  LastModified: 2022-06-02T04:01:50.000Z,
  ContentLength: 144763,
  ETag: '"a25d8d02b22a27e3dcf01d2d81dbd0d3"',
  ContentType: 'application/octet-stream',
  Metadata: {},
  Body: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff e2 01 d8 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 01 c8 6c 63 6d 73 02 10 00 00 ... 144713 more bytes>
} */

module.exports = getObjectById;
