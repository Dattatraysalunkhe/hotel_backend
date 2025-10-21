import express from 'express'
import { deleteUser, getUserListings, test, updateUser } from '../Controllers/user.controller.js'; 
import { verifyToken } from '../utils/verify.User.js';

const router = express.Router();

// router.get('/test', (req,res) => {
//     res.send('user')
// })

router.route('/test').get(test)
router.route('/update/:id').post(verifyToken,updateUser)
router.route('/delete/:id').delete(verifyToken,deleteUser)
router.route('/listings/:id').get(verifyToken,getUserListings)

export default router