"use client"
import { addWishlistProduct } from '@/actions/wishlist.actions';
import React, { useState } from 'react'
import { FaRegHeart } from 'react-icons/fa';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';

export default function AddProdToWishlist({prodID} :{prodID: string}) {

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
            id="wishlist-button"
            className="flex-1 bg-white border-2 py-6 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
            >
                {isLoading ? <Spinner/> : <FaRegHeart />}
            Add to Wishlist
        </Button>
    </>
  )
}
