import { Router } from 'express'
import { validateBody } from '../middleware/validateBody'
import {
    startPhoneLoginValidation,
    confirmPhoneLoginValidation,
    startEmailLoginValidation,
    confirmEmailLoginValiation
} from '../validation/session'
import * as controller from '../controllers/session'

const router = Router()

router.get(
    '/session',
    controller.getSession
)

router.post(
    '/session/phone/start',
    validateBody(startPhoneLoginValidation),
    controller.startPhoneLogin
)

router.post(
    '/session/phone/confirm',
    validateBody(confirmPhoneLoginValidation),
    controller.confirmPhoneLogin
)

router.post(
    '/session/email/start',
    validateBody(startEmailLoginValidation),
    controller.startEmailLogin
)

router.post(
    '/session/email/confirm',
    validateBody(confirmEmailLoginValiation),
    controller.confirmEmailLogin
)

export default router
