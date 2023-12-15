'use client'

import Modal from "@/components/Layout/Modal"
import { useState } from "react"
import Image from "next/image";
import noImage from "../../../../public/imagenNoDisponible.png"



export default function TablaProductos({ agregarProducto, arrFilter, priceActive, UserDataJson, currencyActive }) {
	//const { dataProducts, GetListProduct } = useFront()
	const [open, setOpen] = useState(false)
	const [dataDetails, setDataDetails] = useState(false);
	const [urlImage, setUrlImage] = useState("")

	return (
		<div className="">
			<div className=" mt-8 sm:-mx-0">
				<table className="min-w-full divide-y divide-gray-300 bg-BlancoIvory border rounded-md">
					<thead className="bg-azul-pantone text-BlancoIvory">
						<tr className="grid grid-cols-2 gap-4 pl-7 md:grid-cols-5  lg:pr-7">
							<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-0 ">
								Imagen
							</th>
							<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-0 ">
								SKU
							</th>
							<th
								scope="col"
								className=" px-3 py-3.5 text-left text-sm font-semibold  "
							>
								Nombre Producto
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold  ">
								Precio
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold  ">
								Detalle
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{arrFilter?.length > 0 ? arrFilter?.map((compra, id) => (

							<tr key={id} className="grid pl-7 grid-cols-2 gap-4 cursor-pointer hover:bg-Gris md:grid-cols-5  lg:pr-7">
								<td onClick={() => agregarProducto(compra)} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm  font-medium  sm:pl-0 ">
									{UserDataJson?.idType !== 2 && <Image src={compra?.image === null ? noImage : compra?.image[0]?.url} width={100} height={100} priority className='w-10 h-10 rounded-full' alt='fotoPerfil' />}
								</td>
								<td onClick={() => agregarProducto(compra)} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0 ">
									{compra.code}
								</td>
								<td onClick={() => agregarProducto(compra)} className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 overflow-x-hidden ">
									{compra.name}
								</td>
								<td onClick={() => agregarProducto(compra)} className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
									<p>
										{priceActive === 1 && currencyActive === 'BS' && compra.price1.toFixed(2)}
										{priceActive === 2 && currencyActive === 'BS' && compra.price2.toFixed(2)}
										{priceActive === 1 && currencyActive === 'USD' && compra.convertCurrency.usd1.toFixed(2)}
										{priceActive === 2 && currencyActive === 'USD' && compra.convertCurrency.usd2.toFixed(2)}
										{priceActive === 1 && currencyActive === 'EUR' && compra.convertCurrency.eur1.toFixed(2)}
										{priceActive === 2 && currencyActive === 'EUR' && compra.convertCurrency.eur2.toFixed(2)}
										{currencyActive}
									</p>
								</td>
								<td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
									<button onClick={() => { setDataDetails(compra); setOpen(true); setUrlImage(compra?.image === null ? noImage : compra?.image[0]?.url) }} className=" bg-rojo-pantone px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50">
										Detalle
									</button>
								</td>
							</tr>
						)) : <h1 className="w-full text-center">No hay elementos para mostrar</h1>}
					</tbody>
				</table>
			</div>
			<Modal open={open} setOpen={setOpen} dataDetails={dataDetails} boton1={"Agregar a Carrito"} boton2={'Cancelar'} agregarProducto={agregarProducto}>
				<h1 className="text-xl text-black font-bold text-center mb-4">
					{dataDetails?.name}
				</h1>
				<div className="flex gap-2">

					<div className="w-1/2 p-2">
						<>
							<div className="h-3/4">
								{<Image src={urlImage} loading='lazy' width={325} height={325} quality={50} className="h-72 w-72 max-h-72 rounded-md" alt="image product" />}
							</div>
							<div className="h-1/4 flex gap-3 mt-2"> {dataDetails?.image && dataDetails?.image.length > 1 && <div className="h-1/4 flex gap-3 mt-2">{
								dataDetails?.image?.map((el) => (<button key={el.url} onClick={() => setUrlImage(el.url)}><Image src={el.url === null ? noImage : el.url} width={325}
									height={325} className="w-16 h-16" alt="" priority /></button>))
							}
							</div>}
							</div>
						</>



					</div>
					<div className="w-1/2">

						<div className="flex flex-col gap-4 mt-2">
							<p><b>SKU:</b> {dataDetails?.code} </p>
							<p><b>Descripcion:</b> {dataDetails?.descrip} </p>
							{/* <p><b>Costo:</b> {dataDetails?.cost} </p> */}
							<p><b>Precio 1:</b> {dataDetails?.price1} </p>
							<p><b>Precio 2:</b> {dataDetails?.price2} </p>
							{/* <p><b>Precio Distribuidor:</b> {dataDetails?.price3} </p>
                            <p><b>Precio Distribuidor sin Estuche:</b> {dataDetails?.price4} </p> */}
							<p><b>Cantidad disponible:</b> {dataDetails?.qty} </p>
						</div>

					</div>
				</div>
			</Modal>
		</div >
	)
}
