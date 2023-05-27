var express = require("express");
router = express.Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
var studentController = require("../controllers/studentController");

router.get("/", (req, res, next) => {
  res.send("Hello, Student");
});

// Authentication - Signup (Ismail)
router.post("/signup", controller.signup);

// Authentication - Login (Hammad)
router.post("/login", controller.login);

//Moeez Ahmed
router.get("/userprofile", studentController.studentprofile);

//Hassan Sajjad
router.get(
  "/student-dashboard/:courseid/coursematerial",
  studentController.getmaterials
);

//Bilal Shakir
router.get(
  "/student-dashboard/:courseid/getassignment",
  studentController.getassignment
);

module.exports = router;
