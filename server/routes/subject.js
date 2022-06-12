const express = require('express')
const { body, check } = require('express-validator')

const controllers = require('../controllers/subject')
const Subject = require('../models/Subject')

const validateExpress = require('../helpers/validateExpress')
const isAuth = require('../helpers/isAuth')

const router = express.Router()

router.post('/', isAuth, [
  body('name').notEmpty().isLength({ min: 1 }).withMessage('Name not found.')
], validateExpress, controllers.add)

router.get('/', isAuth, [
  check('subjectID').notEmpty().withMessage('Please enter a valid Subject ID!')
    .custom(value => {
      return Subject.exists({ _id: value })
        .then(isPresent => {
          // eslint-disable-next-line prefer-promise-reject-errors
          if (!isPresent) return Promise.reject('Subject not found!')
          else return true
        })
    })
], validateExpress, controllers.get)

router.get('/all', isAuth, controllers.all)

module.exports = router
