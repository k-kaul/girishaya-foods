import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export default async function addToCart({
    productId,
}: {
    productId: string;
}){
    const {isAuthenticated, userId} = await auth()

    if(!isAuthenticated) return redirect("/sign-in");

    if(productId){
        await prisma.cartItems.create({
            data: {
                productId,
                userId,
                quantity: String({increment:1})
            }
        })

        return {
            message: "added item to cart"
        }
    }
}