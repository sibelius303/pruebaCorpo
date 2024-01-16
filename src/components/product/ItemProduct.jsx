import Image from 'next/image';
import Link from 'next/link';

export default function ItemProduct({ product }) {

    return <Link href={`/productos/${product.id}`} className="group md:h-[400px] h-[200px] bg-white rounded-xl shadow hover:shadow-2xl flex md:block cursor-pointer">
        <div className="block p-2 h-full md:h-[55%] w-[30%] md:w-full overflow-hidden bg-white xl:aspect-h-8 xl:aspect-w-7 border-b-2 border-b-lightgray rounded-tl-xl rounded-bl-xl md:rounded-tr-xl md:rounded-bl-none">
            <Image
                src={product.images?.at(0)?.src}
                alt={product.images?.at(0)?.alt}
                width={500}
                height={500}
                className="w-full h-full object-cover object-center rounded-tl-xl rounded-bl-xl md:rounded-tr-xl md:rounded-bl-none"
            />
        </div>
        <div className="flex flex-col justify-between px-3 pb-2 h-full md:h-[45%] w-[70%] md:w-full">
            <span className="flex flex-col justify-between py-1 border-b border-gray-400 h-full">
                <h3 className="mt-5 md:mt-2  mb-2 md:mb-5 text-md md:text-sm text-gray-800">{product.name}</h3>
                <span className="block pb-2 text-gray-500 text-sm">{product.description.slice(0,50)}{product.description.length>100?'...':''}</span>
            </span>
            <span className="mt-2 py-2 flex justify-center w-full text-sm text-blue-400 hover:text-blue-500 hover:bg-blue-100 rounded-md">Ver</span>
        </div>
    </Link>
}