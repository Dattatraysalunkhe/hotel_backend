import express from 'express'
import { createListing, deleteListing, getListing, getListings, updateListing } from '../Controllers/listing.controller.js'
import { verifyToken } from '../utils/verify.User.js'

const router = express.Router()

router.route('/create').post(verifyToken,createListing)
router.route('/delete/:id').delete(verifyToken,deleteListing)
router.route('/update/:id').post(verifyToken,updateListing)
router.route('/get/:id').get(getListing)
router.route('/get').get(getListings)

export default router