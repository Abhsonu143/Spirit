import dbConnect from "../../../util/mongo"
import Biryani from "../../../models/Biryani"
export default async function handler(req, res) {
    const {method}=req;
    dbConnect()
    if(method === "GET"){
        try{
            const biryanis=await Biryani.find();
            res.status(200).json(biryanis);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "POST"){
        try{
            const biryani=await Biryani.create(req.body);
            res.status(201).json(biryani);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
