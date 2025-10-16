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
                                // <div>
                                //     <h1>{product.name}</h1>
                                //     <h2>{product.price}</h2>
                                //     <h2>{product.itemWeight}</h2>
                                // </div>
                                <ProductCard 
                                    productName={product.name} 
                                    weight={product.itemWeight}
                                    price={product.price}
                                />

                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}