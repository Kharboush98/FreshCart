import { log } from 'console'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const {pathname} = request.nextUrl;
    // log(pathname , "my Path")

    //route handler or proxy
    const token =  await getToken({
        req : request,
        secret: process.env.AUTH_SECRET,
    });

    const isAuthPages = ["/login" , "/register"].includes(pathname)

    if(token && isAuthPages)
    {
        return NextResponse.redirect(new URL('/', request.url))
    } 
    
    if(!token && !isAuthPages){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}
 
export const config = {
  matcher: ["/login" , "/register" , "/cart" , "/wishlist" , "/brands"],
}