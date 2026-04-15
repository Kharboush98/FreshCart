import { Brand, ProdI } from "@/types/postType";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import Link from "next/link";
import { FaEye, FaPlus, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import AddProductToCartFn from "@/components/cart/AddProductToCartFn";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  console.log(brandId);

  const response = await fetch(`${process.env.BASE_URL}/brands/${brandId}`);

  const data = await response.json();
  const brand: Brand = data.data;
  console.log(brand, "My product");

  const res = await fetch(`${process.env.BASE_URL}/products?brand[in]=${brandId}`);
  const data2 = await res.json();
  const brandProd: ProdI[] = data2.data;

  console.log(brandProd, "My product");

  return (
    <>
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={
                      <Link className="text-white" href="/">
                        Home
                      </Link>
                    }
                  />
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />

                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={
                      <Link className="text-white" href="/brands">
                        Brands
                      </Link>
                    }
                  />
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />

                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    {brand.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <Image
                alt={brand.name}
                className="w-[50] h-[50] object-contain group-hover:scale-110 transition-transform duration-500"
                src={brand.image}
                width={50}
                height={50}
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {brand.name}
              </h1>
              <p className="text-white/80 mt-1">Shop {brand.name} products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-8">
        <div className="my-6 text-sm text-gray-500">Showing 3 products</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          
          {brandProd && brandProd.map((prod)=> (
          <div
            key={prod._id}
            id="product-card"
            className="bg-white border border-gray-200 rounded-lg overflow-hidden
                        transition-all duration-300 ease-out
                        hover:-translate-y-2 hover:-translate-x-1
                        hover:shadow-[8px_12px_30px_rgba(0,0,0,0.2)] hover:shadow-gray-300/50"
          >
            <div className="relative">
              <Image
                className="w-full h-60 object-contain bg-white"
                alt={prod.title}
                src={prod.imageCover}
                width={100}
                height={100}
                decoding="async"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 flex flex-col space-y-2">
                <button
                  className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500"
                  title="Add to wishlist"
                  tabIndex={0}
                >
                  <FaRegHeart />
                </button>
                <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary shadow-sm">
                  <FaArrowsRotate />
                </button>
                <Link
                  className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary shadow-sm"
                  href={`/products/${prod._id}`}
                >
                  <FaEye />
                </Link>
              </div>
            </div>

            <div className="p-4">
              <div className="text-xs text-gray-500 mb-1">{prod.category.name}</div>
              <h3
                className="font-medium mb-1 cursor-pointer "
                title={prod.title}
              >
                <Link className="line-clamp-1" href={`/products/${prod._id}`}>
                  {prod.title}
                </Link>
              </h3>
              <div className="flex items-center mb-2">
                <div className="flex mr-2 flex-row">
                  {[0, 1, 2, 3, 4].map((star, index) => {
                    const filledStars = index < Math.floor(prod.ratingsAverage);
                    return (<>
                        {filledStars ? (
                          <FaStar key={index} className="text-amber-400" />
                        ) : (
                          <FaRegStar key={index} className="text-gray-400" />
                        )}
                      </>
                    );
                  })}
                </div>

                <span className="text-xs text-gray-500">
                  {prod.ratingsAverage} ({prod.ratingsQuantity})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-800">
                    {prod.price} EGP
                  </span>
                </div>
                <AddProductToCartFn prodID={prod._id}/>

              </div>
            </div>
          </div>
          ))}

        </div>
      </div>
    </>
  );
}
