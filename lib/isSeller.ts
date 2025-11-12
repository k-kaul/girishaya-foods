import { NextResponse } from "next/server";
import { prisma } from "./prisma";

export default async function sellerAuth(userId:string){
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if(user?.role === "SELLER") return true

        return false
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Not a seller account"
        })
    }
}