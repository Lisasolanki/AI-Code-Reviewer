const mongoose=require("mongoose");
const connectDB=async()=>{
    console.log("Connecting to MongoDB...");
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB CONNECTED");
    }catch(err){
        console.error(err);
        process.exit(1);
    }
};
module.exports=connectDB;