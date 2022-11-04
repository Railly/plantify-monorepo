import express from 'express'
// import usersRouter from './users'
import apiKeyRouter from './api-key'
const router = express.Router()

// router.use('/users', usersRouter)
router.use('/key', apiKeyRouter)

export default router
