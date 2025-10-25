import rateLimit from "express-rate-limit"


const CheckRateLimit = rateLimit({
    windowMs: 30 * 60 * 1000,  // 15 minutes
    // max:10,
    max: 40,
    message: "Too many requests, please try again later.",
    skip: (req, res) => {
    // Skip rate limiting for OPTIONS requests (CORS preflight)
    return req.method === "OPTIONS";
  },
})


export { CheckRateLimit }