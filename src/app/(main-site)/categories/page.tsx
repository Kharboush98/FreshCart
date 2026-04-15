import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaLayerGroup } from 'react-icons/fa';
import { CategoryI } from '@/types/cart.type';
import { getCategories } from '@/lib/api';


export default async function Categories() {

    const categories : CategoryI[] = await getCategories();

  return (
    <>
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={
                      <Link className="text-white" href="/">
                        Home
                      </Link>
                    }
                  />
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />

                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    Categories
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaLayerGroup className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Categories
              </h1>
              <p className="text-white/80 mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {
              categories && categories.map((cat)=> 
            <Link
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
              href={`/categories/${cat._id}`}
              key={cat._id}
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                <Image
                  alt={cat.slug}
                  width={300}
                  height={300}
                loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={cat.image}
                />
              </div>
              <h3 className="font-bold text-gray-900 text-center group-hover:text-primary-600 transition-colors">
                {cat.name}
              </h3>
              <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-primary-600 flex items-center gap-1">
                  View Subcategories
                  <FaArrowRight />
                </span>
              </div>
            </Link>
              )}

          </div>
        </div>
      </div>
    </>
  );
}
