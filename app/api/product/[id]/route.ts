import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req:NextRequest, {params}: {params:any}){
    const id = await params.id;
    const productData = await prisma.product.findFirst({
        where: {
            id
        }
    });

    return NextResponse.json({
        success: true,
        productData
    })
}