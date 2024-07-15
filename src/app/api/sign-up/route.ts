import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    await dbConnect();

    try {
        let { email, username, password } = await req.json();

        // Check user existence by username
        const userExistByUsername = await UserModel.findOne({ username, isVerified: true });
        if (userExistByUsername) {
            return Response.json({ success: false, message: "Username already exists" });
        }

        // Check user existence by email
        const userExistByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (userExistByEmail) {
            if (userExistByEmail.isVerified) {
                return Response.json({ success: false, message: "Email already exists" });
            } else {
                userExistByEmail.password = await bcrypt.hash(password, 10);
                userExistByEmail.verifyCode = verifyCode;
                userExistByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await userExistByEmail.save();
            }
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            });
            await newUser.save();
        }

        // Debugging information
        
        let emailResponse = await sendVerificationEmail(email, username, verifyCode);
        if (!emailResponse.success) {
            return Response.json({ success: false, message: emailResponse.message });
        }

        return Response.json({ success: true, message: "User registered successfully, please verify your email" });

    } catch (error) {
        return Response.json({ success: false, message: "Failed to handle request" });
    }
}
