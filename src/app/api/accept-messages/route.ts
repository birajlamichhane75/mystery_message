import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(req: Request) {
    await dbConnect();

    let session = await getServerSession(authOptions);
    let user = session?.user;

    if (!user) {
        return Response.json({ success: false, message: "Not Authenticated" })
    }

    const userid = user._id;
    const { acceptMessage } = await req.json();

    try {
        let updatedUser = await UserModel.findByIdAndUpdate(
            userid,
            { isAcceptingMessage: acceptMessage },
            { new: true }
        )

        if (!updatedUser) {
            return Response.json({ success: false, message: "Fail to update user status to acceptmessage" })
        }

        return Response.json({ success: true, message: "Message Acceptance status updated successfully" })



    } catch (error) {
        return Response.json({ success: false, message: "Error in finding updated user" })
    }

}

export async function GET(req: Request) {
    await dbConnect();

    let session = await getServerSession(authOptions);
    let user = session?.user;

    if (!user) {
        return Response.json({ success: false, message: "Not Authenticated" })
    }
    
    const userid = user._id;

    try {
        const foundUser = await UserModel.findById(userid);
        if (!foundUser) {
            return Response.json({ success: false, message: "User not found" })
        }


        return Response.json({ success: true, isacceptingMessages: foundUser.isAcceptingMessage })

    } catch (error) {
        return Response.json({ success: false, message: "Error in getting message accepting status" })
    }


}