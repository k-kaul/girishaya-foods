import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const allProducts = await prisma.product.findMany(); 
        return NextResponse.json({
            success: true,
            allProducts
        })
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }  
    
}