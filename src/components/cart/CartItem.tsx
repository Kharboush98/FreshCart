import { deleteProductFromCart, UpdateProductFromCart } from "@/actions/cart.actions";
import { CartProductI, ProductI } from "@/types/cart.type";
import { Button } from "@base-ui/react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { FaCheck, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/context/cart-provider";
import Link from "next/link";


export default function CartItem({ product , setProducts }: { product: CartProductI , setProducts:(products:CartProductI[])=> void }) {

    const [isLoading , setIsLoading] = useState(false)
    const [isLoadingUpdate , setIsLoadingUpdate] = useState(false)
    

    const {getCartData} = useContext(CartContext);

    async function removeProduct(prodId:string) {

        try {
            setIsLoading(true)
            const response = await deleteProductFromCart(prodId)
            toast.success(response.message)
            setProducts(response.data.products)
            getCartData()
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    async function UpdateCart(prodId:string , count : number) {
    
        try {
            setIsLoadingUpdate(true)
            const response = await UpdateProductFromCart(prodId , count);
            toast.success(response.message)
            setProducts(response.data.products)
            getCartData()
        } catch (error) {
            console.log(error);
            toast.error((error as Error).message)
        } finally {
            setIsLoadingUpdate(false);
        }
    }

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 ">
        <div className="p-4 sm:p-5">
          <div className="flex gap-4 sm:gap-6">
            <Link
              className="relative shrink-0 group"
              href={`/products/${product.product._id}`}
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                <Image
                  alt={product.product.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  src={product.product.imageCover}
                  width={100}
                  height={100}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <FaCheck />
                In Stock
              </div>
            </Link>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="mb-3">
                <Link
                  className="group/title"
                  href={`/products/${product.product._id}`}
                >
                  <h3 className="font-semibold text-gray-900 group-hover/title:text-primary transition-colors leading-relaxed text-base sm:text-lg">
                    {product.product.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-block px-2.5 py-1 bg-linear-to-r from-primary-light to-emerald-50 text-primary text-xs font-medium rounded-full">
                    {product.product.category.name}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{product.product.brand.name}</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-primary font-bold text-lg">
                    {product.price}
                  </span>
                  <span className="text-xs text-gray-400">per unit</span>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                    <Button
                      disabled = {isLoadingUpdate}
                      className="h-8 w-8 rounded-lg bg-gray-300 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                      aria-label="Decrease quantity"
                      onClick={()=> UpdateCart(product.product._id , product.count-1)}
                    >
                        {/* {isLoadingUpdate ? <Spinner/> : <FaMinus />} */}
                        <FaMinus />
                    </Button>

                    <span className="w-12 text-center font-bold text-gray-900">
                      {product.count}
                    </span>

                    <Button
                      disabled = {isLoadingUpdate}
                      className="h-8 w-8 rounded-lg bg-primary shadow-sm shadow-green-600/30 flex items-center justify-center text-white hover:bg-green-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      aria-label="Increase quantity"
                        onClick={()=> UpdateCart(product.product._id , product.count+1)}
                    >
                        {/* {isLoadingUpdate ? <Spinner/> : <FaPlus />} */}
                        <FaPlus />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Total</p>
                    <p className="text-xl font-bold text-gray-900">
                      {product.price * product.count}{" "}
                      <span className="text-sm font-medium text-gray-400">
                        EGP
                      </span>
                    </p>
                  </div>

                  <Button
                    className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200"
                    title="Remove item"
                    aria-label="Remove from cart"
                    onClick={()=> removeProduct(product.product._id)}
                  >
                    {isLoading ? <Spinner/> : <FaTrash />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
