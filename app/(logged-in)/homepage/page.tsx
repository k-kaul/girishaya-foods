import { ProductCard } from "@/components/ui/card";
import getProducts from "@/lib/getProducts";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export default async function HomePage(){
    
    const {isAuthenticated} = await auth();

    if (!isAuthenticated) return redirect('/sign-in');

    const products = await getProducts();
    
    return (
        <div>
            <div>
                <h1>List of Products</h1>
                <div>
                    <div>
                        {
                            products.map((product)=>(
                                <ProductCard 
                                    productId={product.id}
                                />

                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}