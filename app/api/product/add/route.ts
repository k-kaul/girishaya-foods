import sellerAuth from "@/lib/isSeller";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const { userId } = getAuth(req);
        if(!userId) throw new Error("No userId provided")
        //check if the user is a seller
        const isSeller = await sellerAuth(userId);

        if(!isSeller){
            return NextResponse.json({ success:false, message: "Not Authorized" })
        }

        const { name, itemQuantity, itemWeight, price, images } = await req.json();
        
        if(!images || images.length === 0){
            return NextResponse.json({ success:false, message: "No files uploaded" })
        }

        if (!name || !price || !itemQuantity) {
            return NextResponse.json({ success: false, message: "Missing fields" })
        }
        
        //writing to db

        await prisma.product.create({
            data: {
                name,
                itemQuantity: Number(itemQuantity),
                itemWeight,
                price: Number(price),
                images
            }
        })

        return NextResponse.json({
            success: true,
            message: "Product Listing Added"
        })

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: error.message || "Product listing failed",

        })
    }       
}