const {model, Schema} = require('mongoose');


const InstituteClass = new Schema({

    name: {
        type: String,
        required: true
    },
    institute: {
        type: Schema.Types.ObjectId,
        ref: 'Institute'
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    teachers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],


})


module.exports = model('InstituteClass', InstituteClass)