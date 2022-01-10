const mongoose = require('mongoose');
const InstituteClass = require('../models/InstituteClass');


exports.addClass = async (req, res, next) => {

    const {className} = req.body;

    let newClass = new InstituteClass({
        'name': className,
        'institute': req.user.instituteID,
        // 'teachers': [req.user.userID]
    });

    await newClass.save();

    res.status(201)
        .json({
            'message': "success",
            'classID': newClass._id.toString()
        });


}

exports.getClasses = async (req, res, next) => {


    let classes = await InstituteClass.find({
        'institute': req.user.instituteID,
    }).select('name').lean();


    res.status(200)
        .json({
            'message': "success",
            'classes': classes
        });


}

exports.getClassesData = async (req, res, next) => {

    // let classes = InstituteClass.find({
    //     'institute': req.user.instituteID,
    // }).select('name students teachers')


    let classes = await InstituteClass.aggregate()
        .match({institute: mongoose.Types.ObjectId(req.user.instituteID)})
        .project({'name': 1, 'students': {$size: '$students'}, 'teachers': {$size: '$teachers'},})


    res.status(200)
        .json({
            'message': "success",
            'classes': classes
        });


}

exports.getClassData = async (req, res, next) => {

    const {classID} = req.query;


    let classData = await InstituteClass.findById(classID)
        .select('name students teachers')
        .populate('students', 'firstName lastName rollNo admissionDate', 'User')
        .populate('teachers', 'firstName lastName staffID joiningDate', 'User')


    res.status(200)
        .json({
            'message': "success",
            'classData': classData
        });


}



