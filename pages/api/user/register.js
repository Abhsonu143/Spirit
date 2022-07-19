import dbConnect from "../../../util/mongo";
import Userbase from "../../../models/Userbase";

const handler=async(req,res)=>{
    const {method}=req;
    dbConnect();
    if(method==="POST"){
        try{
            const user=await Userbase.create(req.body);
            res.status(201).json(user);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method==="PUT"){
        const {id,encryptedpassword}=req.body;
        try{
            const user=await Userbase.findByIdAndUpdate({_id:id},{password:encryptedpassword},{new:true});
            res.status(201).json(user);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
export default handler;