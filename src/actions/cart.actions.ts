"use server"
import { getUsertoken } from "../lib/auth";

export async function addProductToCart(productId : string) {

    const token = await getUsertoken();

    if(!token){
        throw new Error("Unauthanticated User");
    }
    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart` , {
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

export async function getCart() {

    const token = await getUsertoken();

    if(!token){
        throw new Error("Unauthanticated User");
    }
    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart` , {
        method: "GET",
        headers: {
            token : token as string,
            "content-type":"application/json"
        }
    } )
    
    const data = await response.json();

    return data;
}

export async function deleteProductFromCart(productId : string) {

    const token = await getUsertoken();

    if(!token){
        throw new Error("Unauthanticated User");
    }
    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}` , {
        method: "DELETE",
        headers: {
            token : token as string,
            "content-type":"application/json"
        }
    } )
    
    const data = await response.json();

    return data;
}

export async function UpdateProductFromCart(productId : string , count : number) {

    const token = await getUsertoken();

    if(!token){
        throw new Error("Unauthanticated User");
    }
    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}` , {
        method: "PUT",
        body: JSON.stringify({count}),
        headers: {
            token : token as string,
            "content-type":"application/json"
        }
    } )
    
    const data = await response.json();

    return data;
}

export async function ClearCart() {

    const token = await getUsertoken();

    if(!token){
        throw new Error("Unauthanticated User");
    }
    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart` , {
        method: "DELETE",
        headers: {
            token : token as string,
            "content-type":"application/json"
        }
    } )
    
    const data = await response.json();

    return data;
}