import dbConnect from "../../../util/mongo";
import Userbase from "../../../models/Userbase";

const handler=async(req,res)=>{
    const {method}=req;
    const {username}=req.body;
    dbConnect();
    if(method==="POST"){
        try{
            const user=await Userbase.find({username:username});
            res.status(200).json(user[0]);
        }catch(err){
            console.log("This is an error");
            res.status(500).json(err);
        }
    }
}
export default handler;