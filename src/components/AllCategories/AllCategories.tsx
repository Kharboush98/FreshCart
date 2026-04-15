import { getCategories } from '@/lib/api';
import { CategoryI } from '@/types/categories';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

export default async function AllCategories() {
    // const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories" , {
    //         method: "GET",
    //         cache: "force-cache",
    //     })
    
    //     const data = await response.json();
        // console.log(data.data);
    
        const categories : CategoryI[] = await getCategories();
        

  return (
    <>
      <section id="categories" className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div className="flex  items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-primary to-emerald-700 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Shop By <span className="text-primary">Category</span>
              </h2>
            </div>
            <Link
              className="text-primary self-end sm:self-auto hover:text-emerald-700 font-medium flex items-center gap-2 cursor-pointer"
              href="categories"
            >
              <span>View All Categories</span>
              <FaArrowRightLong />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {
              categories && categories.map((cat)=>
            <Link
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
              href={`/categories/${cat._id}`}
              key={cat._id}
            >
              <div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
                <Image
                  alt={cat.slug}
                  loading="lazy"
                  width={300}
                  height={300}
                  decoding="async"
                  className="w-full h-full object-cover"
                  src={cat.image}
                  style={{ color: "transparent" }}
                />
              </div>
              <h3 className="font-medium">{cat.name}</h3>
            </Link>
                )}
          </div>
        </div>
      </section>
    </>
  );
}
