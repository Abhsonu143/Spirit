import dbConnect from "../../../util/mongo";
import Userbase from "../../../models/Userbase";

const handler=async(req,res)=>{
    const {method}=req;
    const {username,email,phone}=req.body;
    dbConnect();
    if(method==="POST"){
        try{
            const user=await Userbase.find({$or:[{username:username},{email:email},{phone:phone}]});
            res.status(200).json(user[0]);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
export default handler;