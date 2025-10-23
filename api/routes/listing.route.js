import express from 'express'
import { createListing, deleteListing, fileupload, getListing, getListings, updateListing } from '../Controllers/listing.controller.js'
import { verifyToken } from '../utils/verify.User.js'
import { checkApikey } from '../middleware/verifyApikey.js'
import { CheckRateLimit } from '../middleware/verifyRateLimit.js'
import { upload } from '../middleware/multer.middleware.js'

const router = express.Router()

router.route('/fileupload').post(checkApikey,CheckRateLimit,verifyToken,upload.single('file'),fileupload)
router.route('/create').post(checkApikey,CheckRateLimit,verifyToken,createListing)
router.route('/delete/:id').delete(checkApikey,CheckRateLimit,verifyToken,deleteListing)
router.route('/update/:id').post(checkApikey,CheckRateLimit,verifyToken,updateListing)
router.route('/get/:id').get(checkApikey,CheckRateLimit,getListing)
router.route('/get').get(checkApikey,CheckRateLimit,getListings)

export default router