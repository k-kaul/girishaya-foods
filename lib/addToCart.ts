import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

interface Product {
    productName:string,
    weight:string,
    price:number,
    productId: string,
}

export default async function addToCart({
    product
}: {
    product: Product;
}){
    const {isAuthenticated, userId} = await auth()

    if(!isAuthenticated) return redirect("/sign-in");

    if(product){
        await prisma.cartItems.create({
            data: {
                productId: product.productId,
                userId,
                productName:product.productName,
                quantity: String({increment:1})
            }
        })

        return {
            message: "added item to cart"
        }
    }
}