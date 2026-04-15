"use client"
import React, { useContext, useState } from "react";
import { CiMail, CiUser } from "react-icons/ci";
import { FaGift, FaHeadset, FaHeart, FaRegHeart, FaShoppingCart, FaSignOutAlt, FaTruck, FaUser } from "react-icons/fa";
import { FaMagnifyingGlass, FaPhone, FaUserPlus } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/cart-provider";
import { Spinner } from "../ui/spinner";

export default function Navbar() {
 
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredWishlist, setIsHoveredWishlist] = useState(false);
    const [isHoveredCart, setIsHoveredCart] = useState(false);

    const {data: session , status} = useSession();
    // console.log(session , status , "session data and status");

    const [noOfWishlist , setNoOfWishlist] = useState(0);

    const {noCartItems , isLoading} = useContext(CartContext);

    function handleLogout()
    {
      signOut({callbackUrl:"/login"})
    }

  return (
    <>
      <div className="hidden lg:block text-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <FaTruck className="text-primary" />
                <span className="font-medium">
                  Free Shipping on Orders 500 EGP
                </span>
              </span>

              <span className="flex items-center gap-2">
                <FaGift className="text-primary" />
                <span className="font-medium">New Arrivals Daily</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500">
                <Link
                  href="tel:+18001234567"
                  className="flex items-center gap-1.5 hover:text-primary-600 hover:text-green-600"
                >
                  <FaPhone />
                  <span>+1 (800) 123-4567</span>
                </Link>
                <Link
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-1.5 hover:text-primary-600 hover:text-green-600"
                >
                  <CiMail />
                  <span>support@freshcart.com</span>
                </Link>
              </div>

              <span className="w-px h-4 bg-gray-200" />

              {session ? (
                <>
                  <div className="flex items-center gap-4">
                    <Link
                      className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 hover:text-green-600"
                      href="/profile"
                    >
                      <FaUser />
                      <span>{session.user?.name}</span>
                    </Link>
                    <div
                      className="cursor-pointer flex items-center gap-1.5 text-gray-600 hover:text-primary-600 hover:text-green-600"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt  />
                      <span>Sign out</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <Link
                      className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 hover:text-green-600"
                      href="/login"
                    >
                      <CiUser />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 hover:text-green-600"
                      href="/register"
                    >
                      <FaUserPlus />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
              <Link
                className="flex items-center justify-start align-items-center gap-2 shrink-0"
                href="/"
              >
                <AiOutlineShoppingCart className="text-primary text-3xl" />
                <h2 className="font-bold text-2xl">FreshCart</h2>
              </Link>

              <form className="hidden lg:flex flex-1 max-w-2xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                    value=""
                    readOnly
                  />

                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary-700 transition-colors"
                  >
                    <FaMagnifyingGlass className="text-white" />
                  </button>
                </div>
              </form>

              <nav className="hidden xl:flex items-center gap-6">
                <Link
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                  href="/"
                >
                  Home
                </Link>

                <Link
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                  href="/products"
                >
                  Shop
                </Link>
                
                <Link
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                  href="/categories"
                >
                  Categories
                </Link>

                {/* <div className="relative group">
                  <button
                    className="flex items-center gap-1.5 text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Categories
                    {isHovered ? (
                      <RiArrowDropDownLine />
                    ) : (
                      <RiArrowDropUpLine />
                    )}
                  </button>
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-50">
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/categories"
                      >
                        All Categories
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/products?category=6439d58a0049ad0b52b9003f"
                      >
                        Electronics
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/products?category=6439d5b90049ad0b52b90048"
                      >
                        Women's Fashion
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/products?category=6439d2d167d9aa4ca970649f"
                      >
                        Men's Fashion
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/products?category=6439d40367d9aa4ca97064a8"
                      >
                        Beauty &amp; Health
                      </Link>
                    </div>
                  </div>
                </div> */}

                <Link
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  href="/brands"
                >
                  Brands
                </Link>
              </nav>

              <div className="flex items-center gap-1 lg:gap-2">
                <Link
                  className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
                  href="/"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-lightest flex items-center justify-center">
                    <FaHeadset className="text-primary text-[18px]" />
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-400">Support</div>
                    <div className="font-semibold text-gray-700">24/7 Help</div>
                  </div>
                </Link>
                <Link
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                  title="Wishlist"
                  href="/wishlist"
                  onMouseEnter={() => setIsHoveredWishlist(true)}
                  onMouseLeave={() => setIsHoveredWishlist(false)}
                >
                  {isHoveredWishlist ? (
                    <FaRegHeart className="text-2xl text-primary" />
                  ) : (
                    <FaRegHeart className="text-2xl text-description" />
                  )}

                  {/* number of whislists */}
                  {
                    noOfWishlist > 0 ? 
                  <>
                   <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-red-600 text-white text-[10px]
                    font-bold flex items-center justify-center ring-2 ring-white">
                      {isLoading ? <Spinner/> : noOfWishlist}
                  </span>
                  </> 
                  : 
                  <>

                  </>
                  }
                </Link>
                <Link
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                  title="Cart"
                  href="/cart"
                  onMouseEnter={() => setIsHoveredCart(true)}
                  onMouseLeave={() => setIsHoveredCart(false)}
                >
                  {isHoveredCart ? (
                    <FaShoppingCart className="text-2xl text-primary" />
                  ) : (
                    <FaShoppingCart className="text-2xl text-description" />
                  )}

                  {/* Cart total products counter */}
                  {noCartItems > 0 ? 
                  <>
                   <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-primary text-white text-[10px]
                    font-bold flex items-center justify-center ring-2 ring-white">
                      {isLoading ? <Spinner/> : noCartItems}
                  </span>
                  </> 
                  : 
                  <>

                  </>}
                  
                </Link>
                  
                {session? 
                <>
                <Link
                  className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/80 text-white text-sm font-semibold transition-colors shadow-sm shadow-primary-600/20"
                  href="/profile"
                >
                  <FaUser className="text-sm" />
                  Profile
                </Link>
                </> 
                : 
                <>
                <div
                  className="cursor-pointer hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/80 text-white text-sm font-semibold transition-colors shadow-sm shadow-primary-600/20"
                  onClick={handleLogout}
                >
                  <CiUser className="text-[16px]" />
                  Sign In
                </div>
                </>}
                
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
