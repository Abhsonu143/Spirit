import dbConnect from "../../util/mongo";
import GalleryImage from "../../models/GalleryImage";

const handler=async(req,res)=>{
    const {method}=req;
    await dbConnect();
    if(method==="GET"){
        try{
            const images=await GalleryImage.find();
            res.status(200).json(images);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method==="POST"){
        try{
            const image=await GalleryImage.create(req.body);
            res.status(201).json(image);
        }catch(err){
            res.status(500).json(err);
        }
    }
}

export default handler;