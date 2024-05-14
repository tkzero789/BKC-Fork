const express = require("express");
const symptomRoutes = express.Router();
const jwt = require("jsonwebtoken");
const dbo = require("../db/conn");

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

// Middleware to check for admin role
const isAdmin = (req, res, next) => {
  if (req.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden (Head-doctor or Admin access required)" });
  }
};

// Middleware to check for head-doctor or admin role
const isHDrOrAdmin = (req, res, next) => {
  if (req.role === "admin" || req.role === "head-doctor") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden (Head-doctor or Admin access required)" });
  }
};

// ------------------------------- Symptom ------------------------------------

// get all symptoms
symptomRoutes.route("/symptom").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("symptoms").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get symptom by id
symptomRoutes.route("/symptom/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("symptoms").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// get symptom by name (check duplicate)
symptomRoutes.route("/symptom/:name").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { name: req.params.name };
    const result = await db_connect.collection("symptoms").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// add new symptom
symptomRoutes
  .route("/symptom/add")
  .post(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const dupCheck = await db_connect
        .collection("symptoms")
        .findOne({ name: req.body.name });
      if (dupCheck) {
        return res.json({ message: "Symptom already exists" });
      } else {
        const myobj = {
          id: req.body.id,
          name: req.body.name,
          position: req.body.position,
          categories: req.body.categories,
          createInfos: req.body.createInfos,
          status: req.body.status,
        };
        const result = await db_connect.collection("symptoms").insertOne(myobj);
        res.json({ result, myobj });
      }
    } catch (err) {
      throw err;
    }
  });

// update symptom by id
symptomRoutes
  .route("/symptom/update/:id")
  .post(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          name: req.body.name,
          position: req.body.position,
          categories: req.body.categories,
          createInfos: req.body.createInfos,
          status: req.body.status,
        },
      };
      const result = await db_connect
        .collection("symptoms")
        .updateOne(myquery, newvalues);
      res.json({ result, newvalues });
    } catch (err) {
      throw err;
    }
  });

// update symptom categories by id from disease
symptomRoutes
  .route("/symptom/update-from-disease/:id")
  .post(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const searchRes = await db_connect
        .collection("symptoms")
        .findOne(myquery);
      const _categories = searchRes.categories;
      const existCatIds = _categories.map((cat) => cat.id);
      const reqCategories = req.body.categories;
      for (const reqCat of reqCategories) {
        if (!existCatIds.includes(reqCat.id)) {
          _categories.push(reqCat);
        } else {
          const catIndex = existCatIds.findIndex(
            (catId) => catId === reqCat.id
          );
          const existDesIds = _categories[catIndex].descriptions.map(
            (des) => des.id
          );
          for (const reqDes of reqCat.descriptions) {
            if (!existDesIds.includes(reqDes.id)) {
              _categories[catIndex].descriptions.push(reqDes);
            }
          }
        }
      }
      const newvalues = {
        $set: {
          categories: _categories,
        },
      };
      const result = await db_connect
        .collection("symptoms")
        .updateOne(myquery, newvalues);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// delete symptom by id
symptomRoutes
  .route("/symptom/:id")
  .delete(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect.collection("symptoms").deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// ------------------------------- Symptom-temp -------------------------------

// get all symptoms in temp
symptomRoutes
  .route("/symptom-temp")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const result = await db_connect
        .collection("symptoms-temp")
        .find({})
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

//get symptom by idTemp in temp
symptomRoutes
  .route("/symptom-temp/:idTemp")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { idTemp: req.params.idTemp };
      const result = await db_connect
        .collection("symptoms-temp")
        .findOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get symptom by many ids in temp
symptomRoutes
  .route("/symptom-temp/by-ids")
  .post(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const result = await db_connect
        .collection("symptoms-temp")
        .find({ id: { $in: req.body.ids }, diseaseId: req.body.diseaseId })
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// add new symptom to temp
symptomRoutes
  .route("/symptom-temp/add")
  .post(verifyJWT, isHeadDoctor, async function (req, res) {
    try {
      const reqSymptom = req.body;
      const db_connect = await dbo.getDb("mern_hospital");
      const dupCheck = await db_connect
        .collection("symptoms-temp")
        .findOne({ name: reqSymptom.name });
      if (dupCheck && reqSymptom.status === "Pending Create") {
        return res.json({ message: "Symptom already exists" });
      }
      if (dupCheck && dupCheck.doctorReqID === reqSymptom.doctorReqID) {
        return res.json({ message: "Symptom already exists" });
      }
      const myobj = {
        id: reqSymptom.id,
        idTemp: reqSymptom.idTemp,
        name: reqSymptom.name,
        position: reqSymptom.position,
        categories: reqSymptom.categories,
        createInfos: reqSymptom.createInfos,
        status: reqSymptom.status,
        doctorReqID: reqSymptom.doctorReqID,
      };
      const result = await db_connect
        .collection("symptoms-temp")
        .insertOne(myobj);
      res.json({ result, myobj });
    } catch (err) {
      throw err;
    }
  });

// delete symptom by id in temp
symptomRoutes
  .route("/symptom-temp/:idTemp")
  .delete(verifyJWT, isHDrOrAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = {
        idTemp: req.params.idTemp,
        diseaseId: req.params.diseaseId,
      };
      const result = await db_connect
        .collection("symptoms-temp")
        .deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

module.exports = symptomRoutes;
