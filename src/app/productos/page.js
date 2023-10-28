import ProductList from '@/components/product/ProductList'
import InputSearch from '@/components/InputSearch';
import { products } from '../../tools/mockup/products.mockup';

export default async function Products() {

    return (
        <main className="flex min-h-screen flex-col">
            {/* <form className="flex flex-col md:flex-row justify-between items-center mb-4 bg-black opacity-90 p-3 gap-3">
                <ul className="flex flex-row justify-between w-full md:w-1/3 p-0 m-0">
                    <li><a className="text-white p-2 pb-0 border-b-2 border-b-white" href="#">Ascenso 1</a></li>
                    <li><a className="text-white p-2 pb-0" href="#">Ascenso 2</a></li>
                    <li><a className="text-white p-2 pb-0" href="#">Ascenso 3</a></li>
                </ul>
                <InputSearch />
                <select className="w-full md:w-1/3 p-2 border-2 border-white bg-white text-black rounded-md">
                    <option>Promoción 1</option>
                    <option>Promoción 2</option>
                    <option>Promoción 3</option>
                </select>
            </form> */}
            <ProductList products={products} />
        </main>
    )
}
