import dbConnect from "../../../util/mongo"
import Chicken from "../../../models/Chicken"
export default async function handler(req, res) {
    const {method}=req;
    dbConnect()
    if(method === "GET"){
        try{
            const chickens=await Chicken.find();
            res.status(200).json(chickens);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "POST"){
        try{
            const chicken=await Chicken.create(req.body);
            res.status(201).json(chicken);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
