import express from 'express'
import { deleteUser, getUserListings, test, updateUser } from '../Controllers/user.controller.js'; 
import { verifyToken } from '../utils/verify.User.js';
import { checkApikey } from '../middleware/verifyApikey.js';
import { CheckRateLimit } from '../middleware/verifyRateLimit.js';

const router = express.Router();

// router.get('/test', (req,res) => {
//     res.send('user')
// })

router.route('/test').get(test)
router.route('/update/:id').post(checkApikey,CheckRateLimit,verifyToken,updateUser)
router.route('/delete/:id').delete(checkApikey,CheckRateLimit,verifyToken,deleteUser)
router.route('/listings/:id').get(checkApikey,CheckRateLimit,verifyToken,getUserListings)

export default router