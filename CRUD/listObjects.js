const { s3 } = require("../s3Service");

function listObjects() {
  //use promise to BE ABLE TO save data into a variable
  return s3.listObjectsV2({ Bucket: process.env.S3_BUCKET }).promise();
  /*   return s3.listObjectsV2({ Bucket: process.env.S3_BUCKET }, (err, data) => {
    if (err) console.log(err, err.stack);
    console.log(data);
  }) */
}
/* In both way, response data is SAME as below:
{
  IsTruncated: false,
  Contents: [
    {
      Key: '1654142509771-1.jpg',
      LastModified: 2022-06-02T04:01:50.000Z,
      ETag: '"a25d8d02b22a27e3dcf01d2d81dbd0d3"',     
      ChecksumAlgorithm: [],
      Size: 144763,
      StorageClass: 'STANDARD'
    },
    {
      Key: '1654142509771-2.jpg',
      LastModified: 2022-06-02T04:01:50.000Z,
      ETag: '"baa134d81744cb2d597fe41a6aa981a7"',     
      ChecksumAlgorithm: [],
      Size: 132953,
      StorageClass: 'STANDARD'
    },
    {
      Key: '1654142509771-3.jpg',
      LastModified: 2022-06-02T04:01:50.000Z,
      ETag: '"378a2a72aa960cd6f46dbf9661e06360"',     
      ChecksumAlgorithm: [],
      Size: 150380,
      StorageClass: 'STANDARD'
    }
  ],
  Name: 'toanhuynh2910-where-to-store-uploaded-files',
  Prefix: '',
  MaxKeys: 1000,
  CommonPrefixes: [],
  KeyCount: 3
} */

module.exports = listObjects;
