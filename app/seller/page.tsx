import React from "react";
import Image from "next/image";
import ImageUploader from "@/components/common/ImageUploader";

const AddProduct = () => {
  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-5 max-w-lg">
        <ImageUploader />
      </div>
    </div>
  );
};

export default AddProduct;