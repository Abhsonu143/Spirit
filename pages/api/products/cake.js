import dbConnect from "../../../util/mongo"
import Cake from "../../../models/Cake"
export default async function handler(req, res) {
    const {method}=req;
    dbConnect()
    if(method === "GET"){
        try{
            const cakes=await Cake.find();
            res.status(200).json(cakes);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "POST"){
        try{
            const cake=await Cake.create(req.body);
            res.status(201).json(cake);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
