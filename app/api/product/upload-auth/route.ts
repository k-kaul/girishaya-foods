import { currentUser } from "@clerk/nextjs/server"
import { getUploadAuthParams } from "@imagekit/next/server"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser();

        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not signed in"
            })
        }

        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
            // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
            // token: "random-token", // Optional, a unique token for request
        })

        return Response.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
    } catch (error:any) {
        console.log(error.message)
        return Response.json({
            messsage: error.message
        })
    }
}