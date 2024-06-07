import { Router } from 'express'
import session from './session'
import user from './users'
import search from './search'
import billing from './billing'

const router = Router()

router.use(session)
router.use(user)
router.use(search)
router.use(billing)

export default router
