import ImageSelector from '@/components/product/details/ImageSelector';
import Details from '@/components/product/details/Details';
import CardRelatedProduct from '@/components/CardRelatedProduct';
import HeartButton from '@/components/product/HeartButton';
import ShareButton from '@/components/product/ShareButton';
import ShareModal from '@/components/product/details/ShareModal';
// import ProductDetail from '@/components/product/details/ProductDetail'
import { products } from '@/tools/mockup/products.mockup';

export default async function Products({ params }) {
    const { id } = params;
    const product = products.find( product => product.id == id )
    return (
        <main className="flex min-h-screen flex-col">
            <div className="mx-auto max-w-7xl bg-white sm:px-12 pt-10 sm:pt-20 lg:px-16">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					{/* Product */}
					<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 border-b-2 border-gray-400 pb-3">
						{/* Image gallery */}
						<ImageSelector images={product?.images} />

						{/* Product info */}
						<div className="mt-4 md:mt-0 px-5 pt-8 bg-white">
							<h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

							<div className="mt-6">
								<h3 className="sr-only">Description</h3>
								<div
									className="space-y-6 text-base text-gray-700"
									dangerouslySetInnerHTML={{ __html: product.description }}
								/>
							</div>

							<form className="mt-6">
								<div className="mt-10 flex gap-2">
									<HeartButton
										id={product.id}
										className="p-3 text-blue-400 border-2 border-blue-400 rounded-md hover:text-blue-500 hover:bg-blue-100"/>
									<ShareButton
										id={product.id}
										className="p-3 text-blue-400 border-2 border-blue-400 rounded-md hover:text-blue-500 hover:bg-blue-100"/>
								</div>
							</form>

							<section aria-labelledby="details-heading" className="mt-12">
								<h2 id="details-heading" className="sr-only">
									Detalles Adicionales
								</h2>

								<div className="divide-y divide-gray-200 border-t">
									{product?.details?.map((detail) => <Details key={detail.name} name={detail.name} items={detail.items}/> )}
								</div>
							</section>
						</div>
					</div>

					{ product?.relatedProducts?.length>0 && <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
						<h2 id="related-heading" className="text-xl font-bold text-gray-900">
							Productos Relacionados
						</h2>

						<div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
							{product.relatedProducts?.map((product) => <CardRelatedProduct key={product.id} product={product} /> )}
						</div>
					</section>}
				</div>
				<ShareModal url={"https://heroicons.com/"+product.id} />
			</div>
        </main>
    )
}
