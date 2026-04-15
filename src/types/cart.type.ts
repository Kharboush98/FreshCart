export interface CartI{
    status: string;
    message: string;
    numOfCartItems: number;
    data: CartDataI;
    cartId : string;
}

export interface CartDataI {
  _id: string
  cartOwner: string
  products: CartProductI[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartProductI {
  count: number
  _id: string
  price: number
  product: ProductI
}

export interface ProductI {
  subcategory: SubcategoryI[]
  _id: string
  title: string
  slug: string
  quantity: number
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  id: string
}

export interface SubcategoryI {
  _id: string
  name: string
  slug: string
  category: string
}

export interface CategoryI {
  _id: string
  name: string
  slug: string
  image: string
}

export interface BrandI {
  _id: string
  name: string
  slug: string
  image: string
}


// Checkout 

export interface ShipDataI{
  shippingAddress: {
    city : string,
    details: string,
    phone: string,
    postalCode: string
  }
}

//whislist 

// export interface 