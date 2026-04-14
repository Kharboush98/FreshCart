"use client"
import Image from 'next/image';
import React from 'react'
import {FaClock, FaEye, FaFacebook, FaGoogle, FaShieldAlt, FaStar, FaTruck, FaUser, FaUsers } from "react-icons/fa";
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { 
Field,
FieldDescription,
FieldError,
FieldGroup,
FieldLabel, } from '@/components/ui/field';

import { Button } from '@/components/ui/button';
import { regisaterTypeSchema, registerSchema } from '@/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/lib/auth.services';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export default function Register() {

    const router = useRouter()

    const form = useForm({
        resolver:zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        }
    });

    async function handleRegister (data:regisaterTypeSchema)
    {
        // console.log(data);
        const response = await registerUser(data);
        console.log(response);

        if(response.message === "success")
        {
            router.push("/login");
            //save
            toast.success("User Register Successfully")
        } else {
            toast.error("User Register Failed")
        }
    }


  return (
    <>
        <div className="container py-16 mx-auto px-4" id="register-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
                <div className="hidden lg:block">
                    <div className="text-start space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-gray-800">
                                Welcome to <span className="text-primary">FreshCart</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                Join thousands of happy customers who enjoy frsh groceries
                                delivered right to their doorstep
                            </p>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                                <FaStar className="text-primary text-[18px]" />
                                </div>
                                <div>
                                <h4 className="font-semibold text-gray-900 text-md">
                                    Premium Quality
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    premium quality products sourced from trusted suppliers
                                </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                                <FaTruck className="text-primary text-[18px]" />
                                </div>
                                <div>
                                <h4 className="font-semibold text-gray-900 text-md">
                                    Fast Delivery
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Same-day delivery available in most areas
                                </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                                    <FaShieldAlt className="text-primary text-[18px]" />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 text-md">
                                        Secure Shopping
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Your data and payments are completely safe
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="bg-white rounded-2xl shadow-xl p-3 lg:p-6">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary-light flex items-center justify-center">
                                        <FaUser className="text-primary" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-md">
                                            Sarah Johnson
                                        </h4>
                                        <div className='flex flex-row gap-1 text-amber-400'>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-md font-semibold">
                                    "FreshCart has transformed my shopping experience. The quality of the
                                    products is outstanding, and the delivery is always on time. Highly
                                    recommend!"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                        <div className="text-center mb-8">
                            <span className="text-3xl font-bold text-gray-700">
                                Create Your Account
                            </span>
                            <p className="text-gray-600">
                                Start your fresh journey with us today
                            </p>
                        </div>

                        <div className="flex gap-3 mb-4">
                            <button
                            type="button"
                            className="w-full flex-1 flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                            >
                                <FaGoogle className="text-red-500" />
                                <span className="font-medium text-gray-700">
                                    Continue with Google
                                </span>
                            </button>

                            <button
                            type="button"
                            className="w-full flex-1 flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                            >
                                <FaFacebook className="text-blue-600" />
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
                                    OR
                                </span>
                            </div>
                        </div>

                        <form className="space-y-5" onSubmit={form.handleSubmit(handleRegister)}>
                            <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
                                        Name *
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type='text'
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Name"
                                        autoComplete="off"
                                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"/>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                            />

                            <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
                                        Email Address *
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type='email'
                                        aria-invalid={fieldState.invalid}
                                        placeholder="name@example.com"
                                        autoComplete="off"
                                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"/>
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
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type='password'
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Create strong password"
                                        autoComplete="off"
                                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"                                    />
                                    <FieldDescription>
                                        Must be at least 8 characters with numbers and symbols
                                    </FieldDescription>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                            />

                            <Controller
                            name="rePassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
                                        rePassword *
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type='password'
                                        aria-invalid={fieldState.invalid}
                                        placeholder="reEnter your password"
                                        autoComplete="off"
                                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"/>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                            />


                            <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
                                        Phone Number *
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type='text'
                                        aria-invalid={fieldState.invalid}
                                        placeholder="+1 234 567 8900"
                                        autoComplete="off"
                                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all"/>
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
                                    <span className="ml-3 text-sm text-gray-700 font-semibold">
                                        I agree to the <span className='text-primary'>terms of Service </span>
                                        and <span className='text-primary'>Privacy policy</span>
                                    </span>
                                </label>
                            </div>

                            <Button
                            type="submit"
                            className="w-full px-6 py-6 bg-primary text-white rounded-xl hover:bg-primary transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Create my account
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
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
