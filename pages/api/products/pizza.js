import dbConnect from "../../../util/mongo"
import Pizza from "../../../models/Pizza"
export default async function handler(req, res) {
    const {method}=req;
    dbConnect()
    if(method === "GET"){
        try{
            const pizzas=await Pizza.find();
            res.status(200).json(pizzas);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "POST"){
        try{
            const pizza=await Pizza.create(req.body);
            res.status(201).json(pizza);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
