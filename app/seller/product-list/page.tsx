'use client'

import { useAuth } from "@clerk/nextjs";
import axios from "axios"
import Image from "next/image";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

interface Product {
  id: string,
  name: string,
  itemQuantity: number,
  itemWeight: string,
  price: number,
  images: string
}

export default function ProductListings(){
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading,setLoading] = useState(true);
    
    const { getToken, userId } = useAuth();

    const fetchProducts = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/product/seller-list',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if(data.success){
                setAllProducts(data.allProducts || []);
                setLoading(false);
            } else {
                setLoading(false)
            }            
        } catch (error:any) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        if(userId){
            fetchProducts();
        }
    }, [userId])

    return (
        <div>
            <h1>Product listing</h1>
            <div>
                {
                    allProducts.map((product, index)=> (
                        <div key={index}>
                            <div>
                                {product.name}
                            </div>
                            <div>
                                {product.price}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}