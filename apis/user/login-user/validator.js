import { body } from 'express-validator'
import { fieldValidator } from '../../../middlewares/field-validator'

export const loginUserValidator = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  fieldValidator
]
