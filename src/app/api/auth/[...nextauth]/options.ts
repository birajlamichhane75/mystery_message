import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credetials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [{ email: credentials.identifier },
                        { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error("User not found");
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify first")
                    }
                    const isPasswordcorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordcorrect) {
                        return user
                    }

                } catch (error) {
                    throw new Error("error")
                }
            }
        })
    ],
    pages: {
        signIn: '/sign-in',
    },

    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAccepingMessage;
                token.username = user.username;

            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAccepingMessage = token.isAccepingMessage;
                session.user.username = token.username;
            }
            return session;
        }
    },

    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,


}