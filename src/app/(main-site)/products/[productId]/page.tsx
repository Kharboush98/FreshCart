import { ProdI } from '@/types/postType';

export default async function ProductDetails({
    params,
}: {
    params: Promise<{ productId: string }>   
}) {

    const {productId} = await params;
    console.log(productId);

    const response = await fetch(`${process.env.BASE_URL}/products/${productId}` ,);

    const data = await response.json();
    const products: ProdI = data.data;
    console.log(products);

    return (
        <div>
            ProductDetails
        </div>
    )
}
