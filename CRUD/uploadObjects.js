const { s3 } = require("../s3Service");

async function uploadObjects(files) {
  //Upload multiple files, Multer use method: upload.array('files')
  const params = files.map((file) => {
    return {
      Bucket: process.env.S3_BUCKET,
      Key: Date.now() + "-" + file.originalname,
      Body: file.buffer, //after upload with Multer, we already have buffer property
                         //along with fieldname, originalname, encoding, mimetype, & size
    };
  });

  return await Promise.all(
    params.map((param) => {
      return s3
        .upload(param, (err, data) => {
          if (err) console.log(err, err.stack);
          console.log(data);
        })
        .promise();
    })
  );

  /*   //Upload 1 file, Multer use method: upload.single('file')
    const uploadParam = {
      Bucket: process.env.S3_BUCKET,
      Key: Date.now() + "-" + file.originalname,
      Body: file.buffer,
    };
    return await s3
      .upload(uploadParam, (err, data) => {
        if (err) console.log(err, err.stack);
        console.log(data);
      })
      .promise(); */
}

/* Reponse data as below:
[
  {
    ETag: '"5c350a1c9da7dcba6c2ef5c16bf0e46f"',
    Location: 'https://toanhuynh2910-where-to-store-uploaded-files.s3.ca-central-1.amazonaws.com/1654202479483-4.jpg',
    key: '1654202479483-4.jpg',
    Key: '1654202479483-4.jpg',
    Bucket: 'toanhuynh2910-where-to-store-uploaded-files'
  },
  {
    ETag: '"ce0a3792a077d0a5cdad4ec9814c0f86"',
    Location: 'https://toanhuynh2910-where-to-store-uploaded-files.s3.ca-central-1.amazonaws.com/1654202479485-5.jpg',
    key: '1654202479485-5.jpg',
    Key: '1654202479485-5.jpg',
    Bucket: 'toanhuynh2910-where-to-store-uploaded-files'
  },
  {
    ETag: '"776561a77494911ba703184bd464d754"',
    Location: 'https://toanhuynh2910-where-to-store-uploaded-files.s3.ca-central-1.amazonaws.com/1654202479485-6.jpg',
    key: '1654202479485-6.jpg',
    Key: '1654202479485-6.jpg',
    Bucket: 'toanhuynh2910-where-to-store-uploaded-files'
  }
] */

module.exports = uploadObjects;
