import { Listing } from "../models/Listing.model.js"
import { User } from "../models/User.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'



 const test = (req,res) => {
    res.send('test')
}

const updateUser = async (req,res,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(430,'You can only Your Account'))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)

        }

        const updateUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set:{
                    username :req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    avatar:req.body.avatar
                }
            },
            {
                new:true             // new beacuse we dont want previous value
            }
            )

            const {password, ...rest} = updateUser._doc

            res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req,res,next) => {
    
    if(req.user.id !== req.params.id){
      return next(errorHandler(401,"Delete Your own Account"))
    }

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('User has been Deleted');
    } catch (error) {
        next(error)
    }
}

const getUserListings = async (req,res,next) => {

    if(req.user.id === req.params.id){
        
      try {
        const listings = await Listing.find({userRef: req.params.id})

        res.status(200).json(listings)

      } catch (error) {
        
      }


    }else{
        return next(errorHandler(401,"you can only view your Listings"))
    }

}

export {test , updateUser,deleteUser, getUserListings}