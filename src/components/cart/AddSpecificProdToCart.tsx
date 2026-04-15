"use client"
import { addProductToCart } from "@/actions/cart.actions";
import { Button } from "@base-ui/react";
import React, { useContext, useState } from "react";
import { FaPlus, FaShoppingCart, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/context/cart-provider";
import { redirect } from "next/navigation";


export default function AddSpecificProdToCart({prodID} :{prodID: string}) {
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
            redirect("/login")
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <>
         <Button
            id="add-to-cart"
            tabIndex={0}
            disabled ={isLoading}
            onClick={() => addToCart(prodID)}
            className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-primary/80 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/25 bg-primary"
        >
            {isLoading ? <Spinner/> : <FaShoppingCart />}
            Add to Cart
        </Button>
    </>
  )
}
