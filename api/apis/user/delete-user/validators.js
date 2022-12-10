import { authToken } from '../../../middlewares/auth-token'

export const deleteUserValidator = [
  authToken
]
