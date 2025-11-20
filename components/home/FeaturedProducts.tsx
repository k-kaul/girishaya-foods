'use client'

import { useAppContext } from "@/context/AppContext";
import { Image } from "@imagekit/next";
import React from "react";


// const products = [
//   {
//     id: 1,
//     title: "Unparalleled Sound",
//     image:'https://ik.imagekit.io/iktdukrlb/390_adv_DT52AqIiF.jpg',
//     description: "Experience crystal-clear audio with premium headphones.",
//   },
//   {
//     id: 2,
//     title: "Stay Connected",
//     description: "Compact and stylish earphones for every occasion.",
//     image: 'https://ik.imagekit.io/iktdukrlb/390_adv_DT52AqIiF.jpg'
//   },
//   {
//     id: 3,
//     title: "Power in Every Pixel",
//     description: "Shop the latest laptops for work, gaming, and more.",
//     image: 'https://ik.imagekit.io/iktdukrlb/390_adv_DT52AqIiF.jpg'
//   },
// ];

const FeaturedProduct = () => {
    const context = useAppContext();
    if(!context) return null
    const {products} = context;
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {
            products ? products.map(({ id, images, name, description }, index) => (
          <div key={id} className="relative group">
            <Image
              src={images[0]}
              alt={name}
              width={100}
              height={100}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{name}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
                Buy now 
              </button>
            </div>
          </div>
        )) : <div>Loading..</div>
        }
      </div>
    </div>
  );
};

export default FeaturedProduct;