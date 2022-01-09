const express = require('express');
const {body, check} = require('express-validator')
const asyncHandler = require('express-async-handler')

const userController = require('../controllers/userControllers')

const InstituteClass = require('../models/InstituteClass')

const validateExpress = require('../helpers/validateExpress')
const isAuth = require('../helpers/isAuth')
const User = require("../models/User");


const router = express.Router();


router.post('/addStudent', isAuth, [
    body('email').isEmail().withMessage('Please enter a valid email.').custom(email => {
        return User.exists({email: email})
            .then(isPresent => {
                if (isPresent) return Promise.reject('Email already exist!');
                else return true;
            })
    }).normalizeEmail(),
    body('studentClass').notEmpty().isLength({min: 6}).withMessage('Class too short.')
        .custom(value => {
            return InstituteClass.exists({_id: value})
                .then(isPresent => {
                    if (!isPresent) return Promise.reject('Class not found!');
                    else return true;
                })
        }),
    body('rollNo').notEmpty().isLength({min: 1}).withMessage('Roll Number not found.')
        .custom((value, {req}) => {
            return User.exists({'rollNo': value, class: req.body.className})
                .then(isPresent => {
                    if (isPresent) return Promise.reject('Roll Number already taken!');
                    else return true;
                })
        }),
    body('firstName').notEmpty().isLength({min: 1}).withMessage('First Name not found.'),
    body('lastName').notEmpty().isLength({min: 1}).withMessage('Last Name not found.'),
    body('dob').notEmpty().isLength({min: 1}).withMessage('Date of Birth not found.'),
    body('gender').notEmpty().isLength({min: 1}).withMessage('Gender not found.'),
    body('admissionDate').notEmpty().isLength({min: 1}).withMessage('Invalid Admission Date.'),
], validateExpress, userController.addUser);


router.post('/addTeacher', isAuth, [
    body('email').isEmail().withMessage('Please enter a valid email.').custom(email => {
        return User.exists({email: email})
            .then(isPresent => {
                if (isPresent) return Promise.reject('Email already exist!');
                else return true;
            })
    }).normalizeEmail(),
    body('staffID').notEmpty().isLength({min: 1}).withMessage('Staff ID not found.')
        .custom((value, {req}) => {
            return User.exists({'staffID': value, institute: req.user.instituteID})
                .then(isPresent => {
                    if (!isPresent) return Promise.reject('Staff ID already taken.');
                    else return true;
                })
        }),
    body('firstName').notEmpty().isLength({min: 1}).withMessage('First Name not found.'),
    body('lastName').notEmpty().isLength({min: 1}).withMessage('Last Name not found.'),
    body('dob').notEmpty().isLength({min: 1}).withMessage('Date of Birth not found.'),
    body('gender').notEmpty().isLength({min: 1}).withMessage('Gender not found.'),
    body('joiningDate').notEmpty().isLength({min: 1}).withMessage('Invalid Joining Date.')
], validateExpress, userController.addUser)


router.get('/getClassStudents', isAuth, [
    check('studentClass').notEmpty().withMessage('Please select a valid Class!')
        .custom(value => {
            return InstituteClass.exists({_id: value})
                .then(isPresent => {
                    if (!isPresent) return Promise.reject('Class not found!');
                    else return true;
                })
        })
], validateExpress, userController.getClassStudents)


router.get('/getClassTeachers', isAuth, [
    check('teacherClass').notEmpty().withMessage('Please select a valid Class!')
        .custom(value => {
            return InstituteClass.exists({_id: value})
                .then(isPresent => {
                    if (!isPresent) return Promise.reject('Class not found!');
                    else return true;
                })
        })
], validateExpress, userController.getClassTeachers)


router.post('/markAttendance', isAuth, [
    check('date').notEmpty().isDate().withMessage('Invalid Data!'),
    check('studentClass').notEmpty().withMessage('Please select a valid Class!')
        .custom(value => {
            return InstituteClass.exists({_id: value})
                .then(isPresent => {
                    if (!isPresent) return Promise.reject('Class not found!');
                    else return true;
                })
        })
], validateExpress, userController.markAttendance)


router.get('/getAttendance', isAuth, [
    check('date').notEmpty().isDate().withMessage('Invalid Data!'),
    check('studentClass').notEmpty().withMessage('Please select a valid Class!')
        .custom(value => {
            return InstituteClass.exists({_id: value})
                .then(isPresent => {
                    if (!isPresent) return Promise.reject('Class not found!');
                    else return true;
                })
        })
], validateExpress, userController.getAttendance)

router.get('/getInitialAttendance', isAuth, [
    check('date').notEmpty().isDate().withMessage('Invalid Data!'),
    check('studentClass').notEmpty().withMessage('Please select a valid Class!')
        .custom(value => {
            return InstituteClass.exists({_id: value})
                .then(isPresent => {
                    if (!isPresent) return Promise.reject('Class not found!');
                    else return true;
                })
        })
], validateExpress, userController.getInitialAttendance)


module.exports = router;
