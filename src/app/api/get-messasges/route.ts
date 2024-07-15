import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(req: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    let user = session?.user;

    if (!user) {
        return Response.json({ success: false, message: "User not found" })
    }

    try {
        const userid = new mongoose.Types.ObjectId(user._id);
        console.log("This is useridksdjlsd",userid);
        
        // const userMessages = await UserModel.aggregate([
        //     { $match: { id: userid } },
        //     { $unwind: '$messages' },
        //     { $sort: { 'messages.createdAt': -1 } },
        //     { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        // ])
        const userMessages = await UserModel.findOne({username:user.username, _id:user._id});

        if(!userMessages){
            return Response.json({success:false,message:"Error in finding user"})
        }

        return Response.json({success:true,message:userMessages.message})
    } catch (error) {
        return Response.json({success:false,message:"Error in finding user"})
    }
}