import AllCategories from "@/components/AllCategories/AllCategories";
import Deals from "@/components/Deals/Deals";
import MainHeader from "@/components/MainHeader/MainHeader";
import Image from "next/image";
import Products from "./(main-site)/products/page";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <MainHeader/>
        <AllCategories/>
        <Deals/>
        <Products/>
      </div>
    </>
  );
}
