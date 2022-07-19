import mongoose from "mongoose";

const GalleryImageSchema =new mongoose.Schema(
    {
        img:{
            type:String,
            required:true,
        },
    },
    {timeStamps:true}
);

export default mongoose.models.GalleryImage || mongoose.model("GalleryImage",GalleryImageSchema);