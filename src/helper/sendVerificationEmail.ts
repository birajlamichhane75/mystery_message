import { resend } from "@/lib/resend";
import { EmailTemplate } from "../../components/emailverification";
import { ApiResponse } from "@/type/apiResponse";


export const sendVerificationEmail = async (email:string, username:string, verifyCode:string):Promise<ApiResponse> => {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Email',
            react:EmailTemplate({username,otp:verifyCode}),
          });
          return {success:true, message:"Email verification success"}

    } catch (error) {
        return {success:false, message:"Email verification fail"}
    }
}