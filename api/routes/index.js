import express from 'express'
import userRouter from './user'
import apiKeyRouter from './api-key'
import creditRouter from './credits'

const router = express.Router()

router.use('/users', userRouter)
router.use('/key', apiKeyRouter)
router.use('/credits', creditRouter)

export default router
