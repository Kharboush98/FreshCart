import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaFolderOpen } from 'react-icons/fa';
import { CategoryI, SubcategoryI } from '@/types/cart.type';
import { getAllSubCategories, getAllSubCategoriesInCategory, getSingleCategories } from '@/lib/api';
import Image from 'next/image';
import { ProdI } from '@/types/postType';


export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ categoriesId: string }>;
}) {

  const {categoriesId} = await params;

  const subCat :SubcategoryI[] = await getAllSubCategoriesInCategory(categoriesId); 
  console.log(subCat , "category Id")

  const category : CategoryI = await getSingleCategories(categoriesId);
  console.log(category , "cat")

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
                  <BreadcrumbLink
                    render={
                      <Link className="text-white" href="/Categories">
                        Categories
                      </Link>
                    }
                  />
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />

                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    {category?.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <Image
                alt={category?.name}
                className="w-[50] h-[50] object-contain group-hover:scale-110 transition-transform duration-500"
                src={category.image}
                width={200}
                height={200}
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category?.name}
              </h1>
              <p className="text-white/80 mt-1">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <a
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6"
          href="/categories"
        >
          <FaArrowLeft />
          <span>Back to Categories</span>
        </a>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            40 Subcategories in {category.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {subCat && subCat.map((subcategory)=> (
            <Link
              key={subcategory._id}
              className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
              href={`/#`}
            >
              <div className="w-14 h-14 text-primary text-2xl rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                <FaFolderOpen />
              </div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors mb-2">
                {subcategory.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Browse Products</span>
                <FaArrowRight />
              </div>
            </Link>  
          ))}
          
        </div>
      </div>
    </>
  );
}
