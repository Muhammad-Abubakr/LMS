var express = require("express");
router = express.Router();
const assignmentController = require("../controllers/teacherController");

router.get("/", (req, res, next) => {
    res.send("Hello, Teacher.")
})

// @desc    view specific assignment
// @route   GET /assign/:classid/:aid
// @submitted by Alisha Asghar
router.get("/assign/:classid/:aid", assignmentController.getAssignment);

// @desc    view all assignments
// @route   GET /assign/:classid
// @submitted by Fahad Ali

// @desc    add assignment
// @route   POST /addassign/:classid
// @submitted by Kainat Mudassir
router.post("/addassign/:classId", assignmentController.addAssignment);

// @desc    update assignment
// @route   PUT /updateassign/:classid/:aid
// @submitted by Maham
router.put("/updateassign/:classId/:aId", assignmentController.updateAssignment);

// @desc    delete assignment
// @route   DELETE /deleteassign/:classId/:aId
// @submitted by Minahil Fatima
router.delete("/deleteassign/:classId/:aId", assignmentController.deleteAssignment);

// @desc    view specific quiz
// @route   GET /quiz/:classid/:aid
// @submitted by Akib

// @desc    view all quiz
// @route   GET /quiz/:classid
// @submitted by Sabih

// @desc    add quiz
// @route   POST /addquiz/:classid
// @submitted by Mahnoor Tahir
router.post("/addquiz/:classId", assignmentController.addQuiz);

// @desc    update quiz
// @route   PUT /updatequiz/:classid/:qid
// @submitted by Maha Farooqi
router.put("/updatequiz/:classId/:qId", assignmentController.updateQuiz);

// @desc    delete quiz
// @route   DELETE /deletequiz/:classid/:qid
// @submitted by Aimen Shahid
router.delete("/deletequiz/:classId/:qId", assignmentController.deleteQuiz);

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
router.put("/addquizmarks/:qid/:sid", assignmentController.addQuizMarks);

// @desc    update quiz marks
// @route   PUT /updatequizmarks/:qid/:sid
// @submitted by Harris
// router.put('/updatequizmarks/:qid/:sid', assignmentController.updateQuizMarks);

// @desc    delete quiz marks
// @route   DELETE /deletequizmarks/:qid/:sid
// @submitted by Abdul Hameed
// router.delete('/deletequizmarks/:qid/:sid', assignmentController.deleteQuizMarks);

// @desc    add assignment marks
// @route   PUT /addassignmarks/:aid/:sid
// @submitted by M Ahmad
router.put('/addassignmarks/:aid/:sid', assignmentController.addAssignmentMarks);

// @desc    update assignment marks
// @route   PUT /updateassignmarks/:aid/:sid
// @submitted by Tayyab Akbar
// router.put("/updateAssignment/:aId/:sid", assignmentController.updateAssignment)


// @desc    delete assignment marks
// @route   DELETE /deleteassignmarks/:aid/:sid
// @submitted by Abdul Wasiue

// @desc    add midterm marks
// @route   PUT /addmidmarks/:courseid/:sid
// @submitted by Fatima Tuzzahra
router.put("/addmidmarks/:courseid/:sid", assignmentController.addMidtermMarks);

// @desc    update midterm marks
// @route   PUT /updatemidmarks/:courseid/:sid
// @submitted by Eesha Shahid
router.put("/updatemidmarks/:courseid/:sid", assignmentController.updateMidtermMarks);

// @desc    delete midterm marks
// @route   DELETE /deletemidmarks/:courseid/:sid
// @submitted by Jotish 


// @desc    add final marks
// @route   PUT /addfinalmarks/:courseid/:sid
// @submitted by Idrees
router.put("/addfinalmarks/:courseid/:sid", assignmentController.addFinalMarks)

// @desc    update final marks
// @route   PUT /updatefinalmarks/:courseid/:sid
// @submitted by Anees

// @desc    delete final marks
// @route   DELETE /deletefinalmarks/:courseid/:sid
// @submitted by Zeerak


module.exports = router;