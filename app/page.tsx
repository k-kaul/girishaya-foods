import FeaturedProduct from "@/components/home/FeaturedProducts";
import HomeProducts from "@/components/home/HomeProducts";

export default function Home() {
  return (
    <div className="flex flex-col m-10">
      <HomeProducts />
      <FeaturedProduct />
    </div>
  );
}