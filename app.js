const express = require("express");
const { s3, upload } = require("./s3Service");
const listObjects = require("./CRUD/listObjects");
const getObjectById = require("./CRUD/getObjectById");
const uploadObjects = require("./CRUD/uploadObjects");
const putObject = require("./CRUD/putObject");
const deleteObject = require("./CRUD/deleteObject");
const getSignedUrl = require("./CRUD/getSignedUrl");

require("dotenv").config();
const morgan = require("morgan");
const fs = require("fs");

const port = process.env.PORT;
const host = process.env.HOST;

const app = express();
app.use(express.json());
app.use(morgan("dev")); //use morgan to log HTTP request in console
//app.use("/static", express.static("./static/"));

app.post("/upload", upload.array("files"), async (req, res) => {
  const result = await uploadObjects(req.files);
  if (req.files.length == 1) {
    res.status(200).json({
      message: "File is updated to AWS S3 successfully.",
      url: result[0].Location,
    });
  } else {
    res.status(200).json({
      message: `${req.files.length} files are updated to AWS S3 successfully.`,
      url: result.map((result) => {
        return result.Location;
      }),
    });
  }
});

app.post("/upload_single", upload.single("file"), async (req, res) => {
  const result = await putObject(req.file);
  res.status(200).json({
    message: "File is updated to AWS S3 successfully.",
    data: result,
  });
});

app.get("/images", async (req, res) => {
  const result = await listObjects();
  const newResult = result.Contents.map((content) => content.Key);
  res.send({
    message: "List of all objects in bucket shown below:",
    data: newResult,
  });
});

app.get("/images/:id", async (req, res) => {
  const fileKey = req.params.id;
  const stream = await getObjectById(fileKey);
  //stream.pipe(res);
  const writeSteam = fs.createWriteStream("aPhoto.jpg");
  writeSteam.write(stream);
});

app.get("/getSignedUrl", (req, res) => {
  const url = getSignedUrl();
  res.status(200).json({
    message: "Signed URL is generated successfully !",
    url: url,
  });
});

app.delete("/delete/:id", async (req, res) => {
  const key = req.params.id;
  const result = await deleteObject(key);
  res.send(result);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, host, () => {
  console.log(`This server is listening on ${host}:${port} for connections...`);
});

//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
