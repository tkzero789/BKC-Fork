const express = require("express");
const blogRoutes = express.Router();
const dbo = require("../db/conn");
const multer = require("multer");
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const stream = require("stream");
require("dotenv").config({ path: "../.config.env" });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function fileFilter(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
}

const s3Storage = multer.memoryStorage();
const upload = multer({
  storage: s3Storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // limit size
  fileFilter: fileFilter,
});

// Fetch all blogs from database
blogRoutes.route("/blog").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("blogs").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Add a blog into database (blogs collection)
blogRoutes.route("/blog/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myobj = {
      id: req.body.id,
      title: req.body.title,
      intro: req.body.intro,
      image: req.body.image,
      content: req.body.content,
      author: req.body.author,
      doctorID: req.body.doctorID,
      createdAt: req.body.createdAt,
      status: req.body.status,
    };
    const result = await db_connect.collection("blogs").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Upload image to blog
blogRoutes
  .route("/blog/upload")
  .post(upload.single("image"), async function (req, res) {
    try {
      const uploadedImage = req.file;
      if (!uploadedImage) {
        throw new Error("No image uploaded");
      }

      const uploadParams = {
        Bucket: "mybkcarebucket",
        Key: Date.now().toString() + "-" + uploadedImage.originalname,
        Body: stream.Readable.from(uploadedImage.buffer),
        ACL: "public-read",
      };

      const uploader = new Upload({
        client: s3,
        params: uploadParams,
      });

      await uploader.done();

      res.json({
        link: `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`, // this is the S3 URL of the uploaded image
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

// View specific blog
blogRoutes.route("/blog/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    console.log(req.params.id);
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("blogs").findOne(myquery);
    console.log(result);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Update status
blogRoutes.route("/blog/update/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const newvalues = {
      $set: {
        status: req.body.status,
      },
    };
    const result = await db_connect
      .collection("blogs")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Edit blog
blogRoutes.route("/blog/edit/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const newvalues = {
      $set: {
        title: req.body.title,
        intro: req.body.intro,
        image: req.body.image,
        content: req.body.content,
        createdAt: req.body.createdAt,
        status: req.body.status,
      },
    };
    const result = await db_connect
      .collection("blogs")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// Delete blog
blogRoutes.route("/blog/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("blogs").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

module.exports = blogRoutes;
