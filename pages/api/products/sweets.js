import dbConnect from "../../../util/mongo"
import Sweet from "../../../models/Sweet"
export default async function handler(req, res) {
    const {method}=req;
    dbConnect()
    if(method === "GET"){
        try{
            const sweets=await Sweet.find();
            res.status(200).json(sweets);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "POST"){
        try{
            const sweet=await Sweet.create(req.body);
            res.status(201).json(sweet);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
