"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FaArrowLeft, FaBox, FaCcAmex, FaCcVisa, FaCheck, FaCity, FaCreditCard, FaHome, FaInfoCircle, FaMoneyBill, FaPhone, FaReceipt, FaShoppingBag, FaTruck, FaWallet } from "react-icons/fa";
import { FaLocationDot, FaShieldHalved } from "react-icons/fa6";
import { IoShieldHalfOutline } from "react-icons/io5";
import { RiMastercardFill } from "react-icons/ri";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ShippingSchema } from "@/schemas/auth.schemas";
import { CartI, CartProductI, ShipDataI } from "@/types/cart.type";
import { CashCheckout, getCart } from "@/actions/cart.actions";
import { CartContext } from "@/context/cart-provider";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Checkout() {

  const router = useRouter()

  const [isLoading , setIsLoading] = useState(false);

  const {cartId , getCartData , totalCartPrice} = useContext(CartContext);
  

  const form = useForm({
      resolver: zodResolver(ShippingSchema),
      defaultValues: {
          shippingAddress: {
            city : "",
            details: "",
            phone: "",
            postalCode: ""
          }
      }
  });

  async function handleCheckout(data: ShipDataI)
  {
    try {
      setIsLoading(true)
      const response = await CashCheckout(data , cartId);
      toast.success("Checkout Successful");
      getCartData()
      router.push("/")

    } catch (error) {
      console.log(error)
      toast.error((error as Error).message)
    } finally {
      setIsLoading(false)
    }

  }

  //getting the items ion cart
  const [products , setProducts] = useState<CartProductI[]>([])


  async function getAllProductsInCart() {
    try {
      setIsLoading(true)
      const response :CartI = await getCart();
      console.log(response);

      setProducts(response.data.products);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=> {
      getAllProductsInCart();
    }, [])

  return (
    <>
      <div className="container mx-auto py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/">Home</Link>} />
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/cart">Cart</Link>} />
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto my-8 ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="bg-linear-to-br from-primary to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                <FaReceipt />
              </span>
              Complete Your Order
            </h1>
            <p className="text-gray-500 mt-2">
              Review your items and complete your purchase
            </p>
          </div>
          <Link
            href="/cart"
            className="flex items-center gap-2 text-primary hover:text-green-700 font-medium px-4 py-2 rounded-lg hover:bg-green-100 transition-all"
          >
            <FaArrowLeft className="text-lg" />
            <span>Back to Cart</span>
          </Link>
        </div>
      </div>

      <form
        className="container mx-auto mb-8"
        onSubmit={form.handleSubmit(handleCheckout)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="bg-linear-to-r from-primary to-green-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaHome />
                  Shipping Address
                </h2>
                <p className="text-green-100 text-sm mt-1">
                  Where should we deliver your order?
                </p>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <FaInfoCircle />
                  </div>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Delivery Information
                    </p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>
                </div>

                <Controller
                  name="shippingAddress.city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        City <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FaCity />
                        </div>
                        <Input
                          {...field}
                          id={field.name}
                          type="text"
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. Cairo, Alexandria, Giza"
                          autoComplete="off"
                          className="w-full px-15 py-6 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="shippingAddress.details"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Street Address <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FaLocationDot />
                        </div>
                        <Input
                          {...field}
                          id={field.name}
                          type="text"
                          aria-invalid={fieldState.invalid}
                          placeholder="Street name, building number, floor, apartment..."
                          autoComplete="off"
                          className="w-full px-15 py-6 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="shippingAddress.phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FaPhone />
                        </div>
                        <Input
                          {...field}
                          id={field.name}
                          type="numeric"
                          aria-invalid={fieldState.invalid}
                          placeholder="01xxxxxxxxx"
                          autoComplete="off"
                          className="w-full px-15 py-6 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          Egyptian numbers only
                        </span>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="shippingAddress.postalCode"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Postal Code <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FaLocationDot />
                        </div>
                        <Input
                          {...field}
                          id={field.name}
                          type="numeric"
                          aria-invalid={fieldState.invalid}
                          placeholder="12345"
                          autoComplete="off"
                          className="w-full px-15 py-6 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="bg-linear-to-r from-primary to-green-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaWallet />
                  Payment Method
                </h2>
                <p className="text-green-100 text-sm mt-1">
                  Choose how you'd like to pay
                </p>
              </div>
              <div className="p-6 space-y-4">
                <button
                  type="button"
                  className="w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group border-green-500 bg-linear-to-r from-green-50 to-emerald-50 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all bg-linear-to-br from-green-500 to-primary text-white shadow-lg shadow-green-500/30">
                    <FaMoneyBill />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-green-700">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all bg-primary text-white">
                    <FaCheck />
                  </div>
                </button>
                <button
                  type="button"
                  className="w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group border-gray-200 hover:border-green-200 hover:bg-gray-50"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all bg-gray-100 text-gray-400 group-hover:bg-gray-200">
                    <FaCreditCard />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-gray-900">Pay Online</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Secure payment with Credit/Debit Card via Stripe
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-blue-600">
                      <FaCcVisa />
                      <RiMastercardFill />
                      <FaCcAmex />
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 border-gray-200" />
                </button>
                <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <IoShieldHalfOutline className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Secure &amp; Encrypted
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
              <div className="bg-linear-to-r from-primary to-green-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaShoppingBag />
                  Order Summary
                </h2>
                <p className="text-green-100 text-sm mt-1">5 items</p>
              </div>

              <div className="p-5">
                <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                  {/* Items in cart */}

                  {products &&
                    products.map((products) => (
                      <div key={products.product._id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                          <Image
                            alt={products.product.title}
                            className="w-full h-full object-contain"
                            src={products.product.imageCover}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {products.product.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {products.count} × {products.price} EGP
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          {products.count * products.price}
                        </p>
                      </div>
                    ))}
                </div>
                <hr className="border-gray-100 my-4" />
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{totalCartPrice} EGP</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <FaTruck />
                      Shipping
                    </span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">
                        {totalCartPrice}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">EGP</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 mt-6 bg-linear-to-r from-primary to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
                >
                  {isLoading ? <Spinner /> : <FaBox />}
                  Place Order
                </Button>

                <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaShieldHalved className="text-primary" />
                    <span>Secure</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaTruck className="text-blue-600" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaBox className="text-orange-600" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
