var express = require("express");
router = express.Router();
const teacherController = require("../controllers/teacherController");

router.get("/", (req, res, next) => {
    res.send("Hello, Teacher.")
})

// @desc    view specific assignment
// @route   GET /assign/:classid/:aid
// @submitted by Alisha Asghar
router.get("/assign/:classid/:aid", teacherController.getAssignment);

// @desc    view all assignments
// @route   GET /assign/:classid
// @submitted by Fahad Ali

// @desc    add assignment
// @route   POST /addassign/:classid
// @submitted by Kainat Mudassir
router.post("/addassign/:classId", teacherController.addAssignment);

// @desc    update assignment
// @route   PUT /updateassign/:classid/:aid
// @submitted by Maham
router.put("/updateassign/:classId/:aId", teacherController.updateAssignment);

// @desc    delete assignment
// @route   DELETE /deleteassign/:classId/:aId
// @submitted by Minahil Fatima
router.delete("/deleteassign/:classId/:aId", teacherController.deleteAssignment);

// @desc    view specific quiz
// @route   GET /quiz/:classid/:aid
// @submitted by Akib

// @desc    view all quiz
// @route   GET /quiz/:classid
// @submitted by Sabih

// @desc    add quiz
// @route   POST /addquiz/:classid
// @submitted by Mahnoor Tahir
router.post("/addquiz/:classId", teacherController.addQuiz);

// @desc    update quiz
// @route   PUT /updatequiz/:classid/:qid
// @submitted by Maha Farooqi
router.put("/updatequiz/:classId/:qId", teacherController.updateQuiz);

// @desc    delete quiz
// @route   DELETE /deletequiz/:classid/:qid
// @submitted by Aimen Shahid
router.delete("/deletequiz/:classId/:qId", teacherController.deleteQuiz);

// @desc    view course material
// @route   GET /quiz/:classid
// @submitted by Faheem Sadiqui

// @desc    add course material
// @route   POST /addquiz/:classid
// @submitted by Fahad Ishaq


// @desc    update course material
// @route   PUT /updatequiz/:classid/:qid
// @submitted by Malaika Zafar


// @desc    delete course material
// @route   DELETE /deletequiz/:classid/:qid
// @submitted by Maira Anjum

// @desc    add quiz marks
// @route   PUT /addquizmarks/:qid/:sid
// @submitted by Azan
router.put("/addquizmarks/:qid/:sid", teacherController.addQuizMarks);

// @desc    update quiz marks
// @route   PUT /updatequizmarks/:qid/:sid
// @submitted by Harris


// @desc    delete quiz marks
// @route   DELETE /deletequizmarks/:qid/:sid
// @submitted by Abdul Hameed
router.delete('/deletequizmarks/:qid/:sid', teacherController.deleteQuizMarks);


// @desc    update final marks
// @route   PUT /updatefinalmarks/:courseid/:sid
// @submitted by Muhammad Anees
router.put("/updatefinalmarks/:courseid/:sid", teacherController.updateFinalMarks);

module.exports = router;