import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { userNameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const usernameQuerySchema = z.object({
    username: userNameValidation,
} )

export async function GET(req:Request){
    await dbConnect();

    try {
        let {searchParams} = new URL(req.url);
        // console.log(searchParams)
        const queryParams = {
            username:searchParams.get('username')
        }

        
        const result = usernameQuerySchema.safeParse(queryParams);
        // console.log(result);
        
        if(!result.success){
            return Response.json({success:false,message:"Invalid Username"})
        }
        const {username} = result.data;
        let existingUser = await UserModel.findOne({username,isVerified:true})

        try {
            if(existingUser){
                return Response.json({success:false,message:"Username already exist"},{status:400})
            }
            return Response.json({success:true, message:"Username is unique"})
        } catch (error) {
            console.log(error);
            
        }
        
        
    } catch (error) {
        return Response.json({success:false, message:"Error checking username",error})
    }

    




}