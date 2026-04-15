"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';
import { FaBoxOpen, FaCheck, FaLock, FaMinus, FaPlus, FaShieldAlt, FaShoppingBag, FaShoppingCart, FaTag, FaTrash, FaTruck } from 'react-icons/fa';
import { ClearCart, getCart } from '@/actions/cart.actions';
import { useEffect, useState } from "react";
import { CartI, CartProductI } from "@/types/cart.type";
import CartItem from "@/components/cart/CartItem";
import { toast } from "sonner";
import { Button } from "@base-ui/react";
import { Spinner } from "@/components/ui/spinner";
import { FaArrowRightLong } from "react-icons/fa6";



export default function cart() {

  const [products , setProducts] = useState<CartProductI[]>([])
  const [isLoading , setIsLoading] = useState(false)
  const [isLoadingClear , setIsLoadingClear] = useState(false)

  async function getAllProductsInCart() {
    try {
      setIsLoading(true)
      const response :CartI = await getCart();
      console.log(response);

      setProducts(response.data.products);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  async function DeleteAllProducts() {
    try {
      console.log("hello")
      setIsLoadingClear(true)
      const response = await ClearCart();
      toast.success(response.message)
      setProducts(response.data.products);
      
    } catch (error) {
      console.log(error)
      toast.error((error as Error).message)
    } finally {
      setIsLoadingClear(false)
    }
  }

  useEffect(()=> {
    getAllProductsInCart();
  }, [])

  if(products.length === 0){
    return (
      <>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
                <FaBoxOpen className="w-18 h-18 text-gray-400"/>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Looks like you haven't added anything to your cart yet.
              <br />
              Start exploring our products!
            </p>
            <Link
              className="inline-flex items-center gap-2 bg-linear-to-r from-primary to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]"
              href="/"
            >
              Start Shopping
              <FaArrowRightLong />
            </Link>
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  className="px-4 py-2 bg-gray-50 hover:bg-green-100 hover:text-primary text-gray-600 rounded-full text-sm font-medium transition-colors"
                  href="/categories"
                >
                  Electronics
                </Link>
                <Link
                  className="px-4 py-2 bg-gray-50 hover:bg-green-100 hover:text-primary text-gray-600 rounded-full text-sm font-medium transition-colors"
                  href="/categories"
                >
                  Fashion
                </Link>
                <Link
                  className="px-4 py-2 bg-gray-50 hover:bg-green-100 hover:text-primary text-gray-600 rounded-full text-sm font-medium transition-colors"
                  href="/categories"
                >
                  Home
                </Link>
                <Link
                  className="px-4 py-2 bg-gray-50 hover:bg-green-100 hover:text-primary text-gray-600 rounded-full text-sm font-medium transition-colors"
                  href="/categories"
                >
                  Beauty
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/">Home</Link>} />
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="bg-linear-to-r from-primary to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
              <FaShoppingCart />
            </span>
            Shopping Cart
          </h1>
          <p className="text-gray-500 mt-2">
            You have <span className="font-semibold text-primary">1 item</span>{" "}
            in your cart
          </p>
        </div>
      </div>

      <div className="container mx-auto mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {products &&
              products.map((products) => (
                <CartItem key={products._id} product={products} setProducts={setProducts}/>
              ))}

            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <Link
                className="text-primary hover:text-green-700 font-medium text-sm flex items-center gap-2"
                href="/"
              >
                <span>←</span> Continue Shopping
              </Link>

              {/* clear all button */}
              <button
                onClick={()=> DeleteAllProducts()}
                className="cursor-pointer group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                {isLoadingClear ? <Spinner/> : <FaTrash />}
                <span>Clear all items</span>
              </button>

            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
              <div className="bg-linear-to-r from-primary to-green-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaShoppingBag />
                  Order Summary
                </h2>
                <p className="text-primary-light text-sm mt-1">
                  1 item in your cart
                </p>
              </div>
              <div className="p-6 space-y-5">
                <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTruck />
                    <span className="text-sm font-medium text-gray-700">
                      Add 351 EGP for free shipping
                    </span>
                  </div>
                  <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: "29.8%" }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">149 EGP</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">50 EGP</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-900 font-semibold">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          199
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-primary hover:bg-green-50/50 transition-all">
                  <FaTag />
                  <span className="text-sm font-medium">Apply Promo Code</span>
                </button>
                <Link
                  className="w-full bg-linear-to-r from-primary to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                  href="/checkout"
                >
                  <FaLock />
                  <span>Secure Checkout</span>
                </Link>
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaShieldAlt />
                    <span>Secure Payment</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaTruck />
                    <span>Fast Delivery</span>
                  </div>
                </div>
                <Link
                  className="block text-center text-primary hover:text-green-700 text-sm font-medium py-2"
                  href="/"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
