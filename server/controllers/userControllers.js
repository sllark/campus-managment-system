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


    let users = User.find({
        class: classID,
        institute: req.user.instituteID,
        role: 'Student'
    })
        .select('firstName lastName rollNo admissionDate').lean();


    res.status(201)
        .json({
            'message': "success",
            "students": users
        });


}

exports.getClassTeachers = async (req, res, next) => {

    const {
        teacherClass: classID
    } = req.query;


    let users = User.find({
        institute: req.user.instituteID,
        'class': classID,
        role: 'Teacher'
    })
        .select('firstName lastName staffID joiningDate').lean();


    res.status(201)
        .json({
            'message': "success",
            "teachers": users
        });


}


exports.markAttendance = async (req, res, next) => {

    //students[{isPresent, _id}]

    const {
        date,
        studentClass: classID,
        students
    } = req.body;


    let users = User.find({
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
            'date':new Date(date).toISOString(),
            'student':userAttendance.student,
            'attendanceClass':userAttendance.attendanceClass
        },userAttendance,{upsert:true})

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


    let attendances = Attendance.find({
        institute: req.user.instituteID,
        'class': classID,
        'date':new Date(date).toISOString(),
    })
        .select('isPresent student')
        .populate('student','firstName lastName rollNo,')





    res.status(201)
        .json({
            'message': "success",
            'studentsAttendance':attendances
        });


}

exports.getInitialAttendance = async (req, res, next) => {

    const {
        date,
        studentClass: classID,
    } = req.query;


    let users = User.find({
        institute: req.user.instituteID,
        'class': classID,
        role: 'Student'
    })
        .select('firstName lastName rollNo').lean();


    let studentsAttendance = Attendance.find({
        'attendanceClass': classID,
        'date': new Date(date).toISOString(),
    })
        .select('isPresent student').lean();




    users.map(user => {
        let index = studentsAttendance.findIndex((attendance) => attendance.student.toString() === user._id.toString());
        user.isPresent = !!studentsAttendance[index]?.isPresent;
        return user;
    })




    res.status(201)
        .json({
            'message': "success",
            'initialAttendance':users
        });


}




