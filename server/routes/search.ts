import { Router } from 'express'
import { validateBody } from '../middleware/validateBody'
import {
    createSearchValidation
} from '../validation/search'
import { requireLogin } from '../middleware/requireLogin'
import * as controller from '../controllers/search'

const router = Router()

router.post(
    '/search',
    requireLogin(),
    validateBody(createSearchValidation),
    controller.createSearch
)

router.get(
    '/search',
    requireLogin(),
    controller.getSearches
)

router.get(
    '/search/:searchId',
    requireLogin(),
    controller.getOneSearch
)

router.delete(
    '/search/:searchId',
    requireLogin(),
    controller.deleteSearch
)

export default router
