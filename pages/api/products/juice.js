import dbConnect from "../../../util/mongo"
import Juice from "../../../models/Juice"
export default async function handler(req, res) {
    const {method}=req;
    dbConnect()
    if(method === "GET"){
        try{
            const juices=await Juice.find();
            res.status(200).json(juices);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "POST"){
        try{
            const juice=await Juice.create(req.body);
            res.status(201).json(juice);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
