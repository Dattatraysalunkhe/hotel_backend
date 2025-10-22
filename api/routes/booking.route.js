import express from 'express'
import { verifyToken } from '../utils/verify.User.js'
import { create, getbooking } from '../Controllers/booking.controller.js'
import { checkApikey } from '../middleware/verifyApikey.js'
import { CheckRateLimit } from '../middleware/verifyRateLimit.js'


const router = express.Router()

router.route('/create').post(checkApikey,CheckRateLimit,verifyToken,create)
router.route('/booking').get(checkApikey,CheckRateLimit,verifyToken,getbooking)

export default router
