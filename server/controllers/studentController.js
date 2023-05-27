var express = require("express");
var router = express.Router();
const student = require("../models/Student");
const course = require("../models/Course");

const login = (req, res) => {
  const { username, password } = req.query;
  if (username === "admin" && password === "password") {
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid username or password");
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordValid = password === user.password;
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("jwt-token", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });
      if (isPasswordValid) {
        res.json({ message: user });
      } else {
        res.json({ message: "Incorrect password." });
      }
    } else {
      res.json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const studentprofile = (req, res, next) => {
  student
    .find({})
    .populate("user")
    .populate("enrolledCourses", "name  teacher")
    .then(
      (data) => {
        res.json(data);
      },
      (err) => next(err)
    )
    .catch((err) => {
      res.send(err);
    });
};

const getassignment = function (req, res, next) {
  Course.findById(req.params.courseid)
    .then(
      (course) => {
        res.statuscode = 200;
        res.json(course.assignments);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

const getmaterials = function (req, res, next) {
  Course.findById(req.params.courseid)
    .then(
      (course) => {
        res.statuscode = 200;
        res.json(course.courseMaterial);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

module.exports = { studentprofile, getassignment, getmaterials, login, signIn };
