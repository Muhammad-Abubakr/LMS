const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

module.exports.dashboard = (req, res, next) => {
    res.send("Show Dashboard");
};

module.exports.getClasses = (req, res, next) => {
    Class.find({}).populate('teacher').populate('students.sid').then(data => {
        res.json(data);
    }, err => next(err)).catch(err => {
        console.log(err);
    });
};

module.exports.getSingleClass = (req, res, next) => {
    Class.find({_id: req.params.cid}).populate('teacher').populate('students.sid').then(data => {
        res.json(data);
    }, err => next(err)).catch(err => {
        console.log(err);
    });
};

module.exports.getStudents = (req, res, next) => {
    Student.find({}).then(data => {
        res.json(data);
    }, err => next(err)).catch(err => {
        console.log(err);
    });
};

module.exports.getSingleStudent = (req, res, next) => {
    Student.findById(req.params.sid).then(data => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(data);
    }, err => next(err)).catch(err => {
        console.log(err);
    });
};

module.exports.getTeachers = (req, res, next) => {
    Teacher.find({}).then(data => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(data);
    }, err => next(err)).catch(err => {
        console.log(err);
    });
};

module.exports.getSingleTeacher = (req, res, next) => {
    Teacher.findById(req.params.tid).then(data => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(data);
    }, err => next(err)).catch(err => {
        console.log(err);
    });
};

module.exports.addTeacher = (req, res, next) => {
    Teacher.create(req.body).then( data => {
        console.log("Added a new teacher");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }, err => next(err)).catch(err => {
        console.log(err)
    });
};

module.exports.addClass = (req, res, next) => {
    Class.create(req.body).then( data => {
        console.log("Added a new class");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }, err => next(err)).catch(err => {
        console.log(err)
    });
};

module.exports.addStudent = (req, res, next) => {
    Student.create(req.body).then( data => {
        console.log("Added a new student");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }, err => next(err)).catch(err => {
        console.log(err)
    });
};

module.exports.addStudentInClass = (req, res, next) => {
    Class.findOneAndUpdate({ _id: req.params.cid }, 
        { 
            "$push":{
                "students": {
                    "sid": req.params.sid
                }
            } 
        }, {new: true, upsert: false}).then( data => {
            res.json(data)
        }, err => next(err)).catch( err => {
            console.log(err);
        }
    );
};

module.exports.addTeacherInClass = (req, res, next) => {
    Class.findOneAndUpdate({_id: req.params.cid}, {teacher: req.params.tid}).then( data => {
        res.json(data);
    }, err => next(err));
};

module.exports.deleteTeacher = (req, res, next) => {
    Teacher.deleteOne({ _id: req.params.tid }).then( data => {
        res.json(data);
    }, err => next(err)).then(err => {
        console.log(err);
    });
};

module.exports.deleteStudent = (req, res, next) => {
    Student.deleteOne({ _id: req.params.sid }).then( data => {
        res.json(data);
    }, err => next(err)).then(err => {
        console.log(err);
    });
};

module.exports.deleteClass = (req, res, next) => {
    Class.deleteOne({ _id: req.params.cid }).then( data => {
        res.json(data);
    }, err => next(err)).then(err => {
        console.log(err);
    });
};