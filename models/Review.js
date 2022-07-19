import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true,
            maxlength:10,
        },
        email:{
            type:String,
            required:true,
            maxlength:30,
        },
        message:{
            type:String,
            required:true,
        },
    },
        { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review",ReviewSchema);