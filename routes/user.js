import { Router } from 'express'
import { userRoutes } from '../apis/user'

const router = Router()

router.post('/register', ...userRoutes.register)
router.post('/login', ...userRoutes.login)

export default router
