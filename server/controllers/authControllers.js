const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Institute = require('../models/Institute');

const {JWT_SECRET} = require('../config/keys')


exports.signup = async (req, res, next) => {

    const {instituteName, firstName, lastName, email, password} = req.body;

    let hash = await bcrypt.hash(password, 12)


    let newInstitute = new Institute({
        'name': instituteName,
    })
    await newInstitute.save();


    let newUser = new User({
        email,
        'password': hash,
        'role': 'Admin',
        'institute': newInstitute._id.toString(),
        firstName,
        lastName,
    });

    await newUser.save();

    newInstitute.admins.push(newUser._id.toString());
    await newInstitute.save();


    let payload = {
        userID: newUser._id.toString(),
        instituteID: newUser.institute.toString(),
        role: newUser.role,
    }


    jwt.sign(payload, JWT_SECRET, (error, token) => {
        if (error) throw new Error('internal Server Error');

        res.status(201)
            .json({
                'message': "success",
                token: token,
                userID: newUser._id.toString(),
                instituteID: newUser.institute.toString(),
                role: newUser.role,
            });
    })

}


exports.login = async (req, res, next) => {

    const {email, password} = req.body;

    let fetchedUser;
    let user = await User.findOne({email: email})
    let isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) {
        const error = new Error('Email or Password does not match.');
        error.statusCode = 401;
        return next(error);
    }


    let payload = {
        userID: user._id.toString(),
        instituteID: user.institute.toString(),
        role: user.role,
    }



    jwt.sign(payload, JWT_SECRET, (error, token) => {
        if (error) return next(new Error('Internal Server Error'));

        res.status(201)
            .json({
                'message': "success",
                token: token,
                userID: user._id.toString(),
                instituteID: user._id.toString(),
                role: user.role,
            });
    })


}

