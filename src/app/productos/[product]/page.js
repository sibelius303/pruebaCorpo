import ProductList from '@/components/product/ProductList'

export default async function Page({ params }) {

    return (
        <main className="flex min-h-screen flex-col">
            <ProductList producto={params.product}/>
        </main>
    )
}