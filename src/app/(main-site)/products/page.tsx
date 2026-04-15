import { ProdI } from "@/types/postType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye, FaPlus, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { getProducts } from "@/lib/api";
import { Button } from "@base-ui/react";
import AddProductToCartFn from "@/components/cart/AddProductToCartFn";
import AddProdToWishlistHeart from "@/components/WishList/AddProdToWishlistHeart";


export default async function Products() {

    const products : ProdI[] = await getProducts();

  return (
    <>
        <div className='container mx-auto py-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            render={<Link href="/">Home</Link>}
                        />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                    <BreadcrumbPage>All products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>

        <section className="py-5">
            <div className="container mx-auto">
                <div className="flex items-center gap-3 my-8">
                    <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
                    <h2 className="text-3xl font-bold text-gray-800">
                    Featured <span className="text-emerald-600">Products</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products && products.map((prod) => (
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
                            <AddProdToWishlistHeart prodID={prod._id}/>
                            {/* <button
                            className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500"
                            title="Add to wishlist"
                            tabIndex={0}
                            >
                            <FaRegHeart />
                            </button> */}
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
                        <div className="text-xs text-gray-500 mb-1">
                            {prod.category.name}
                        </div>
                        <h3
                            className="font-medium mb-1 cursor-pointer "
                            title={prod.title}
                        >
                            <Link
                            className="line-clamp-2"
                            href={`/products/${prod._id}`}
                            >
                            {prod.title}
                            </Link>
                        </h3>
                        <div className="flex items-center mb-2">
                            <div className="flex mr-2 flex-row">
                                {[0,1,2,3,4].map((star, index) => {
                                    const filledStars = index < Math.floor(prod.ratingsAverage);
                                    
                                    return filledStars ? (
                                            <FaStar key={index} className="text-amber-400" /> )
                                            : (<FaRegStar key={index} className="text-gray-400" />)  
                                })}
                            </div>

                            <span className="text-xs text-gray-500">{prod.ratingsAverage} ({prod.ratingsQuantity})</span>
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
        </section>
    </>
  );
}
