'use client'

import {addToCart} from "@/lib/addToCart";
import { Card } from "flowbite-react";
import Link from "next/link";

export function ProductCard({
    productName,
    weight,
    price,
    productId
}:{
    productName?:string;
    weight?:string;
    price?:number;
    productId: string;
}) {
  return (
    <Card
      className="max-w-sm"
      // imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      // imgSrc="/images/products/apple-watch.png"
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {productName}
        </h5>
      </a>
      <div><span className="text-3xl font-bold text-gray-900 dark:text-white">{weight}</span></div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}</span>
        <Link
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          onClick={() => addToCart({productId})}
        >
          <span>Add to cart</span>
        </Link>
      </div>
    </Card>
  );
}
