import express from 'express'
import mongoose from 'mongoose'
import { DB_NAME } from './constant.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config();

mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`).then(() => {
    console.log("Monogodb connected");
}).catch((error) => {
    console.log("Mongodb connection failed", error)
})

const __dirname = path.resolve();

const app = express()

const port = 3000

app.use(express.json())   // where we can req.body somthing rquesting in json format he never giving problem

app.use(cookieParser())



app.listen(port, () => {
    console.log(`port isliting on ${port}`)
})

import userRouter from './routes/user.route.js'

app.use("/api/user", userRouter)

import authRouter from './routes/auth.route.js'

app.use("/api/auth", authRouter)

import listingRouter from './routes/listing.route.js'

app.use('/api/listing', listingRouter)

import bookingrouter from './routes/booking.route.js'

app.use('/api/booking', bookingrouter)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Servar Error';
    return res
        .status(statusCode)
        .json({
            success: false,
            message,
            statusCode,

        });
})