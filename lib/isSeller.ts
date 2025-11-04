import { prisma } from "./prisma";

export default async function sellerAuth(userId:string){
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    if(user?.role === "SELLER") return true

    return false
}