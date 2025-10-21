import express from 'express'
import { verifyToken } from '../utils/verify.User.js'
import { create, getbooking } from '../Controllers/booking.controller.js'


const router = express.Router()

router.route('/create').post(verifyToken,create)
router.route('/booking').get(verifyToken,getbooking)

export default router
