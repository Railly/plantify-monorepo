import { Router } from 'express'
import { historyRoutes } from '../apis/history'

const router = Router()

router.get('/', historyRoutes.getAll)
router.get('/:id', historyRoutes.getAll)
router.post('/', historyRoutes.createOne)
router.delete('/:id', historyRoutes.deleteOne)

export default router
