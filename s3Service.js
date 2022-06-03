const aws = require("aws-sdk");
const multer = require("multer");
//const multerS3 = require("multer-s3");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION
});

//This implementation uses only Multer.
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("Wrong file type !"), false);
  }
};
//We dont define filename when upload to Multer server, we
//will define when upload to S3
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1000000000, files: 3 }, //only upload file < 1000 Mb and upload 3 files at a time
});

module.exports = {
  s3,
  upload,
};




 