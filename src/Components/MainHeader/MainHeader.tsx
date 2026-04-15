"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MainImg from "../../../public/assets/FoodcartCarousel.png";
import { FaHeadset, FaShieldAlt, FaTruck } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import Link from "next/link";

export default function MainHeader() {
  return (
    <>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-100"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="h-full flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${MainImg.src})` }}
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container mx-auto h-full content-center">
                  <h2 className="text-3xl font-bold mb-4 max-w-96">
                    Fast & Free Delivery
                  </h2>
                  <p>Same day delivery available</p>
                  <div className="mt-4">
                    <Link className="btn bg-white border-2 border-white/50 text-purple-500 px-6 py-2 rounded-lg" href="/">
                      Order Now
                    </Link>
                    <Link className="btn bg-transparent border-2 border-white/50 text-white ml-2 px-6 py-2 rounded-lg" href="/">
                      Delivery Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="h-full flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${MainImg.src})` }}
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container mx-auto h-full content-center">
                  <h2 className="text-3xl font-bold mb-4 max-w-96">
                    Fresh Products Delivered to your Door
                  </h2>
                  <p>Get 20% off your first order</p>
                  <div className="mt-4">
                    <Link href="/" className="bg-white text-green-500 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform">
                      Shop Now
                    </Link>
                    <Link href="/" className="bg-transparent border-2 border-white/50 text-white ml-2 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform">
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div
              className="h-full flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${MainImg.src})` }}
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container mx-auto h-full content-center">
                  <h2 className="text-3xl font-bold mb-4 max-w-96">
                    Premium Quality Guaranteed
                  </h2>
                  <p>Fresh from farm to your table</p>
                  <div className="mt-4">
                    <Link href="/" className="bg-white text-blue-500 px-6 py-2 rounded-lg">
                      Shop Now
                    </Link>
                    <Link href="/" className="bg-transparent border-2 border-white/50 text-white ml-2 px-6 py-2 rounded-lg">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="custom-prev text-4xl absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          ‹
        </div>

        <div className="custom-next text-4xl absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          ›
        </div>
      </div>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="bg-blue-50 text-2xl text-blue-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <FaTruck />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Free Shipping
                </h3>
                <p className="text-xs text-gray-500">On orders over 500 EGP</p>
              </div>
            </div>
            <div
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="bg-emerald-50 text-2xl text-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <FaShieldAlt/>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Secure Payment
                </h3>
                <p className="text-xs text-gray-500">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="bg-orange-50 text-2xl text-orange-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <FaArrowRotateLeft/>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Easy Returns
                </h3>
                <p className="text-xs text-gray-500">14-day return policy</p>
              </div>
            </div>
            <div
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="bg-purple-50 text-2xl text-purple-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <FaHeadset/>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  24/7 Support
                </h3>
                <p className="text-xs text-gray-500">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
