import AddSpecificProdToCart from "@/components/cart/AddSpecificProdToCart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProdToWishlist from "@/components/WishList/AddProdToWishlist";
import { getProducts } from "@/lib/api";

import { ProdI } from "@/types/postType";
import Image from "next/image";

import Link from "next/link";
import {
  FaBolt,
  FaCheck,
  FaEye,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaRegStar,
  FaShieldAlt,
  FaShoppingCart,
  FaStar,
  FaTruck,
} from "react-icons/fa";
import {
  FaArrowRotateLeft,
  FaArrowsRotate,
  FaShareNodes,
} from "react-icons/fa6";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  console.log(productId);

  const response = await fetch(`${process.env.BASE_URL}/products/${productId}`);

  const data = await response.json();
  const product: ProdI = data.data;
  console.log(product , "My product");

  const products: ProdI[] = await getProducts();

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
              <BreadcrumbLink render={<Link href="/products">Products</Link>} />
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section id="product-detail" className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div id="product-images" className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                <Carousel>
                  <CarouselContent>
                    {product.images.map((img) => (
                      <>
                        <CarouselItem>
                          <Image
                            src={img}
                            width={1000}
                            height={1000}
                            className="w-full object-cover h-90"
                            alt={product.title}
                            loading="eager"
                            fetchPriority="high"
                          />
                        </CarouselItem>
                      </>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-1.5" />
                  <CarouselNext className="absolute right-1.5" />
                </Carousel>
              </div>
            </div>

            <div id="product-info" className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link
                    className="bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition"
                    href={`/categories/${product.category._id}`}
                  >
                    {product.title}
                  </Link>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {product.brand.name}
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>
                <div className="flex items-center gap-1 flex-row">
                  {[0, 1, 2, 3, 4].map((star, index) => {
                    const filledStars =
                      index < Math.floor(product.ratingsAverage);
                    return (
                      <>
                        {filledStars ? (
                          <FaStar key={index} className="text-amber-400" />
                        ) : (
                          <FaRegStar key={index} className="text-gray-400" />
                        )}
                      </>
                    );
                  })}
                </div>
                <span className="text-sm text-gray-600">3.4 (5 reviews)</span>
                <div className="flex items-center flex-wrap gap-3 my-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price} EGP
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    In Stock
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-5 mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                      <button
                        id="decrease-qty"
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
                        disabled
                      >
                        <FaMinus />
                      </button>
                      <input
                        min={1}
                        max={product.quantity}
                        className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                        id="quantity"
                        type="number"
                        defaultValue={1}
                      />
                      <button
                        id="increase-qty"
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">{product.quantity} available</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="text-2xl font-bold text-primary">
                      {product.price} EGP
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <AddSpecificProdToCart prodID={product._id}/>
                  <button
                    id="buy-now"
                    className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <FaBolt />
                    Buy Now
                  </button>
                </div>

                <div className="flex gap-3 mb-6">
                  <AddProdToWishlist prodID={product._id} />
                  {/* <button
                    id="wishlist-button"
                    className="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                  >
                    <FaRegHeart />
                    Add to Wishlist
                  </button> */}
                  <button className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary hover:text-primary transition">
                    <FaShareNodes />
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary-light text-primary-600 rounded-full flex items-center justify-center shrink-0">
                        <FaTruck className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Free Delivery
                        </h4>
                        <p className="text-xs text-gray-500">Orders over $50</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary-light text-primary-600 rounded-full flex items-center justify-center shrink-0">
                        <FaArrowRotateLeft className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          30 Days Return
                        </h4>
                        <p className="text-xs text-gray-500">Money back</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary-light text-primary-600 rounded-full flex items-center justify-center shrink-0">
                        <FaShieldAlt className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Secure Payment
                        </h4>
                        <p className="text-xs text-gray-500">100% Protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="product-details-tabs" className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <Tabs defaultValue="Details">
                <TabsList variant="line" className="flex gap-2 m-2">
                  <TabsTrigger
                    value="details"
                    className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-gray-600"
                  >
                    Product Details
                  </TabsTrigger>

                  <TabsTrigger
                    value="reviews"
                    className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-gray-600"
                  >
                    Reviews
                  </TabsTrigger>

                  <TabsTrigger
                    value="ship"
                    className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-gray-600"
                  >
                    Shippings & returns
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <div className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          About this Product
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">
                            Product Information
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex justify-between text-sm">
                              <span className="text-gray-500">Category</span>
                              <span className="text-gray-900 font-medium">
                                {product.category.name}
                              </span>
                            </li>
                            <li className="flex justify-between text-sm">
                              <span className="text-gray-500">Subcategory</span>
                              <span className="text-gray-900 font-medium">
                                {product.subcategory
                                  .map((sub) => sub.name)
                                  .join(", ")}
                              </span>
                            </li>
                            <li className="flex justify-between text-sm">
                              <span className="text-gray-500">Brand</span>
                              <span className="text-gray-900 font-medium">
                                {product.brand.name}
                              </span>
                            </li>
                            <li className="flex justify-between text-sm">
                              <span className="text-gray-500">Items Sold</span>
                              <span className="text-gray-900 font-medium">
                                {product.sold}+ sold
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-x-3 text-sm text-gray-600">
                              <FaCheck className="text-primary" />
                              Premium Quality Product
                            </li>
                            <li className="flex items-center gap-x-3 text-sm text-gray-600">
                              <FaCheck className="text-primary" />
                              100% Authentic Guarantee
                            </li>
                            <li className="flex items-center gap-x-3 text-sm text-gray-600">
                              <FaCheck className="text-primary" />
                              Fast &amp; Secure Packaging
                            </li>
                            <li className="flex items-center gap-x-3 text-sm text-gray-600">
                              <FaCheck className="text-primary" />
                              Quality Tested
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-gray-900 mb-2">
                            {product.ratingsAverage}
                          </div>

                          <div className="flex justify-center items-center gap-1 text-2xl">
                            {[0, 1, 2, 3, 4].map((star, index) => {
                              const filledStars =
                                index < Math.floor(product.ratingsAverage);
                              return (
                                <>
                                  {filledStars ? (
                                    <FaStar
                                      key={index}
                                      className="text-amber-400"
                                    />
                                  ) : (
                                    <FaRegStar
                                      key={index}
                                      className="text-gray-400"
                                    />
                                  )}
                                </>
                              );
                            })}
                          </div>

                          <p className="text-sm text-gray-500 mt-2">
                            Based on {product.ratingsQuantity} reviews
                          </p>
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">
                              {product.ratingsAverage} star
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                style={{ width: "5%" }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 w-10">
                              5%
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">
                              4 star
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                style={{ width: "25%" }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 w-10">
                              25%
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">
                              3 star
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                style={{ width: "60%" }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 w-10">
                              60%
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">
                              2 star
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                style={{ width: "25%" }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 w-10">
                              25%
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">
                              1 star
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                style={{ width: "5%" }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 w-10">
                              5%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-6">
                        <div className="text-center py-8">
                          <FaStar className="mx-auto text-gray-200 text-5xl mb-2" />
                          <p className="text-gray-500">
                            Customer reviews will be displayed here.
                          </p>
                          <button className="mt-4 text-primary hover:text-secondary font-medium">
                            Write a Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ship">
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-linear-to-br from-primary-50 to-primary-100 rounded-lg p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 bg-primary-light text-white rounded-full flex items-center justify-center">
                              <FaTruck className="text-primary text-2xl" />
                            </div>
                            <h4 className="font-semibold text-gray-900">
                              Shipping Information
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                              <FaCheck />
                              <span>Free shipping on orders over $50</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                              <FaCheck />
                              <span>Standard delivery: 3-5 business days</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                              <FaCheck />
                              <span>
                                Express delivery available (1-2 business days)
                              </span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                              <FaCheck />
                              <span>Track your order in real-time</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 bg-primary-light text-white rounded-full flex items-center justify-center">
                              <FaArrowRotateLeft className="text-primary text-2xl" />
                            </div>
                            <h4 className="font-semibold text-gray-900">
                              Returns &amp; Refunds
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                              <FaCheck />
                              <span>30-day hassle-free returns</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                              <FaCheck />
                              <span>Full refund or exchange available</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                              <FaCheck />
                              <span>
                                Free return shipping on defective items
                              </span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                              <FaCheck />
                              <span>Easy online return process</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                        <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                          <FaShieldAlt className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Buyer Protection Guarantee
                          </h4>
                          <p className="text-sm text-gray-600">
                            Get a full refund if your order doesn't arrive or
                            isn't as described. We ensure your shopping
                            experience is safe and secure.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section id="similar-products" className="py-10">
        <div className="container mx-auto px-4 overflow-visible">
          <Carousel
            opts={{
              loop: false,
              align: "start",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-800">
                  You May Also <span className="text-emerald-600">Like</span>
                </h2>
              </div>
            </div>

            <CarouselContent>
              {products.slice(0, 10).map((prod) => (
                <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                  <div
                    key={prod._id}
                    id="product-card"
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden
                        transition-all duration-300 ease-out
                        hover:-translate-y-2 hover:-translate-x-1
                        hover:shadow-[8px_12px_30px_rgba(0,0,0,0.2)] hover:shadow-gray-300/50"
                  >
                    <div className="relative">
                      <Image
                        className="w-full h-60 object-contain bg-white"
                        alt={prod.title}
                        src={prod.imageCover}
                        width={100}
                        height={100}
                        decoding="async"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex flex-col space-y-2">
                        <button
                          className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500"
                          title="Add to wishlist"
                          tabIndex={0}
                        >
                          <FaRegHeart />
                        </button>
                        <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary shadow-sm">
                          <FaArrowsRotate />
                        </button>
                        <Link
                          className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary shadow-sm"
                          href={`/products/${prod._id}`}
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">
                        {prod.category.name}
                      </div>
                      <h3
                        className="font-medium mb-1 cursor-pointer "
                        title={prod.title}
                      >
                        <Link
                          className="line-clamp-1"
                          href={`/products/${prod._id}`}
                        >
                          {prod.title}
                        </Link>
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2 flex-row">
                          {[0, 1, 2, 3, 4].map((star, index) => {
                            const filledStars =
                              index < Math.floor(prod.ratingsAverage);
                            return (
                              <>
                                {filledStars ? (
                                  <FaStar
                                    key={index}
                                    className="text-amber-400"
                                  />
                                ) : (
                                  <FaRegStar
                                    key={index}
                                    className="text-gray-400"
                                  />
                                )}
                              </>
                            );
                          })}
                        </div>

                        <span className="text-xs text-gray-500">
                          {prod.ratingsAverage} ({prod.ratingsQuantity})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-800">
                            {prod.price} EGP
                          </span>
                        </div>
                        <button
                          className="h-10 w-10 rounded-full flex items-center justify-center transition bg-primary text-white hover:bg-primary-light hover:text-primary disabled:opacity-70"
                          tabIndex={0}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  );
}
