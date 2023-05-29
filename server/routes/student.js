var express = require("express");
router = express.Router();
var studentController = require("../controllers/studentController");

router.get("/", (req, res, next) => {
  res.send("Hello, Student");
});

// Authentication - Login (Hammad)
router.get("/login", studentController.login);

// Authentication - Signup (Ismail)
router.post("/login", studentController.signIn);

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

// Show Dashboard "Adil's Route"
router.get("/student-dashboard/:sid", studentController.showDashboard);

// Show Grades "Adil's Route"
router.get(
  "/student-dashboard/:courseid/enrolled-course/grades",
  studentController.viewGrades
);

//Bilal Gondal
router.get("/student/:id/result", studentController.studentResult);

module.exports = router;
