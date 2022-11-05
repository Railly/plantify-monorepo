import { registerUser } from './register-user/controller'
import { registerUserValidator } from './register-user/validator'
import { loginUser } from './login-user/controller'
import { loginUserValidator } from './login-user/validator'
import { getUsers } from './get-users/controller'

export const userRoutes = {
  getAll: [getUsers],
  login: [loginUserValidator, loginUser],
  register: [registerUserValidator, registerUser]
}
