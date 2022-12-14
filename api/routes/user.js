import { Router } from 'express'
import { userRoutes } from '../apis/user'

const router = Router()

router.get('/', ...userRoutes.getAll)
router.post('/login', ...userRoutes.login)
router.post('/register', ...userRoutes.register)
router.delete('/:id', ...userRoutes.delete)

export default router
