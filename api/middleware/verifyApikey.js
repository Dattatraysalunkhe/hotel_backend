
const checkApikey = (req,res,next) => {

    const ApiKey = req.headers['x-api-key']


    if(!ApiKey){
        return res
        .status(401)
        .json(
            "message = api key missing" ,
        )
    }


    if(ApiKey === process.env.X_API_Key){
        next()
    }else{
        return res
        .status(401)
        .json(    
                "Forbidden: Invalid API Key",
                "unAuthroised apikey"
        )
    }

}

export {checkApikey}

