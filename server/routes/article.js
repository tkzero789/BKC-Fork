const express = require("express");
const articleRoutes = express.Router();
const jwt = require("jsonwebtoken");
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

// ------------------------------- Check access -------------------------------

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid token" });
  }
  req.role = decoded.role;
  next();
};

// Middleware to check for staff role
const isStaff = (req, res, next) => {
  if (!req.role || req.role === "") {
    return res
      .status(403)
      .json({ message: "Forbidden (Staff access required)" });
  }
  next();
};

// Middleware to check for head-doctor role
const isHeadDoctor = (req, res, next) => {
  if (req.role === "head-doctor") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden (Head-doctor or Admin access required)" });
  }
};

// Middleware to check for doctor head-doctor
const isDrOrHDr = (req, res, next) => {
  if (req.role === "doctor" || req.role === "head-doctor") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden (Doctor or Head-doctor access required)" });
  }
};

// ------------------------------- Article ------------------------------------

// get all articles
articleRoutes.route("/article").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("articles").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get article by id
articleRoutes.route("/article/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("articles").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get article by title
articleRoutes.route("/article/:title").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { title: req.params.title };
    const result = await db_connect.collection("articles").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get articles by diseaseId
articleRoutes
  .route("/article/by-disease/:diseaseId")
  .get(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const result = await db_connect
        .collection("articles")
        .find({ diseaseId: req.params.diseaseId })
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get articles by many ids (articles by disease)
articleRoutes.route("/article/by-ids").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("articles")
      .find({ id: { $in: req.body.ids } })
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get article by title (check duplicate)
articleRoutes.route("/article/:title").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { title: req.params.title };
    const result = await db_connect.collection("articles").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// set default display article
articleRoutes
  .route("/article/:articleId/set-isdisplay")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const displayArticle = await db_connect
        .collection("articles")
        .findOne({ diseaseId: req.body.diseaseId, isDisplay: true });
      if (displayArticle) {
        await db_connect.collection("articles").updateOne(
          { id: displayArticle.id },
          {
            $set: {
              isDisplay: false,
            },
          }
        );
      }
      const result = await db_connect.collection("articles").updateOne(
        { id: req.params.articleId },
        {
          $set: {
            isDisplay: true,
          },
        }
      );
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// save image and get the link
articleRoutes
  .route("/article/upload")
  .post(upload.single("image"), async function (req, res) {
    try {
      const uploadedImage = req.file;
      if (!uploadedImage) {
        throw new Error("No image uploaded");
      }
      res.json({
        link: `http://localhost:5000/uploads/${uploadedImage.filename}`,
      });
    } catch (err) {
      throw err;
    }
  });

// add article
articleRoutes
  .route("/article/add")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const { title, diseaseId } = req.body;
      const dupCheck = await db_connect
        .collection("articles")
        .findOne({ title, diseaseId });
      if (dupCheck) {
        return res.json({ message: "Article already exists" });
      }
      const myobj = {
        id: req.body.id,
        title: req.body.title,
        diseaseId: req.body.diseaseId,
        diseaseName: req.body.diseaseName,
        medSpecialty: req.body.medSpecialty,
        infos: req.body.infos,
        treatments: req.body.treatments,
        createInfos: req.body.createInfos,
        isDisplay: req.body.isDisplay,
        status: req.body.status,
      };
      const result = await db_connect.collection("articles").insertOne(myobj);
      res.json({ result, myobj });
    } catch (err) {
      throw err;
    }
  });

// update article by id
articleRoutes
  .route("/article/update/:id")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          title: req.body.title,
          infos: req.body.infos,
          treatments: req.body.treatments,
          createInfos: req.body.createInfos,
          status: req.body.status,
        },
      };
      const result = await db_connect
        .collection("articles")
        .updateOne(myquery, newvalues);
      res.json({ result, newvalues });
    } catch (err) {
      throw err;
    }
  });

// delete article by id
articleRoutes
  .route("/article/:id")
  .delete(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect.collection("articles").deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// ------------------------------- Article temp -------------------------------

// get all articles in temp
articleRoutes
  .route("/article-temp")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const result = await db_connect
        .collection("articles-temp")
        .find({})
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get article by id in temp
articleRoutes
  .route("/article-temp/:idTemp")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { idTemp: req.params.idTemp };
      const result = await db_connect
        .collection("articles-temp")
        .findOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get articles by diseaseId in temp
articleRoutes
  .route("/article-temp/by-disease/:diseaseId")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const result = await db_connect
        .collection("articles-temp")
        .find({ diseaseId: req.params.diseaseId })
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get articles by many ids in temp (articles by disease)
articleRoutes
  .route("/article-temp/by-ids")
  .post(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const result = await db_connect
        .collection("articles-temp")
        .find({ id: { $in: req.body.ids } })
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// add article in temp
articleRoutes
  .route("/article-temp/add")
  .post(verifyJWT, isDrOrHDr, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const { title, diseaseId } = req.body;
      const dupCheck = await db_connect
        .collection("articles-temp")
        .findOne({ title, diseaseId });
      if (dupCheck) {
        return res.json({ message: "Article already exists" });
      }
      const myobj = {
        id: req.body.id,
        idTemp: req.body.idTemp,
        title: req.body.title,
        diseaseId: req.body.diseaseId,
        diseaseName: req.body.diseaseName,
        medSpecialty: req.body.medSpecialty,
        infos: req.body.infos,
        treatments: req.body.treatments,
        createInfos: req.body.createInfos,
        isDisplay: req.body.isDisplay,
        status: req.body.status,
        doctorReqID: req.body.doctorReqID,
      };
      const result = await db_connect
        .collection("articles-temp")
        .insertOne(myobj);
      res.json({ result, myobj });
    } catch (err) {
      throw err;
    }
  });

// delete article by id in temp
articleRoutes
  .route("/article-temp/:idTemp")
  .delete(verifyJWT, isDrOrHDr, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { idTemp: req.params.idTemp };
      const result = await db_connect
        .collection("articles-temp")
        .deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

module.exports = articleRoutes;
