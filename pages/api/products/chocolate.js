import dbConnect from "../../../util/mongo"
import Chocolate from "../../../models/Chocolate"
export default async function handler(req, res) {
    const {method}=req;
    dbConnect()
    if(method === "GET"){
        try{
            const chocolates=await Chocolate.find();
            res.status(200).json(chocolates);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "POST"){
        try{
            const chocolate=await Chocolate.create(req.body);
            res.status(201).json(chocolate);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
