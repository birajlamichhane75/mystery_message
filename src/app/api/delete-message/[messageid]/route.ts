import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function DELETE(req: Request, { params }: { params: { messageid: string } }) {
    
    let messageid = params.messageid;

    await dbConnect();


    const session = await getServerSession(authOptions);
    let user = session?.user;

    if (!user) {
        return Response.json({ success: false, message: "User not found" })
    }
    try {
        
        const result = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { message: {_id:messageid }} }
        )
        if (result.modifiedCount == 0) {
            return Response.json({ success: false, message: "Failed deleting message" })
        }
        return Response.json({ success: true, message: "Message Deleted Successfully" })


    } catch (error) {
        return Response.json({ success: false, message: "Error in deleting messages" })

    }


}