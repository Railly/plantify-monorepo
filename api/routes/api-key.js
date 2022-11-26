import { Router } from 'express'
import { apiKeyRoutes } from '../apis/api-key'

const router = Router()

router.get('/request', ...apiKeyRoutes.request)
router.get('/generate', ...apiKeyRoutes.generate)

export default router
