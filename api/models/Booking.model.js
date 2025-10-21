import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      guest: {
         type: Number,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      hotelId: {
         type: String,
         required: true,
      },
      userref: {
         type: String,
         required: true,
      },
      dateForm: {
         type: String,
         required: true,
      },
      dateTo: {
         type: String,
         required: true,
      },
      price:{
         type: String,
         required: true,
      }
   },
   {
      timestamps: true
   }
)

export const Booking = mongoose.model('Booking',BookingSchema)