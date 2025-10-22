import express from 'express'
import { signin, signout, signup } from '../Controllers/auth.controller.js'
import { checkApikey } from '../middleware/verifyApikey.js'
import { CheckRateLimit } from '../middleware/verifyRateLimit.js'


const router =express.Router()

router.route('/signup').post(checkApikey,CheckRateLimit,signup)
router.route('/signin').post(checkApikey,CheckRateLimit,signin)
router.route('/signout').get(checkApikey,CheckRateLimit,signout)

export default router