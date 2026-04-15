"use client"
import Image from 'next/image';
import MainImg from "../../../../../public/assets/ShoppingCart.png";
import {Controller, useForm } from 'react-hook-form';
import {FaClock, FaEye, FaFacebook, FaGoogle, FaShieldAlt, FaStar, FaTruck, FaUsers } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';
import { IoLockClosed } from 'react-icons/io5';

import { Input } from '@/components/ui/input';
import { 
Field,
FieldDescription,
FieldError,
FieldGroup,
FieldLabel, } from '@/components/ui/field';
import { Button } from '@base-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, loginTypeSchema } from '@/schemas/auth.schemas';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/auth.services';
import { toast } from 'sonner';

import { signIn, signOut } from "next-auth/react";
    

export default function Login() {

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email : "",
            password: "",
        }
    });

    async function handleLogin(data: loginTypeSchema)
    {
        // const response = await loginUser(data);
        // console.log(response);

        // if(response.message === "success")
        // {
        //     router.push("/");
        //     toast.success("Logged in Successfully")
        // } else {
        //     toast.error("User Log in Failed")
        // }


        const response = await signIn("credentials", {
            email: data.email,
            password : data.password,
            redirect: false,
            callbackUrl: "/",
        });

        // console.log(response)
        if (response?.ok)
        {
            router.push("/")
            toast.success("Logged in Successfully")
        } else {
            toast.error(response?.error || "User Log in Failed")
        }
    }


  return (
    <>
      <div className="container py-16 mx-auto px-4" id="login-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

          <div className="hidden lg:block">
            <div className="text-center space-y-6">
              <Image
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
                alt="cart illustration"
                src={MainImg}
                loading='eager'
              />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  FreshCart - Your One-Stop Shop for Fresh Products
                </h2>
                <p className="text-lg text-gray-600">
                  Join thousands of happy customers who trust FreshCart for
                  their daily grocery needs
                </p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaTruck className='text-primary'/>
                    Free Delivery
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className='text-primary'/>
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className='text-primary'/>
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-primary">
                    Fresh<span className="text-gray-800">Cart</span>
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome Back!
                </h1>
                <p className="text-gray-600">
                  Sign in to continue your fresh shopping experience
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <FaGoogle className='text-red-500' />
                  <span className="font-medium text-gray-700">
                    Continue with Google
                  </span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <FaFacebook className='text-blue-600' />
                  <span className="font-medium text-gray-700">
                    Continue with Facebook
                  </span>
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    OR CONTINUE WITH EMAIL
                  </span>
                </div>
              </div>

              <form className="space-y-6" onSubmit={form.handleSubmit(handleLogin)}>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
                                Email Address *
                            </FieldLabel>
                            <div className='relative'>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type='email'
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your Email"
                                    autoComplete="off"
                                    className="w-full px-12 py-6 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"/>
                                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
                                Password *
                            </FieldLabel>
                            <div className='relative'>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type='password'
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your password"
                                    autoComplete="off"
                                    className="w-full px-12 py-6 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"/>
                                <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <Button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                    <FaEye className='text-gray-400' />
                                </Button>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      className="h-4 w-4 text-primary accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
                      type="checkbox"
                      name="rememberMe"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      Keep me signed in
                    </span>
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sign In
                </Button>
              </form>
              <div className="text-center mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-600">
                  New to FreshCart?
                  <a
                    className="text-primary hover:text-primary ms-2 font-semibold cursor-pointer"
                    href="/signup"
                  >
                    Create an account
                  </a>
                </p>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <IoLockClosed  className='text-xl' />
                  SSL Secured
                </div>
                <div className="flex items-center gap-1">
                  <FaUsers   className='text-xl' />
                  50K+ Users
                </div>
                <div className="flex items-center gap-1">
                    <FaStar  className='text-xl' />
                  4.9 Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
