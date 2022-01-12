const mongoose = require('mongoose');

const InstituteClass = require('../models/InstituteClass');
const User = require('../models/User');
const Attendance = require('../models/Attendance');


exports.addUser = async (req, res, next) => {

    const {
        email,
        firstName,
        lastName,
        dob,
        gender,
        admissionDate,
        rollNo,
        studentClass,
        staffID,
        joiningDate,
        role
    } = req.body;


    let newUser = new User({
        email,
        'institute': req.user.instituteID,
        password: '1234',
        firstName,
        lastName,
        dob,
        gender,
        role: role || 'Student',

        admissionDate,
        rollNo,
        'class': studentClass,

        staffID,
        joiningDate,
    });
    await newUser.save();


    if (role === 'Student') {
        let cls = await InstituteClass.findById(studentClass).select('students');
        cls.students.push(newUser._id);
        await cls.save();
    }


    res.status(201)
        .json({
            'message': "success",
            "userID": newUser._id
        });


}

exports.getClassStudents = async (req, res, next) => {

    const {
        studentClass: classID
    } = req.query;


    let users = await User.find({
        class: classID,
        institute: req.user.instituteID,
        role: 'Student'
    })
        .select('firstName lastName rollNo admissionDate').lean();


    res.status(200)
        .json({
            'message': "success",
            "students": users
        });


}

exports.getStudents = async (req, res, next) => {


    let users = await User.find({
        institute: req.user.instituteID,
        role: 'Student'
    })
        .select('firstName lastName rollNo admissionDate class')
        .populate('class', 'name', 'InstituteClass')
        .sort('class.name')
        .lean();


    res.status(200)
        .json({
            'message': "success",
            "students": users
        });


}

exports.getClassTeachers = async (req, res, next) => {

    const {
        teacherClass: classID
    } = req.query;


    let users = await User.find({
        institute: req.user.instituteID,
        'class': classID,
        role: 'Teacher'
    })
        .select('firstName lastName staffID joiningDate').lean();


    res.status(200)
        .json({
            'message': "success",
            "teachers": users
        });


}

exports.getTeachers = async (req, res, next) => {

    let users = await User.aggregate()
        .match({
            institute: mongoose.Types.ObjectId(req.user.instituteID),
            role: 'Teacher'
        })
        .project({
            'firstName': 1, 'lastName': 1, 'staffID': 1, 'joiningDate': 1, 'classes': {$size: '$classes'}
        })

    res.status(200)
        .json({
            'message': "success",
            "teachers": users
        });

}

exports.getTeachersWithClasses = async (req, res, next) => {

    let users = await User.find({
        institute: mongoose.Types.ObjectId(req.user.instituteID),
        role: 'Teacher'
    })
        .select('firstName lastName staffID classes').lean();


    res.status(200)
        .json({
            'message': "success",
            "teachers": users
        });

}

exports.updateTeacherClasses = async (req, res, next) => {


    let {
        userID,
        classes
    } = req.body


    for (let i = 0; i < classes.length; i++) {
        let cls;

        if (mongoose.Types.ObjectId.isValid(classes[i]))
            cls = await InstituteClass.findById(classes[i]);
        if (!cls) {
            const error = new Error('Invalid Class found in Data');
            error.statusCode = 401;
            next(error);
        }

    }


    let user = await User.findById(userID)
        .select('classes');

    user.classes = classes;
    await user.save();

    res.status(200)
        .json({
            'message': "success",
            "teachers": user
        });

}

exports.markAttendance = async (req, res, next) => {

    //students[{isPresent, _id}]

    const {
        date,
        studentClass: classID,
        students
    } = req.body;


    let users = await User.find({
        institute: req.user.instituteID,
        'class': classID,
        role: 'Student'
    })
        .select('_id').lean();


    users.map(ele => {
        let index = students.findIndex((std) => std._id.toString() === ele._id.toString());

        ele.isPresent = !!students[index]?.isPresent;
        ele.student = ele._id.toString();
        ele.attendanceClass = classID;
        ele.date = date;
        delete ele._id;

        return ele;
    })


    for (let i = 0; i < users.length; i++) {

        let userAttendance = users[i];
        await Attendance.updateOne({
            'date': new Date(date).toISOString(),
            'student': userAttendance.student,
            'attendanceClass': userAttendance.attendanceClass
        }, userAttendance, {upsert: true})

    }


    res.status(201)
        .json({
            'message': "success",
        });


}

exports.getAttendance = async (req, res, next) => {

    const {
        date,
        studentClass: classID
    } = req.query;


    let attendances = await Attendance.find({
        institute: req.user.instituteID,
        'class': classID,
        'date': new Date(date).toISOString(),
    })
        .select('isPresent student')
        .populate('student', 'firstName lastName rollNo,')


    res.status(200)
        .json({
            'message': "success",
            'studentsAttendance': attendances
        });


}

exports.getInitialAttendance = async (req, res, next) => {

    const {
        date,
        studentClass: classID,
    } = req.query;

    console.log(req.query, req.user.instituteID);

    let users = await User.find({
        'institute': req.user.instituteID,
        'class': classID,
        'role': 'Student'
    })
        .select('firstName lastName rollNo').lean();

    console.log(users);

    let studentsAttendance = await Attendance.find({
        'attendanceClass': classID,
        'date': new Date(date).toISOString(),
    })
        .select('isPresent student').lean();


    users.map(user => {
        let index = studentsAttendance.findIndex((attendance) => attendance.student.toString() === user._id.toString());
        user.isPresent = !!studentsAttendance[index]?.isPresent;
        return user;
    })


    res.status(200)
        .json({
            'message': "success",
            'initialAttendance': users
        });


}




