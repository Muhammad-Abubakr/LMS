const express = require("express");
const router = express.Router();

const {
  getClasses, dashboard, getSingleClass, getStudents,
  getSingleStudent, getTeachers, getSingleTeacher, addTeacher,
  addClass, addStudent, addStudentInClass, addTeacherInClass,
  deleteTeacher, deleteStudent, deleteClass
} = require("../controllers/adminController");

// GET Methods
router.get("/", dashboard);
 
router.get("/classes", getClasses);

router.get("/classes/:cid", getSingleClass);

router.get("/students", getStudents);

router.get("/students/:sid", getSingleStudent);

router.get("/teachers", getTeachers);

router.get("/teachers/:tid", getSingleTeacher);

// POST Methods
router.post("/addteacher", addTeacher);

router.post("/addclass", addClass);

router.post("/addstudent", addStudent);

// PUT Methods
router.put("/assignstudent/:cid/:sid", addStudentInClass);

router.put("/assignteacher/:cid/:tid", addTeacherInClass);

// DELETE Methods
router.delete("/deleteteacher/:tid", deleteTeacher);

router.delete("/deletestudent/:sid", deleteStudent);

router.delete("/deleteclass/:cid", deleteClass);

module.exports = router;