const express = require("express");
const appointmentRoutes = express.Router();
const dbo = require("../db/conn");
const { Vonage } = require("@vonage/server-sdk");
const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;

appointmentRoutes.route("/appointment").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const result = await db_connect
      .collection("appointments")
      .find({})
      .toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

appointmentRoutes.route("/appointment/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    console.log(req.params.id);
    const myquery = { id: req.params.id };
    const result = await db_connect.collection("appointments").findOne(myquery);
    console.log(result);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

appointmentRoutes.route("/appointment/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myobj = {
      id: req.body.id,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      need: req.body.need,
      date: req.body.date,
      reason: req.body.reason,
      createdAt: req.body.createdAt,
      status: req.body.status,
    };
    const result = await db_connect.collection("appointments").insertOne(myobj);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

appointmentRoutes
  .route("/appointment/update/:id")
  .post(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      const myquery = { id: req.params.id };
      const newvalues = {
        $set: {
          status: req.body.status,
        },
      };
      const result = await db_connect
        .collection("appointments")
        .updateOne(myquery, newvalues);
      res.json(result);
    } catch (err) {
      throw err;
    }
  });

appointmentRoutes.route("/appointment/:id").delete(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("mern_hospital");
    const myquery = { id: req.params.id };
    const result = await db_connect
      .collection("appointments")
      .deleteOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});

appointmentRoutes
  .route("/appointment/send-otp")
  .post(async function (req, res) {
    try {
      const vonage = new Vonage({
        apiKey: VONAGE_API_KEY,
        apiSecret: VONAGE_API_SECRET,
      });
      const randomNum = Math.floor(Math.random() * 1000000);
      const otp = randomNum.toString().padStart(6, "0");

      const from = "Vonage APIs";
      const to = req.body.phoneNumber;
      const text = otp;
      const response = await vonage.sms
        .send({ to, from, text })
        .catch((err) => {
          throw new Error("There was an error sending the messages.", err);
        });

      if (response) {
        console.log("Message sent successfully");
        console.log(response);
        const db_connect = await dbo.getDb("mern_hospital");
        const myobj = {
          phoneNumber: req.body.phoneNumber,
          otp: otp,
          expiresAt: Date.now() + 5 * 60 * 1000,
        };
        const result = await db_connect.collection("otps").insertOne(myobj);
        res.json({
          message: "OTP sent successfully",
          result: result,
          otp: otp,
        });
      } else {
        throw new Error("There was an error sending the messages.");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error sending OTP" });
    }
  });

appointmentRoutes
  .route("/appointment/verify-otp")
  .post(async function (req, res) {
    try {
      const db_connect = await dbo.getDb("mern_hospital");
      console.log(req.body.phoneNumber, req.body.otp);
      const result = await db_connect.collection("otps").findOne(myquery);
      if (result) {
        const now = Date.now();
        if (now > result.expiresAt) {
          return res.json({ message: "OTP expired" });
        }
        res.json(result);
      } else return res.json({ message: "Incorrect OTP" });
    } catch (err) {
      console.error(err);
    }
  });

module.exports = appointmentRoutes;
