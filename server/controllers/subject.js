const Subject = require('../models/Subject')
const asyncHandler = require('express-async-handler')

const add = async (req, res) => {
  const {
    name
  } = req.body

  const sub = new Subject({ name, institute: req.user.instituteID })
  await sub.save()

  res.status(201)
    .json({
      message: 'success'
    })
}

const get = async (req, res) => {
  const {
    subjectID
  } = req.query

  const subject = await Subject.findById(subjectID)
    .select('name classes teachers')
    .populate('classes', 'name students') // TODO: get Subjecys
    .populate('teachers', 'name staffID joiningDate')
    .lean()

  res.status(200)
    .json({
      message: 'success',
      subject
    })
}

const all = async (req, res) => {
  const subjects = await Subject.find({ institute: req.user.instituteID })
    .select('name classes teachers').lean()

  res.status(200)
    .json({
      message: 'success',
      subjects
    })
}

module.exports = {
  add: asyncHandler(add),
  get: asyncHandler(get),
  all: asyncHandler(all)
}
