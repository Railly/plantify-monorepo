import { Router } from 'express'
import { creditRoutes } from '../apis/credits'

const router = Router()

router.patch('/decrease', ...creditRoutes.decrease)

export default router
