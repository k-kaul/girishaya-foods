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
        throw new Error('user not a seller')
    }
}