'use client'

import React from "react";
import ProductCard from "@/components/ui/ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const context = useAppContext();

  if(!context) return null;
  
  const { products, router } = context;

  return (
    <div className="flex flex-col items-center p-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>
      <div className="flex flex-col-2 md:flex-col-3 lg:flex-col-4 xl:flex-col-5 items-center gap-6 mt-6 pb-14 w-full">
        {products === null ? <div>Loading..</div> : products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
};

export default HomeProducts;