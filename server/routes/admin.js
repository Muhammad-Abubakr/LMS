var express = require("express");

// requiring the models
var Class = require('../models/class');
var Teacher = require('../models/teacher');
var Student = require('../models/student');

router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Show Dashboard');
});

router.get('/classes', function (req, res, next) {
    //
    Class.find({}).populate('teacher').populate('students.sid').exec(function (err, data) {
        if (err) {
            //next k andr error hi return hi krengy
            return next(err);
        }
        res.json(data);
    });

});

router.get('/students', function (req, res, next) {
    Class.find({}).exec(function (err, data) {
        if (err) {
            //next k andr error hi return hi krengy
            return next(err);
        }
        res.json(data);
    });
});

router.get('/teachers', function (req, res, next) {

    Class.find({}).exec(function (err, data) {
        if (err) {
            //next k andr error hi return hi krengy
            return next(err);
        }
        res.json(data);
    });
});

//kisi class ki id pass krengy to get specific class
router.get('/classes/:cid', function (req, res, next) {
    res.send('Show one Class');
});

router.get('/teachers/:tid', function (req, res, next) {
    //promise based
    Teacher.findById(req, params, tid)
        .then((teacher) => {
            res.statuscode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(teacher);
        }, (err) => next(err))
        .catch((err) => next(err));

    res.send('Show one Teacher');
});

router.get('/students/:sid', function (req, res, next) {
    Student.findById(req, params, sid)
        .then((student) => {
            res.statuscode = 200; // means okkk
            res.setHeader('Content-Type', 'application/json');
            res.json(student);
        }, (err) => next(err))
        .catch((err) => next(err));
    res.send('Show one Student');
});

// POST Methodss
router.post('/addTeacher', function (req, res, next) {

    Teacher.create(req.body)
        .then((teacher) => {
            console.log("Teacher Has been Added");
            res.statuscode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(teacher);

        }, (err) => next(err))
        .catch((err) => next(err));

});
router.post('/addClass', function (req, res, next) {
    Class.create(req.body)
        // "class" issue karta hay
        .then((classs) => {
            console.log("Class Has been Added");
            res.statuscode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(classs);

        }, (err) => next(err))
        .catch((err) => next(err));
});

router.post('/addStudent', function (req, res, next) {
    Student.create(req.body)
        .then((student) => {
            console.log("Student Has been Added");
            res.statuscode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(student);

        }, (err) => next(err))
        .catch((err) => next(err));
});

//PUT Methods

router.put('/assignStudent/:cid/:sid', function (req, res, next) {
    //for array of student, add students to classes will be different like given below
    //extra properties for array is added
    // {new: k new cheez dalni array may, overwrite nishta}
    // {upsert: k end may chez dalni hay, starting may nhe (for false)}
    Class.findOneAndUpdate({ _id: req.params.cid },
        {
            "$push": {
                "students": {
                    "sid": req.params.sid
                }
            }
        }, { new: true, upsert: false }, function (err, data) {
            if (err) {
                return next(err);
            }
            res.json(data);
        });
    // res.send('Adding Student to a Class');
});

router.put('/assignTeacher/:cid/:tid', function (req, res, next) {
    // parameters of the funtion (find the class whose data to be updated,
    // find the specific teacher of class)

    //To add in postman, use "http://localhost:3000/admin/assignTeacher/ClassID/TeacherID" format

    Class.findOneAndUpdate({ _id: req.params.cid },
        { teacher: req.params.tid }, function (err, data) {
            if (err) {
                return next(err);
            }
            res.json(data);
        })
});


router.delete('/delTeacher/:tid', function (req, res, next) {
    Teacher.deleteOne({ _id: req.params.tid }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.json(data);

    })
});
router.delete('/delStudent/:sid', function (req, res, next) {
    Student.deleteOne({ _id: req.params.sid }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.json(data);
    })
});
router.delete('/delClass/:tid', function (req, res, next) {
    Class.deleteOne({ _id: req.params.cid }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.json(data);
    })
});

module.exports = router;