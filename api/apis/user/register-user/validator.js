import { body } from 'express-validator'
import { fieldValidator } from '../../../middlewares/field-validator'
import { uniqueEmail, uniqueUsername } from '../../../helpers/db-validators'

export const registerUserValidator = [
  body('username')
    .matches(/^[a-zA-Z0-9_]{3,16}$/)
    .withMessage(
      'Username must be 3-16 characters long and can only contain letters, numbers and underscores'
    ),
  body('email').isEmail().withMessage('Email is not valid'),
  body('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    .withMessage(
      'Password must contain at least 8 characters, one uppercase, one lowercase and one number'
    ),
  body('firstName')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long'),
  body('lastName')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long'),
  body('username').custom(uniqueUsername),
  body('email').custom(uniqueEmail),
  fieldValidator
]
