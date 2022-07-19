import mongoose from "mongoose";

const FeaturedSchema =new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:60,
        },
        img:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
            maxLength:300,
        },
        rating:{
            type: Number,
            required:true,
        },
        like:{
            type: Number,
            default:0,
        },
    },
    {timeStamps:true}
);

export default mongoose.models.Featured || mongoose.model("Featured",FeaturedSchema);