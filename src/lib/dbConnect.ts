import mongoose from "mongoose";

type ConncectionObj = {
    isConnected?:boolean
}

const Connection : ConncectionObj = {}

let dbConnect = async():Promise<void>=>{
    if(Connection.isConnected){
        console.log("Database connected successufully");
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '');
        Connection.isConnected = true
    }
    catch(error){
        process.exit(1);
    }
}

export default dbConnect;