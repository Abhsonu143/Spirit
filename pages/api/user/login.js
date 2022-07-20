import cookie from "cookie";
import axios from "axios";

const handler=async(req,res)=>{
    if(req.method === "POST"){
        const {username,password}=req.body;
        const userRes=await axios.post("https://spirit-one.vercel.app/api/user",{username});
        try{
            var data;
            if(!userRes.data.length || userRes.data[0].password!==password)
                data=json("0");
            else
                data=json(userRes.data[0]);
            res.status(200).data;
        }
        catch(err){
            res.status(500).json(err);
        }
    
    }
};

export default handler;
