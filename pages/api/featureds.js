import dbConnect from "../../util/mongo";
import Featured from "../../models/Featured";

const handler=async(req,res)=>{
    const {method}=req;
    await dbConnect();
    if(method==="GET"){
        try{
            const featureds=await Featured.find();
            res.status(200).json(featureds);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method==="POST"){
        try{
            const featured=await Featured.create(req.body);
            res.status(201).json(featured);
        }catch(err){
            res.status(500).json(err);
        }
    }
}

export default handler;