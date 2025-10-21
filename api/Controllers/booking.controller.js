import { Booking } from "../models/Booking.model.js"
import { errorHandler } from "../utils/error.js"


const create = async(req,res,next) => {

    const booking = await Booking.create(req.body)
     return res.status(200).json(booking)

}

const getbooking = async(req,res,next) => {

    const user = await Booking.find({userref : req.user.id})

    if(!user){
        return next(errorHandler(401,'You acn see only your Bookings'))
    }

   return res.status(200).json(user)

}

export {create, getbooking}