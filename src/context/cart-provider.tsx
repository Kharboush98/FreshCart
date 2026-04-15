"use client"
import { getCart } from "@/actions/cart.actions";
import { CartI } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

interface cartContextI{
    
    noCartItems: number
    totalCartPrice: number
    isLoading : boolean
    getCartData:()=> void
    cartId : string
}

export const CartContext = createContext<cartContextI>({
    noCartItems : 0,
    totalCartPrice : 0,
    cartId : "",
    isLoading: false,
    getCartData : ()=>{}
})

export default function CartContextProvider({children}:{children : React.ReactNode}) {

    const [noCartItems, setNoCartItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartId, setCartId] = useState("")
    const [isLoading, setisLoading] = useState(false)

    const {data:session , status} = useSession()


    async function getCartData()
    {
        try {
            setisLoading(true)
            const response: CartI = await getCart();
            console.log(response)
            
            const totalItems = response.data.products.reduce((acc , counter)=> acc + counter.count , 0)
            
            
            setNoCartItems(totalItems)
            setTotalCartPrice(response.data.totalCartPrice)
            setCartId(response.cartId)

        } catch (error) {
            console.log(error)
        } finally {
            setisLoading(false)
        }
    }

    useEffect(()=>{
        if(status === "unauthenticated") return

        if(status === "authenticated"){
            getCartData()
        }

    },[status])

    return (
        <>
            <CartContext.Provider value={{noCartItems , isLoading , getCartData , totalCartPrice , cartId}}>
                {children}
            </CartContext.Provider>
        </>
    )
}