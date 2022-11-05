import { Router } from 'express'
// import { body } from 'express-validator'

const router = Router()

router.get('/generate', (req, res) => {
  res.json({
    API_KEY: 'yyqb8eKoLEfNqB0YfcJp8gC9eBMcdufRzGxGCS0GwydGES0cYy',
    message: 'API Key generated successfully',
    status: 200
  })
})

export default router
