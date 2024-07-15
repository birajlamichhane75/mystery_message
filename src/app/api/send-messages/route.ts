import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/models/User";

export async function POST(req: Request) {
    await dbConnect();

    const { username, content } = await req.json();
    try {
        let user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json({ success: false, message: "User Not found" }, { status: 404 });
        }

        if (!user.isAcceptingMessage) {
            return Response.json({ success: false, message: "User is not accepting messages right now" });
        }

        const newMessage = {content,createdAt:new Date()}

        user.message.push(newMessage as Message);
        await user.save()

        return Response.json({ success: true, message: "Message sent successfully" }, { status: 200 });

    } catch (error) {
        return Response.json({ success: false, message: "Error in finding user" }, { status: 500 });
    }
}