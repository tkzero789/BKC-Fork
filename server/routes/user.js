const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoutes = express.Router();
const dbo = require("../db/conn");
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

userRoutes.route("/user").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("users").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/user/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("users").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/user/doctor-ids").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("users").find({}).toArray();
    const doctorIds = result
      .map((user) => user.userInfos.doctorID)
      .filter((doctorID) => doctorID !== null && doctorID !== "ADMIN");
    res.json(doctorIds);
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/user/medspec-doctor-ids").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("users")
      .find({ "userInfos.medSpecialty": req.body.medSpecialty })
      .toArray();
    const doctorIds = result.map((user) => user.userInfos.doctorID);
    res.json(doctorIds);
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/user/medspec-hdoctor-id").post(async function (req, res) {
  try {
    console.log(req.body.medSpecialty);
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect.collection("users").findOne({
      "userInfos.medSpecialty": req.body.medSpecialty,
      role: "head-doctor",
    });
    console.log(result);
    if (result) {
      const id = result.userInfos.doctorID;
      res.json(id);
    } else return res.status(404).json({ message: "ID not found" });
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/user/update/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const newvalues = {
      $set: {
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        userInfos: req.body.userInfos,
      },
    };
    const result = await db_connect
      .collection("users")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/user/update-status/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const newvalues = {
      $set: {
        status: req.body.status,
      },
    };
    const result = await db_connect
      .collection("users")
      .updateOne(myquery, newvalues);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/signup").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: req.body.id,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      role: req.body.role,
      userInfos: req.body.userInfos,
      status: req.body.status,
    };
    const result = await db_connect.collection("users").insertOne(newUser);
    res.status(201).json(result);
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/signin").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const { email, phoneNumber, password } = req.body;
    const result = await db_connect.collection("users").findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(password, result.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.user = result;
    const token = jwt.sign(
      { userId: result.id, role: result.role, userInfos: result.userInfos },
      SECRET_JWT_KEY,
      {
        expiresIn: "6h",
      }
    );
    res.status(200).json({ token });
  } catch (err) {
    throw err;
  }
});

userRoutes.route("/signout").post(async function (req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.session.user = null;
    const shortLivedToken = jwt.sign(
      { userId: "invalidated" },
      SECRET_JWT_KEY,
      {
        expiresIn: "1 second",
      }
    );
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = userRoutes;
