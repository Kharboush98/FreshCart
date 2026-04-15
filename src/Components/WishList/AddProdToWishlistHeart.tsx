"use client"
import { addWishlistProduct } from '@/actions/wishlist.actions';
import React, { useState } from 'react'
import { FaRegHeart } from 'react-icons/fa';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';

export default function AddProdToWishlistHeart({prodID} :{prodID: string}) {
  
  const [isLoading , setIsLoading] = useState(false) 
      
    async function addToWishlist(productId:string) {
        try {
            setIsLoading(true);
            const response = await addWishlistProduct(productId);
            console.log(response);
            toast.success(response.message)

        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Button
            onClick={()=> addToWishlist(prodID)}
            className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500"
            title="Add to wishlist"
            tabIndex={0}
            >
                {isLoading ? <Spinner/> : <FaRegHeart />}
            </Button>
        </>
  )
}
