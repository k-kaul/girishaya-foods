import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export async function GET(){
    const userId = await currentUser();
    
    try {
        const user_id = userId?.id;

        const user = await prisma.user.findFirst({
            where: {
                id:user_id
            }
        })

        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found in db"
            })
        }
      
        return NextResponse.json({
            success:true,
            user
        })

    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message: error.message
        })
    }    
}