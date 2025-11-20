import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export async function GET(){
    const user = await currentUser();
    
    try {
        const user_id = user?.id;
        const defaultNum = 1234567890;

        const currentUser = await prisma.user.findFirst({
            where: {
                id:user_id
            }
        })

        if(!currentUser){
            await prisma.user.create({
                data: {
                    name: user?.fullName || '',
                    email:user?.emailAddresses[0].emailAddress || '',
                    phoneNumber:user?.phoneNumbers[0].phoneNumber || '',
                    role: 'CUSTOMER'
                }
            })
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