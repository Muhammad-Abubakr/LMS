var express = require("express");
var router = express.Router();
const student = require("../models/Student");
const course = require("../models/Course");

// Signup (Ismail)
const signup = async (req, resp) => {
  const newuser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newuser.save();
    resp.json(user);
  } catch (err) {
    resp.status(500).json(err);
  }
};

// Login (Hammad)
const login = async (req, resp) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      resp.status(401).send("Wrong password or username");
    } else {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      console.log(originalPassword);
      if (originalPassword !== req.body.password) {
        resp.status(401).send("Wrong password or username");
      } else {
        console.log(user);
        const accessToken = jwt.sign(
          { id: user._id, role: user.role },
          process.env.SECRET_KEY,
          { expiresIn: "1d" } //logout
        );
        const { password, ...otherDetails } = user._doc;
        resp.status(200).send({ ...otherDetails, accessToken });
      }
    }
  } catch (err) {
    resp.status(500).json(err);
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

module.exports = { studentprofile, getassignment, getmaterials, login, signup };
