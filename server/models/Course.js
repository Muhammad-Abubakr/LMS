const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
    },
    name: {
        type: String,
        required: true
    },
    courseMaterial: {
        type: [
            {
                name: String,
                authorName: String,
                edition: Number
            }
        ]
    },
    assignments: [
        {
            assignmentDetail: {
                type: String,
            },
            grades: [
                {
                    student: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Student"
                    },
                    grade: {
                        type: Number,
                    },
                },
            ],
            dueDate: {
                type: Date,
            }
        },
    ],
    quizzes: [
        {
            quizDetails: {
                type: String,
            },
            grade: [
                {
                    student: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Student"
                    },
                    marks: {
                        type: Number,
                    },
                },
            ],
            dueDate: {
                type: Date,
            },
        },
    ],

    midTerm:
    {
        grade: [
            {
                student: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student"
                },
                marks: {
                    type: Number,
                },
            },
        ],
        dueDate: {
            type: date,
        },
    },

    final: {
        grade: [
            {
                student: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student"
                },
                marks: {
                    type: Number,
                },
            },
        ],
        dueDate: {
            type: date,
        },
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);