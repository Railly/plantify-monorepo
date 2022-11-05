import express from 'express'
import userRouter from './user'
import apiKeyRouter from './api-key'

const router = express.Router()

router.use('/users', userRouter)
router.use('/key', apiKeyRouter)

export default router
