import AllCategories from "@/Components/AllCategories/AllCategories";
import Deals from "@/Components/Deals/Deals";
import MainHeader from "@/Components/MainHeader/MainHeader";
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
