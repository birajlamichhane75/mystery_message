import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { userNameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

export async function POST(req: Request) {
    await dbConnect();

    const { username, otp } = await req.json();

    try {
        let user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json({ success: false, message: "User not found" })
        }

        const isCodeCorrect = user.verifyCode == otp;
        const isCodeNotExpire = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeCorrect && isCodeNotExpire) {
            user.isVerified = true;
            await user.save();
            return Response.json({ success: true, message: "Verification Completed Successfully" })
        }

        else if(!isCodeCorrect){
            return Response.json({ success: false, message: "Incorrect Code" })
        }
        else if(!isCodeNotExpire){
            return Response.json({ success: false, message: "Code already expire" })
        }
        


    } catch (error) {
        return Response.json({success:false,message:"error in verifiying",error})

    }





}