import { User } from '../models/User.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
const signup = async (req, res,next) => {
     const { username, email, password } = req.body;
     const hashedPassword = bcryptjs.hashSync(password, 10)

    
     const newUser = new User({
          username,
          email,
          password: hashedPassword,
     });

     try {
          await newUser.save()
          res.status(200).json('register succefully')
     } catch (error) {
          next(error)
     }


}

const signin = async (req,res,next) => {
      
     const {email,password} =req.body
     try {

          const validUser = await User.findOne(
               {
                    email
               }
          )

          if(!validUser){
               return next(errorHandler(404,'User not Found'));
          }

          const validPassword =bcryptjs.compareSync(password,validUser.password)

          if(!validPassword){
               return next(errorHandler(401,'Wrong credential?'))
          }

          const token = jwt.sign( {id:validUser._id}, process.env.JWT_SECRET)

        const loginUser = await User.findById(validUser._id).select("-password")
          
          res.cookie('access_token',token,{
               httpOnly:true,
               secure:false,
               sameSite: 'lax', // or 'none' if using cross-site cookies
               // sameSite: 'none' // ✅ allows cross-origin cookies
          })
          .status(200)
          .json(loginUser)

          
     } catch (error) {
          next(error);
     }
}

const signout = async (req,res,next) => {
         try {
            res.clearCookie('access_token')
            res.status(200).json('User Looged Out');
         } catch (error) {
             next(error)
         }
}

export { signup, signin, signout }