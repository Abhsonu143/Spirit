import dbConnect from "../../../util/mongo"
import Burger from "../../../models/Burger"
export default async function handler(req, res) {
    const {method}=req;
    dbConnect()
    if(method === "GET"){
        try{
            const burgers=await Burger.find();
            res.status(200).json(burgers);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "POST"){
        try{
            const burger=await Burger.create(req.body);
            res.status(201).json(burger);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
