const express = require("express");
const notificationRoutes = express.Router();
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

// get all notifications
notificationRoutes
  .route("/notification")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const result = await db_connect
        .collection("notifications")
        .find({})
        .toArray();
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get all notifications by doctor ID
notificationRoutes
  .route("/notification/:doctorID")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const query = {
        toDoctorID: { $elemMatch: { $eq: req.params.doctorID } },
      };
      const result = await db_connect
        .collection("notifications")
        .find(query)
        .toArray();
      console.log(result);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// get notification by id
notificationRoutes
  .route("/notification/:id")
  .get(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect
        .collection("notifications")
        .findOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// add whole new notification
notificationRoutes
  .route("/notification/add")
  .post(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myobj = {
        id: req.body.id,
        fromInfos: req.body.fromInfos,
        toDoctorID: req.body.toDoctorID,
        content: req.body.content,
        timeSent: req.body.timeSent,
        status: req.body.status,
      };
      const result = await db_connect
        .collection("notifications")
        .insertOne(myobj);
      res.json({ result, myobj });
    } catch (err) {
      throw err;
    }
  });

// update notification status by id
notificationRoutes
  .route("/notification/update-status/:id")
  .post(verifyJWT, isStaff, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          status: req.body.status,
        },
      };
      const result = await db_connect
        .collection("notifications")
        .updateOne(myquery, newvalues);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

// delete notification by id
notificationRoutes
  .route("/notification/:id")
  .delete(verifyJWT, isAdmin, async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const result = await db_connect
        .collection("notifications")
        .deleteOne(myquery);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

module.exports = notificationRoutes;
