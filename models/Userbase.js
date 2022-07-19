import mongoose from "mongoose";

const UserbaseSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
    },
        { timestamps: true }
);

export default mongoose.models.Userbase || mongoose.model("Userbase",UserbaseSchema);