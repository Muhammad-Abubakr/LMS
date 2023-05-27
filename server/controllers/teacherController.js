const Assignment = require("../models/Assignment");
const Class = require("../models/Class");
const Quiz = require("../models/Quiz");
const Student = require("../models/Student");
const Course = require("../models/Course");

//GET
const getAssignment = (req, res) => {
  const { classid, aid } = req.params;

  // Find the assignment based on classid and aid
  Assignment.findOne({ class: classid, _id: aid })
    .populate("class") // Populate the "class" field with only the "name" property
    .populate("grades.student") // Populate the "grades.student" field with only the "name" property
    .then((assignment) => {
      if (!assignment) {
        res.status(404).json({ error: "Assignment not found" });
      }

      res.json(assignment);
    })
    .catch((err) => {
      console.log("Error retrieving assignment:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

//POST
const addAssignment = (req, res, next) => {
  Assignment.create({ ...req.body, class: req.params.classId })
    .then(
      (assignment) => {
        console.log("Assignment has been added");

        res.statuscode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(assignment);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

const addQuiz = (req, res, next) => {
  Quiz.create({ ...req.body, class: req.params.classId })
    .then(
      (quiz) => {
        console.log("Quiz has been added");

        res.statuscode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(quiz);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

//PUT
const updateAssignment = (req, res, next) => {
  const { classId, aId } = req.params;
  const updateData = req.body;

  // Update the assignment
  Assignment.findByIdAndUpdate(aId, updateData, { new: true })
    .then((updatedAssignment) => {
      if (!updatedAssignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      res.status(200).json({
        message: "Assignment updated successfully",
        assignment: updatedAssignment,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update the assignment" });
    });
};

const updateQuiz = (req, res, next) => {
  const { classId, qId } = req.params;
  const updateData = req.body;

  // Update the Quiz
  Quiz.findByIdAndUpdate(qId, updateData, { new: true })
    .then((updatedQuiz) => {
      if (!updatedQuiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      res.status(200).json({
        message: "Quiz updated successfully",
        quiz: updatedQuiz,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update the Quiz" });
    });
};

const addQuizMarks = (req, res, next) => {
  const { qid, sid } = req.params;
  const { marks } = req.body;

  Quiz.findById(qid)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      const studentExists = quiz.grades.filter(
        (entry) => entry.student === sid
      );
      if (studentExists) {
        return res
          .status(400)
          .json({ error: "Student's marks already exist", quiz });
      }

      Student.findById(sid)
        .then((student) => {
          if (!student) {
            return res.status(404).json({ error: "Student not found" });
          }

          const studentMarks = {
            student: sid,
            marks: marks,
          };

          quiz.grades.push(studentMarks);
          quiz.save();

          res
            .status(200)
            .json({ message: "Quiz marks added successfully", quiz });
        })
        .catch((error) => {
          res.status(500).json({ error: "Failed to add quiz marks" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to find the quiz" });
    });
};

const updateFinalMarks = (req, res, next) => {
  Course.findById(req.params.courseid)
    .then((course) => {
      try {
        course.final.grade.filter(
          (item) => item.student.toString() == req.params.sid
        )[0].marks = req.body.marks;
        course.save();
        res.status(200).json("Marks updated successfully!");
      } catch (error) {
        res.status(404).json("Invalid Student ID");
        console.log(error);
      }
    })
    .catch((error) => {
      res.status(404).json("Course ID not found!");
      console.log(error.message);
    });
};

//DELETE
const deleteAssignment = (req, res, next) => {
  const { aId } = req.params;

  // Remove the assignment from the class
  Class.findByIdAndUpdate(
    { _id: req.params.classId },
    { $pull: { assignments: aId } }
  )
    .then(() => {
      // Delete the assignment
      return Assignment.findByIdAndDelete(aId);
    })
    .then(() => {
      res.status(200).json({ message: "Assignment deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete the assignment" });
    });
};

const deleteQuiz = (req, res, next) => {
  const { qId } = req.params;

  // Remove the quiz from the class
  Class.findByIdAndUpdate(
    { _id: req.params.classId },
    { $pull: { quizzes: qId } }
  )
    .then(() => {
      // Delete the quiz
      return Quiz.findByIdAndDelete(qId);
    })
    .then(() => {
      res.status(200).json({ message: "Quiz deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete the quiz" });
    });
};

const deleteQuizMarks = (req, res) => {
  const quizId = req.params.qid;
  const studentId = req.params.sid;

  // Find the course that contains the specified quiz
  Course.findOne({ "quizzes._id": quizId })
    .then((course) => {
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Find the specified quiz within the course
      const quiz = course.quizzes.find(
        (quiz) => quiz._id.toString() === quizId
      );

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      // Find the student's marks index in the quiz
      const studentMarksIndex = quiz.grade.findIndex(
        (grade) => grade.student._id.toString() === studentId
      );

      if (studentMarksIndex === -1) {
        return res.status(404).json({ error: "Student marks not found" });
      }

      // Remove the student's marks from the quiz
      quiz.grade.splice(studentMarksIndex, 1);
      return course.save();
    })
    .then(() => {
      res.json({ message: "Student marks deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
};

module.exports = {
  getAssignment,
  deleteAssignment,
  addAssignment,
  updateAssignment,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  addQuizMarks,
  deleteQuizMarks,
  updateFinalMarks,
};
