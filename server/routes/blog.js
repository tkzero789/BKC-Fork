const express = require("express");
const blogRoutes = express.Router();
const dbo = require("../db/conn");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// set up multer to upload image
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
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
      res.json({
        link: `https://symptom-checker-with-mern-stack.onrender.com/uploads/${uploadedImage.filename}`,
      });
    } catch (err) {
      throw err;
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
