import mongoose from 'mongoose'

export async function connectionDB(){
    try{
        await mongoose.connect(process.env.connectionString!)
        console.log("Mongodb connection established..");
        
    }
    catch(err){
        console.log("Connection err",err);
        
    }
}