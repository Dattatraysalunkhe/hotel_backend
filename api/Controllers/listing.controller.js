import { Listing } from "../models/Listing.model.js"
import { errorHandler } from "../utils/error.js";

const createListing = async (req,res, next) => {

    try {
        
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);

    } catch (error) {
        next(error)
    }
}

const deleteListing = async (req,res,next) => {
    
    const listing = await Listing.findById(req.params.id)        //req.params.id  is means front send(property id) the data in url with (propert id )

    if(!listing){
        return next(errorHandler(404,'Property Not found'))
    }
    if(req.user.id !== listing.userRef){            //here we checking cookie user id == useref id (userid) throught listing
        return next(errorHandler(401,'Only you modified and delete Yours'))
    }

    try {

        await Listing.findByIdAndDelete(req.params.id)

        res.status(200).json('Property Deleted')
        
    } catch (error) {
        next(error)
    }
}

const updateListing = async (req,res,next) => {
      
     const listing = await Listing.findById(req.params.id)

    if(!listing){
        next(errorHandler(404,'Property Not found'))
    }

     if(req.user.id !== listing.userRef){
        return next(errorHandler(401,'UnAuthorised access'))
     }

     try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id,
            req.body,                                                                    //  set everything from coming from body
            {new:true}                                                                   //retrun and res with new value
            ) 
       
            res.status(200).json(updatedListing)

     } catch (error) {
        
     }
}

const getListing = async(req,res,next) => {
       try {

           const listing = await Listing.findById(req.params.id)

           if(!listing){
            return next(errorHandler(404,'Property Not Found'))
           }

           res.status(200).json(listing)
        
       } catch (error) {
          next(error)
       } 
}

const getListings = async (req,res,next) => {
   try {

      const limit = parseInt(req.query.limit) || 15;

      const startIndex =parseInt(req.query.startIndex) || 0;
      
      let offer = req.query.offer;                  // req coming front with query as offer

      if(offer === undefined || offer === 'false'){                    // but we have all thing to show so that why if everthing is none then show true and false property also
        offer = { $in:[true,false]}
      }

      let furnished = req.query.furnished;

      if(furnished === undefined || furnished === 'false'){
        furnished = { $in:[true,false]}
      }

      let parking = req.query.parking;

      if(parking === undefined || parking === 'false'){
        parking= { $in:[true,false] }
      }

      let wifi = req.query.wifi;

      if(wifi === undefined || wifi === 'false'){
        wifi = {$in:[true,false]} 
      }

      let type = req.query.type;

      if(type === undefined || type === 'all'){
        type = {$in:['sale','rent']}                       // beacuse here we saved as rent and sale
      }

      const searchTerm = req.query.searchTerm|| '';

      const sort = req.query.sort || 'createdAt';

      const order =req.query.sort || 'desc';

      const listings = await Listing.find({
          name:{ $regex:searchTerm ,$options:'i' },           //this the first way to serch(in name section is avialbe at db:{ $regex:seatchTeam (this for search word by word)}, $options:'i' this is for dont care about lower and captal word)
          offer,
          furnished,
          wifi,
          parking,
          type,
      }).sort(
        {[sort]:order}
      ).limit(limit).skip(startIndex);

      return res.status(200).json(listings)


    
   } catch (error) {
        next(error)
   }
}

export {createListing, deleteListing, updateListing, getListing,getListings}