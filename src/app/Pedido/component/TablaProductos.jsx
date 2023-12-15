'use client'
import useFront from "@/hooks/useFront";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


export default function TablaProductos({ productsTable, setAgregarCompra, setProductsTable, setAgregarPedidos, setAuxOrder }) {
	const {OrderPost, UserDataJson} = useFront()
	console.log(UserDataJson)

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="-mx-4 mt-8 sm:-mx-0">
				<table className="min-w-full divide-y divide-gray-300 bg-BlancoIvory border rounded-md">
					<thead className="bg-azul-pantone text-BlancoIvory">
						<tr className={`grid grid-cols-1 gap-4  ${UserDataJson.idType !== 2 ? "md:grid-cols-5" : "md:grid-cols-4" } `}>
							<th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-white ">
								SKU
							</th>
							<th
								scope="col"
								className=" px-3 py-3.5 text-center text-sm font-semibold text-white sm:table-cell "
							>
								Nombre Producto
							</th>
							{UserDataJson?.idType !== 2 && <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white ">
								Sucursal
							</th>}
							<th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white ">
								Cantidad
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{productsTable?.map((compra, id) => (
							<tr key={id} className={`grid  grid-cols-1 gap-8 ${UserDataJson.idType !== 2 ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
								<td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-500 sm:pl-0 ">
									{compra.code}
								</td>
								<td className=" whitespace-nowrap px-3 text-center py-4 text-sm text-gray-500  ">
									{compra.name}
								</td>

								{UserDataJson?.idType !== 2 && <td className=" whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 ">

									{JSON.parse(compra.idBranch).name}
								</td>}

								<td className=" whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500  ">
									{compra.cantidad}
								</td>
								{/* <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
									<button className=" bg-rojo-pantone px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50">
										Editar
									</button>
								</td> */}
								<td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-full flex justify-end md:justify-center ">
									<button
										onClick={() => { setProductsTable(prev => prev.filter(el => el.idRepo !== compra.idRepo))}}
										className='bg-negro text-rojo-pantone px-2 py-1 rounded-md hover:bg-opacity-80'
									>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
										</svg>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="w-full flex justify-end my-10">
				<button onClick={() => { OrderPost(productsTable,setAgregarPedidos,setAuxOrder)}} className="bg-rojo-pantone px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 ">
					Enviar
				</button>
			</div>
		</div>
	)
}
