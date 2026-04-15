"use client"
import { addProductToCart } from "@/actions/cart.actions";
import { Button } from "@base-ui/react";
import React, { useState } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function AddProductToCartFn({prodID} :{prodID: string}) {
    
    const [isLoading , setIsLoading] = useState(false) 


    async function addToCart(productId:string) {
        try {
            setIsLoading(true);
            const response = await addProductToCart(productId);
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
        className="h-10 w-10 rounded-full flex items-center justify-center transition bg-primary text-white hover:bg-green-700 disabled:opacity-70"
        tabIndex={0}
        disabled ={isLoading}
        onClick={() => addToCart(prodID)}
      >
        {isLoading ? <Spinner/> : <FaPlus />}
        {/* <FaPlus /> */}
      </Button>
    </>
  );
}
