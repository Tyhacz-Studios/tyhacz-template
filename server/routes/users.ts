import { Router } from 'express'
import { validateBody } from '../middleware/validateBody'
import {
    createUserValidation
} from '../validation/user'
import { requireLogin } from '../middleware/requireLogin'
import * as controller from '../controllers/user'

const router = Router()

router.post(
    '/user',
    requireLogin(),
    validateBody(createUserValidation),
    controller.createUser
)

router.get(
    '/user',
    requireLogin(),
    controller.getUsers
)

export default router
