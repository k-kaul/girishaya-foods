import sellerAuth from "@/lib/isSeller";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const {userId} = getAuth(req);
        
        if(!userId) return

        const isSeller = await sellerAuth(userId);
        
        if(isSeller){
            const allProducts = await prisma.product.findMany(); 
            return NextResponse.json({
                success: true,
                allProducts
            })
        }

        return NextResponse.json({
            success: false,
            message: "Not Authorized"
        })
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }  
    
}