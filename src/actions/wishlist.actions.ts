"use server"

import { getUsertoken } from "@/lib/auth";

export async function addWishlistProduct(productId : string) {

    const token = await getUsertoken();

    if(!token){
        throw new Error("Unauthanticated User");
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist` , {
        method: "POST",
        body: JSON.stringify({productId}),
        headers: {
            token : token as string,
            "content-type":"application/json"
        }
    } )
    
    const data = await response.json();

    return data;
}

export async function getWishlistProducts() {

    const token = await getUsertoken();

    if(!token){
        throw new Error("Unauthanticated User");
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist` , {
        method: "GET",
        headers: {
            token : token as string,
            "content-type":"application/json"
        }
    } )
    
    const data = await response.json();

    return data;
}

export async function deleteWishlistProduct(productId : string) {

    const token = await getUsertoken();

    if(!token){
        throw new Error("Unauthanticated User");
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${productId}` , {
        method: "DELETE",
        headers: {
            token : token as string,
            "content-type":"application/json"
        }
    } )
    
    const data = await response.json();

    return data;
}