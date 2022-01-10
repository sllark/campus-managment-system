const {model, Schema} = require('mongoose');


const User = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    institute: {
        type: Schema.Types.ObjectId,
        ref: 'Institute'
    },
    role: {
        type: String,
        enum:['Student','Teacher','Admin'],
        default:'Student'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        enum:['Male','Female'],
        default: 'Male'
    },
    dob: {
        type: Date,
    },

    //Student
    class: {
        type: Schema.Types.ObjectId,
        ref: 'InstituteClass'
    },
    rollNo: {
        type: String,
    },
    admissionDate: {
        type: String,
    },

    //Admin,Teacher
    classes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'InstituteClass'
        }
    ],
    staffID: {
        type: String,
    },
    joiningDate: {
        type: String,
    },

})




module.exports = model('User',User)