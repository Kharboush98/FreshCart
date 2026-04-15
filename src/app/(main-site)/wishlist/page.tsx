"use client"
import { CartI, CartProductI } from '@/types/cart.type'
import React, { useContext, useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { FaArrowRightLong, FaTrashCan } from 'react-icons/fa6'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link'
import { deleteWishlistProduct, getWishlistProducts } from '@/actions/wishlist.actions'
import { ProdI, whislistProdI } from '@/types/postType'
import Image from 'next/image'
import { CartContext } from '@/context/cart-provider'
import { toast } from 'sonner'
import { addProductToCart } from '@/actions/cart.actions'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function Wishlist() {
    const [products , setProducts] = useState<ProdI[]>([])
    const [amount , setAmount] = useState(0)
    const [isLoadingClear , setIsLoadingClear] = useState(false)

    async function getAllWishlists()
    {
      try {
        const response :whislistProdI = await getWishlistProducts();
        console.log(response);
        setProducts(response.data);
        setAmount(response.count);

      } catch (error) {
        console.log(error);
      } finally {

      }
    }

    //add to cart :- 
      const [isLoading , setIsLoading] = useState(false)
      const {getCartData} = useContext(CartContext);

      async function addToCart(productId:string) {
        try {
            setIsLoading(true);
            const response = await addProductToCart(productId);
            console.log(response);
            toast.success(response.message)
            getCartData() 

        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsLoading(false);
        }
    }

    //delete wishlist
    const [isLoadingDel , setIsLoadingDel] = useState(false)

    async function removeProduct(prodId:string) {
        try {
            setIsLoadingDel(true)
            const response = await deleteWishlistProduct(prodId)
            setProducts(response.data.products)
            getAllWishlists();
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message)
        } finally {
            setIsLoadingDel(false)
        }
    }

    useEffect(()=> {
      getAllWishlists();
    }, [])


  if(amount === 0){
    return (
      <>
        <div className="min-h-screen bg-gray-50/50">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-sm mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <FaRegHeart className='text-3xl text-gray-500'/>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Browse products and save your favorites here.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-green-700 transition-colors"
                  href="/products"
                >
                  Browse Products
                  <FaArrowRightLong />
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
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href="/">Home</Link>} />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />

                  <BreadcrumbItem>
                    <BreadcrumbPage>Wishlist</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </nav>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <FaHeart className="text-red-600 text-3xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    My Wishlist
                  </h1>
                  <p className="text-gray-500 text-sm">{amount} item saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            <div className="divide-y divide-gray-100">
              {products &&
                products.map((prod) => (
                  <div key={prod._id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors">
                    <div className="md:col-span-6 flex items-center gap-4">
                      <Link
                        className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                        href={`/products/${prod._id}`}
                      >
                        <Image
                          alt={prod.title}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain p-2"
                          src={prod.imageCover}
                        />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                          href={`/products/${prod._id}`}
                        >
                          {prod.title}
                        </Link>
                        <p className="text-sm text-gray-400 mt-1">
                          {prod.category.name}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                      <span className="md:hidden text-sm text-gray-500">
                        Price:
                      </span>
                      <div className="text-right md:text-center">
                        <div className="font-semibold text-gray-900">
                          {prod.price} EGP
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex md:justify-center">
                      <span className="md:hidden text-sm text-gray-500 mr-2">
                        Status:
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        In Stock
                      </span>
                    </div>

                    <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                      <button
                        onClick={() => addToCart(prod._id)}
                        title="addToCart"
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-primary text-white hover:bg-green-700">
                        
                        {isLoading ? <Spinner/> : <FaShoppingCart />} 
                        <span className="md:hidden lg:inline">Add to Cart</span>
                      </button>

                      <button
                        onClick={()=> removeProduct(prod._id)}
                        className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                        title="Remove"
                      >
                        {isLoadingDel ? <Spinner/> : <FaTrashCan />}
                        
                      </button>
                    </div>
                  </div>
                ))}
            </div>

          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link
              className="text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors"
              href="/products"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
