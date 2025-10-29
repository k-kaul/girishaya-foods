import { ProductCard } from "@/components/ui/card";
import getAllProducts from "@/lib/getAllProducts";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage(){    
    const user = await currentUser();
    if (!user) return redirect('/sign-in');

    const allProducts = await getAllProducts();

    return (
        <div>
            <div>
                <h1>List of Products</h1>
                <div>
                    <div>
                        {
                            allProducts.map((product:any)=>(
                                <ProductCard
                                    key={Math.random()}
                                    productId={product.id}
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