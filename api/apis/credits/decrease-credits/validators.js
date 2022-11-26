import { authToken } from '../../../middlewares/auth-token'
import { fieldValidator } from '../../../middlewares/field-validator'

export const decreaseCreditsValidator = [
  authToken,
  fieldValidator
]
