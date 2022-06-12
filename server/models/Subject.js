const { model, Schema } = require('mongoose')

const Subject = new Schema({
  name: {
    type: String,
    required: true
  },
  institute: {
    type: Schema.Types.ObjectId,
    ref: 'Institute'
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'InstituteClass'
    }
  ],
  teachers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

Subject.methods.addTeacher = async function (teacherId) {
  const teachers = [...this.teachers.map(ele => ele.toString())]
  if (teachers.indexOf(teacherId) === -1) {
    teachers.push(teacherId)
  }
  this.teachers = teachers
  await this.save()
}

Subject.methods.removeTeacher = async function (teacherId) {
  const teachers = [...this.teachers.map(ele => ele.toString())]
  const index = teachers.indexOf(teacherId)
  if (index >= 0) {
    teachers.splice(index, 1)
  }
  this.teachers = teachers
  await this.save()
}

Subject.methods.addClass = async function (classID) {
  const classes = [...this.classes.map(ele => ele.toString())]
  if (classes.indexOf(classID) === -1) {
    classes.push(classID)
  }
  this.classes = classes
  await this.save()
}

Subject.methods.removeClass = async function (classID) {
  const classes = [...this.classes.map(ele => ele.toString())]
  const index = classes.indexOf(classID)
  if (index >= 0) {
    classes.splice(index, 1)
  }
  this.classes = classes
  await this.save()
}

module.exports = model('Subject', Subject)
