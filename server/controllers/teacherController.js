const Assignment = require('../models/Assignment');
const Class = require('../models/Class');
const Quiz = require('../models/Quiz');
const Student = require('../models/Student')
const Course = require('../models/Course')

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

    }).catch((err) => {
      console.log("Error retrieving assignment:", err);
      res.status(500).json({ error: "Internal server error" });
    });
}


//POST
const addAssignment = (req, res, next) => {
  Assignment.create({...req.body, class: req.params.classId})
    .then((assignment) => {
        console.log("Assignment has been added");

        res.statuscode=200;
        res.setHeader('Content-Type','application/json');
        res.json(assignment);
    }, (err) => next(err))
    .catch((err) => next(err));
};

const addQuiz = (req, res, next) => {
  Quiz.create({...req.body, class: req.params.classId})
    .then((quiz)=>{
        console.log("Quiz has been added");

        res.statuscode=200;
        res.setHeader('Content-Type','application/json');
        res.json(quiz);
    }, (err) => next(err))
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
        return res.status(404).json({ error: 'Assignment not found' });
      }

      res.status(200).json({
        message: 'Assignment updated successfully',
        assignment: updatedAssignment
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update the assignment' });
    });
};

const updateQuiz = (req, res, next) => {
  const { classId, qId } = req.params;
  const updateData = req.body;

  // Update the Quiz
  Quiz.findByIdAndUpdate(qId, updateData, { new: true })
    .then((updatedQuiz) => {
      if (!updatedQuiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }

      res.status(200).json({
        message: 'Quiz updated successfully',
        quiz: updatedQuiz
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update the Quiz' });
    });
};

const addQuizMarks = (req, res, next) => {
  const { qid, sid } = req.params;
  const { marks } = req.body;

  Quiz.findById(qid)
      .then(quiz => {
          if (!quiz) {
              return res.status(404).json({ error: 'Quiz not found' });
          }

          const studentExists = quiz.grades.filter( (entry) => entry.student.toString() === sid)
          if(studentExists.length > 0){
            return res.status(400).json({ error: "Student's marks already exist", quiz });
          }

          Student.findById(sid)
              .then(student => {
                  if (!student) {
                      return res.status(404).json({ error: 'Student not found' });
                  }

                  const studentMarks = {
                      student: sid,
                      marks: marks,
                  };

                  quiz.grades.push(studentMarks);
                  return quiz.save();
                })
                .then(() => {
                  res.status(200).json({ message: 'Quiz marks added successfully', quiz });
              })
              .catch((error) => {
                  res.status(500).json({ error: 'Failed to add quiz marks' });
              });
      })
      .catch((error) => {
        console.log(error)
          res.status(500).json({ error: 'Failed to find the quiz' });
      });
};

// const updateQuizMarks = null

const addAssignmentMarks = (req, res, next) => {
  const { aid, sid } = req.params;
  const { marks } = req.body;

  Assignment.findById(aid)
    .then(assignment => {
      if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }

      const studentExists = assignment.grades.filter( (entry) => entry.student.toString() === sid)

      if(studentExists.length > 0){
        return res.status(400).json({ error: "Student's marks already exist", assignment });
      }

      Student.findById(sid)
        .then(student => {
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }

          const studentMarks = {
            student: sid,
            marks: marks,
          };

          assignment.grades.push(studentMarks);
          return assignment.save();
        })
        .then(() => {
          res.status(200).json({ message: 'Assignment marks added successfully', assignment });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to add assignment marks' });
        });
    }) 
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: 'Failed to find the assignment' });
    });
};

// const updateAssignmentMarks = null 

const addMidtermMarks = (req, res, next) => {
  const { courseid, sid } = req.params;
  const { marks } = req.body;

  Course.findById(courseid)
    .then(course => {
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const studentExists = course.midTerm.grade.filter( (entry) => entry.student.toString() === sid)

      if(studentExists.length > 0){
        return res.status(400).json({ error: "Student's marks already exist", course });
      }

      Student.findById(sid)
        .then(student => {
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }

          const studentMarks = {
            student: sid,
            marks: marks,
          };

          course.midTerm.grade.push(studentMarks);

          return course.save();
        })
        .then(() => {
          res.status(200).json({ message: 'Midterm marks added successfully', course });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to add midterm marks' });
        });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: 'Failed to find the course' });
    });
};

const updateMidtermMarks = (req, res, next) => {
  const { courseid, sid } = req.params;
  const { marks } = req.body;

  Course.findById(courseid)
    .then(course => {
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      Student.findById(sid)
        .then(student => {
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }
          
          const studentMarks = course.midTerm.grade.find(g => g.student.toString() === sid.toString());
          
          if (!studentMarks) {
            return res.status(404).json({ error: 'Midterm marks not found for the student' });
          }

          studentMarks.marks = marks;
          return course.save();
        })
        .then(() => {
          res.status(200).json({ message: 'Midterm marks updated successfully', course });
        })
        .catch(error => {
          res.status(500).json({ error: 'Failed to update midterm marks' });
        });
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to find the course' });
    });
};

const addFinalMarks = async (req, res, next) => {
  const { sid, courseid } = req.params;
  const { marks } = req.body;

  Course.findById(courseid)
      .then(course => {
          if (!course) {
              return res.status(404).send('Course not found');
          }
          const studentExists = course.final.grade.filter( (entry) => entry.student.toString() === sid)

          if(studentExists.length > 0){
            return res.status(400).json({ error: "Student's marks already exist", course });
          }

          Student.findById(sid)
            .then(student => {
              if (!student) {
                return res.status(404).json({ error: 'Student not found' });
              }

              const studentMarks = {
                student: sid,
                marks: marks,
              };

              course.final.grade.push(studentMarks);

              return course.save();
            })
            .then(() => {
              res.status(200).json({ message: 'Final marks added successfully', course });
            })
            .catch((error) => {
              res.status(500).json({ error: 'Failed to add final marks' });
            }); 
      })
      .catch(error => {
          console.error(error);
          res.status(500).send('Server error');
      });
}

//DELETE
const deleteAssignment = (req, res, next) => {
    const { aId } = req.params;
  
    // Remove the assignment from the class
    Class.findByIdAndUpdate({_id:req.params.classId}, { $pull: { assignments: aId } })
      .then(() => {
        // Delete the assignment
        return Assignment.findByIdAndDelete(aId);
      })
      .then(() => {
        res.status(200).json({ message: 'Assignment deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to delete the assignment' });
      });
};

const deleteQuiz = (req, res, next) => {
  const { qId } = req.params;

  // Remove the quiz from the class
  Class.findByIdAndUpdate({_id:req.params.classId}, { $pull: { quizzes: qId } })
    .then(() => {
      // Delete the quiz
      return Quiz.findByIdAndDelete(qId);
    })
    .then(() => {
      res.status(200).json({ message: 'Quiz deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete the quiz' });
    });
};

// const deleteQuizMarks = null



module.exports = {
  getAssignment,
  deleteAssignment,
  addAssignment,
  updateAssignment,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  addQuizMarks,
  addAssignmentMarks,
  addMidtermMarks,
  updateMidtermMarks,
  addFinalMarks
}