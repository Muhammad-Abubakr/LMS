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
router.get('/assign/:classid', teacherController.getAllAssignments)

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
// @route   GET /quiz/:classid/:qid
// @submitted by Aqib
router.get('/quiz/:classid/:qid', teacherController.viewQuiz)

// @desc    view all quiz
// @route   GET /quiz/:classid
// @submitted by Sabih
router.get('/quiz/:classid', teacherController.viewAllQuiz)

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
// @route   GET /materials/:courseid
// @submitted by Faheem Sadiqui
router.get("/materials/:courseid", teacherController.viewMaterial);

// @desc    add course material
// @route   POST /addmaterial/:courseid
// @submitted by Fahad Ishaq
router.post('/addmaterial/:courseid', teacherController.addMaterial)

// @desc    update course material
// @route   PUT /updatematerial/:courseid/:materialid
// @submitted by Malaika Zafar
router.put("/updatematerial/:courseId/:materialId", teacherController.updateCourseMaterial);

// @desc    delete course material
// @route   DELETE /deletematerial/:courseid/:materialid
// @submitted by Maira Anjum
router.delete("/deletematerial/:courseid/:materialid", teacherController.deleteMaterial);


// @desc    View Marks of quizzes
// @route   GET /quizmarks/:qid
// @submitted by Vania
router.get('/quizmarks/:qid', teacherController.viewQuizMarks);

// @desc    add quiz marks
// @route   PUT /addquizmarks/:qid/:sid
// @submitted by Azan
router.put("/addquizmarks/:qid/:sid", teacherController.addQuizMarks);

// @desc    update quiz marks
// @route   PUT /updatequizmarks/:qid/:sid
// @submitted by Harris
router.put('/updatequizmarks/:qid/:sid', teacherController.updateQuizMarks);

// @desc    delete quiz marks
// @route   DELETE /deletequizmarks/:qid/:sid
// @submitted by Abdul Hameed
router.delete('/deletequizmarks/:qid/:sid', teacherController.deleteQuizMarks);


// @desc    View Marks of assignments
// @route   GET /assignmarks/:aid
// @submitted by Vania
router.get('/assignmarks/:aid', teacherController.viewAssignMarks);

// @desc    add assignment marks
// @route   PUT /addassignmarks/:aid/:sid
// @submitted by M Ahmad
router.put('/addassignmarks/:aid/:sid', teacherController.addAssignmentMarks);

// @desc    update assignment marks
// @route   PUT /updateassignmarks/:aid/:sid
// @submitted by Tayyab Akbar
router.put("/updateassignmarks/:aid/:sid", teacherController.updateAssignmentMarks)

// @desc    delete assignment marks
// @route   DELETE /deleteassignmarks/:aid/:sid
// @submitted by Abdul Wasiue
router.delete("/deleteassignmarks/:aid/:sid",teacherController.deleteAssignmentMarks);


// @desc    View Marks of mids
// @route   GET /midmarks/:courseid
// @submitted by Hunia
router.get('/midmarks/:courseid', teacherController.viewMidMarks)

// @desc    add midterm marks
// @route   PUT /addmidmarks/:courseid/:sid
// @submitted by Fatima Tuzzahra
router.put("/addmidmarks/:courseid/:sid", teacherController.addMidtermMarks);

// @desc    update midterm marks
// @route   PUT /updatemidmarks/:courseid/:sid
// @submitted by Eesha Shahid
router.put("/updatemidmarks/:courseid/:sid", teacherController.updateMidtermMarks);

// @desc    delete midterm marks
// @route   DELETE /deletemidmarks/:courseid/:sid
// @submitted by Jotish 
router.delete("/deletemidmarks/:courseid/:sid", teacherController.deleteMidTermMarks);


// @desc    View Marks of finals
// @route   GET /finalmarks/:courseid
// @submitted by Hunia
router.get('/finalmarks/:courseid', teacherController.viewFinalMarks)

// @desc    add final marks
// @route   PUT /addfinalmarks/:courseid/:sid
// @submitted by Idrees
router.put("/addfinalmarks/:courseid/:sid", teacherController.addFinalMarks)

// @desc    update final marks
// @route   PUT /updatefinalmarks/:courseid/:sid
// @submitted by Anees

// @desc    delete final marks
// @route   DELETE /deletefinalmarks/:courseid/:sid
// @submitted by Zeerak
router.delete("/deletefinalmarks/:courseid/:sid", teacherController.deleteFinalMarks);


module.exports = router;