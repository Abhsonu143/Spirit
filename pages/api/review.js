import dbConnect from "../../util/mongo";
import Review from "../../models/Review";


const handler=async(req,res)=>{
    const {method}=req;
    await dbConnect();
    if(method==="GET"){
        try{
            const reviews=await Review.find();
            res.status(200).json(reviews);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method==="POST"){
        try{
            const review=await Review.create(req.body);
            res.status(201).json(review);
        }catch(err){
            res.status(500).json(err);
        }
    }
}

export default handler;