import { Router } from 'express'
import { apiKeys } from '../apis/api-key'
// import { body } from 'express-validator'

const router = Router()

router.get('/generate', ...apiKeys.generate)

export default router
