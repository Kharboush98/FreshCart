import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaCreditCard, FaEnvelope, FaFacebookF, FaHeadset, FaInstagram, FaMapMarker, FaShieldAlt, FaTruck, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaArrowRotateLeft, FaPhoneFlip } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <div className="bg-primary-lightest border-y border-primary-light">
        <div className="container mx-auto px-4 py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <FaTruck className="text-primary text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Free Shipping
                </h4>
                <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <FaArrowRotateLeft className="text-primary text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Easy Returns
                </h4>
                <p className="text-gray-500 text-xs">14-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <FaShieldAlt className="text-primary text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Secure Payment
                </h4>
                <p className="text-gray-500 text-xs">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <FaHeadset className="text-primary text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  24/7 Support
                </h4>
                <p className="text-gray-500 text-xs">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer id="footer" className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <Link className="inline-block mb-6" href="/">
                <div className="bg-white rounded-lg px-4 py-2 inline-block">
                    <div className="flex items-center justify-start align-items-center gap-2 shrink-0">
                        <AiOutlineShoppingCart className="text-primary text-3xl"/>
                        <h2 className="font-bold text-2xl text-black">FreshCart</h2>
                    </div>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with Link seamless shopping experience.
              </p>
              <div className="space-y-3 mb-6">
                <Link
                  href="tel:+18001234567"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  <FaPhoneFlip  className="text-primary"/>
                  <span>+1 (800) 123-4567</span>
                </Link>

                <Link
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  <FaEnvelope className="text-primary"/>
                  <span>support@freshcart.com</span>
                </Link>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <FaMapMarker className="text-primary" />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <FaTwitter />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <FaYoutube />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/products"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/categories"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/brands"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/products?category=6439d58a0049ad0b52b9003f"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/products?category=6439d2d167d9aa4ca970649f"
                  >
                    Men's Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/products?category=6439d5b90049ad0b52b90048"
                  >
                    Women's Fashion
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5">Account</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/profile"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/profile/orders"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/wishlist"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/cart"
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/login"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/register"
                  >
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/help"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/shipping"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/returns"
                  >
                    Returns &amp; Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/track-order"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/terms"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href="/cookies"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © 2026 FreshCart. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaCreditCard />
                  <span>Visa</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaCreditCard />
                  <span>Mastercard</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaCreditCard />
                  <span>PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
