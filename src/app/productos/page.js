import ProductList from '@/components/product/ProductList'
import { products } from '../../tools/mockup/products.mockup';

export default async function Products() {

    return (
        <main className="flex min-h-screen flex-col">
            <ProductList products={products} />
        </main>
    )
}
