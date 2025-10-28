import { prisma } from "./prisma";

export default async function getAllProducts(){
    const allProducts = await prisma.product.findMany();

    if(!allProducts) throw new Error('Error in fetching all products');

    return allProducts
}