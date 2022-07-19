import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
import Chocolate from "../../../models/Chocolate";
import Pizza from "../../../models/Pizza";
import Biryani from "../../../models/Biryani";
import Burger from "../../../models/Burger";
import Cake from "../../../models/Cake";
import Juice from "../../../models/Juice";
import Sweet from "../../../models/Sweet";
import Chicken from "../../../models/Chicken";

export default async function handler(req, res) {
    const {method,query:{id},
    cookies
    }=req;
    const token=cookies.token;
    dbConnect();
    if(method === "GET"){
        try{
            let i=0;
            let product;
            while(i<9){
                if(i==0)
                    product=await Product.findById(id);
                else if(i==1)
                    product=await Chocolate.findById(id);
                else if(i==2)
                    product=await Pizza.findById(id);
                else if(i==3)
                    product=await Biryani.findById(id);
                else if(i==4)
                    product=await Burger.findById(id);
                else if(i==5)
                    product=await Cake.findById(id);
                else if(i==6)
                    product=await Juice.findById(id);
                else if(i==7)
                    product=await Sweet.findById(id);
                else if(i==8)
                    product=await Chicken.findById(id);
                if(product!=null)
                    break;
                i=i+1;
            }
            res.status(200).json(product);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "PUT"){
        if(!token || token !==process.env.token){
            return res.status(401).json("Not authenticated!!!");
        }
        try{
            const product=await Product.findByIdAndUpdate(id,req.body,{
                new:true,
            });
            res.status(200).json(product);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "DELETE"){
        if(!token || token !==process.env.token){
            return res.status(401).json("Not authenticated!!!");
        }
        try{
            await Product.findByIdAndDelete(id);
            res.status(200).json("The product has been deleted!");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
