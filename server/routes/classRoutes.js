const express = require('express');
const {body} = require('express-validator')
const asyncHandler = require('express-async-handler')

const classController = require('../controllers/classControllers')

const InstituteClass = require('../models/InstituteClass')

const validateExpress = require('../helpers/validateExpress')
const isAuth = require('../helpers/isAuth')


const router = express.Router();



router.post('/addClass', isAuth,
    [
        body('className').notEmpty().withMessage('Please enter a valid Class Name.').custom((name, {req}) => {
            return InstituteClass.exists({name: name, institute: req.user.instituteID.toString()})
                .then(isPresent => {
                    if (isPresent) return Promise.reject('Class Name already exist!');
                    else return true;
                })
        }),
    ],
    validateExpress, asyncHandler(classController.addClass))


router.post('/getClasses',  isAuth, asyncHandler(classController.getClasses))

router.post('/getClassesData', isAuth, asyncHandler(classController.getClassesData))



router.post('/getClassData', isAuth,[
        body('classID').notEmpty().withMessage('Please select a valid Class.').custom((classID, {req}) => {
            return InstituteClass.exists({_id: classID, institute: req.user.instituteID.toString()})
                .then(isPresent => {
                    if (!isPresent) return Promise.reject('Class Not Found!');
                    else return true;
                })
        }),
    ],
    validateExpress, asyncHandler(classController.getClassData))

module.exports = router;
