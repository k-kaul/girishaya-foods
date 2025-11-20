'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type Product = {
    id: string,
    name: string,
    images: string[],
    description: string,
    price: number
};

type AppContextType = {
    currency: string | undefined;
    router: any;
    isSeller: boolean;
    setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
    userData: boolean | object;        
    fetchUserData: () => void;
    products: Product[] | null;
    fetchProductData: () => void;
    cartItems: Record<string, number>;
    setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    addToCart: (id: string) => void;
    updateCartQuantity: (id: string, qty: number) => void;
    getCartCount: () => number;
    // getCartAmount: () => number;
};


export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props:any) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const [products, setProducts] = useState<Product[]|null>(null)
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState<Record<string, number>>({})

    const fetchProductData = async () => {
        try {
            const { data } = await axios.get("/api/product/list")

            console.log(data)

            if(data.success){
                setProducts(data.allProducts);
            }

            console.log(data.message)
        } catch (error) {
            console.error("failed:", error)
        }
    }

    const fetchUserData = async () => {
        setUserData(userData)
    }

    const addToCart = async (itemId: string) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const updateCartQuantity = async (itemId: string, quantity: number) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    // const getCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const items in cartItems) {
    //         let itemInfo = products.find((product) => product._id === items);
    //         if (cartItems[items] > 0 && itemInfo) {
    //             totalAmount += itemInfo.offerPrice * cartItems[items];
    //         }
    //     }
    //     return Math.floor(totalAmount * 100) / 100;
    // }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, 
        // getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}