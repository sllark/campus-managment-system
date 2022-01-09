const InstituteClass = require('../models/InstituteClass');


exports.addClass = async (req, res, next) => {

    const {className} = req.body;

    let newClass = new InstituteClass({
        'name': className,
        'institute': req.user.instituteID,
        'teachers': [req.user.userID]
    });

    await newClass.save();

    res.status(201)
        .json({
            'message': "success",
            'classID': newClass._id.toString()
        });


}

exports.getClasses = async (req, res, next) => {


    let classes = InstituteClass.find({
        'institute': req.user.instituteID,
    }).select('name');


    res.status(201)
        .json({
            'message': "success",
            'classes': classes
        });


}

exports.getClassesData = async (req, res, next) => {

    // let classes = InstituteClass.find({
    //     'institute': req.user.instituteID,
    // }).select('name students teachers')


    let classes = InstituteClass.aggregate()
        .match({institute: req.user.instituteID.toString()})
        .project({'name': 1, 'students': {$size: '$students'}, 'teachers': {$size: '$teachers'},})


    res.status(200)
        .json({
            'message': "success",
            'classes': classes
        });


}

exports.getClassData = async (req, res, next) => {

    const {classID} = req.query;


    let classData = InstituteClass.findById(classID)
        .select('name students teachers')
        .populate('students', 'firstName LastName rollNo admissionDate', 'User')
        .populate('teacher', 'firstName LastName staffID joiningDate', 'User')


    res.status(200)
        .json({
            'message': "success",
            'classData': classData
        });


}



