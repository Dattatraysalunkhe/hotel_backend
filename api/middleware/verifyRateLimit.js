import rateLimit from "express-rate-limit"


const CheckRateLimit = rateLimit({
    windowMs: 30 * 60 * 1000,  // 15 minutes
    // max:10,
    max: 500,
    message: "Too many requests, please try again later."
})


export { CheckRateLimit }