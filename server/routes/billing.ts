import { Router } from 'express'
import { requireLogin } from '../middleware/requireLogin'
import * as controller from '../controllers/billing'

const router = Router()

router.get(
    '/purchase',
    controller.validateCheckoutPurchase
)

export default router
