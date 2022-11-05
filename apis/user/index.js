import { registerUser } from './register-user/controller'
import { registerUserValidator } from './register-user/validator'
import { loginUser } from './login-user/controller'
import { loginUserValidator } from './login-user/validator'

export const userRoutes = {
  register: [registerUserValidator, registerUser],
  login: [loginUserValidator, loginUser]
}
