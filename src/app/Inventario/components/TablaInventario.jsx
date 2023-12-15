'use client'
import { Fragment, useEffect, useState } from "react"
import ModalInventario from "./ModalInventario"
import useFront from "@/hooks/useFront"
import Image from "next/image";
import Loader from "@/components/Loader";
import ModalEditarPedidos from "@/app/Pedido/component/ModalEditarPedidos";


export default function TablaInventario({ inventario, pending }) {
	const { dataInventario, dataSucursal, dataCategory, dataProducts, GetInventarioSearch, GetListConciliationSearchAdmin } = useFront()
	const [arrFilter, setArrFilter] = useState([]);
	const [open, setOpen] = useState(false);
	const [dataDetails, setDataDetails] = useState([]);
	const [valueInput, setValueInput] = useState("");
	const [sucursalBranch, setSucursalBranch] = useState("");
	const [category, setCategory] = useState("");
	const [filterAct, setFielterAct] = useState(0);
	const [pagActual, setPagActual] = useState(1);
	const [cantPag, setCantPag] = useState(10);
	const [valueClient, setValueClient] = useState("")


	useEffect(() => {
		setArrFilter(dataInventario)
	}, [dataInventario])

	useEffect(() => {
		setPagActual(1);
		setCantPag(10);
	}, [])

	let arraySlice = arrFilter && arrFilter?.slice(((pagActual * cantPag) - cantPag), cantPag * pagActual);
	const verificarElementos = Math.ceil(arrFilter?.length / cantPag);

	const totalPages = [];
	for (let i = 1; i <= verificarElementos; i++) {
		totalPages.push(i);
	}

	const nextPag = () => {
		setPagActual(pagActual + 1)
	}

	const previusPag = () => {
		setPagActual(pagActual - 1)
	}

	const validarNextBoton = (pagActual, verificarElementos) => {
		if (pagActual == verificarElementos) {
			return true
		} else {
			return false
		}
	}

	const validarPreviusBoton = (pagActual) => {
		if (pagActual == 1) {
			return true
		} else {
			return false
		}
	}



	return (
		<>
			<div className="px-4 pb-10 mb-7 sm:px-6 lg:px-8">
				<div className="border-b rounded-b-md  sm:-mx-0">
					<div className="min-w-full divide-y divide-gray-300  ">
						<div className="bg-azul-pantone rounded-t-md text-BlancoIvory">
							<div className="flex flex-col gap-y-5  lg:justify-between ">
								{inventario === 'Sucursal' && <div className={`flex flex-col md:flex-row  w-auto`} >
									<button
										onClick={() => { setArrFilter(dataInventario); setFielterAct(0) }}
										type="button"
										className={` lg:px-4 py-2.5 lg:rounded-l-md text-sm w-full lg:w-32 font-semibold hover:bg-rojo-pantone text-white shadow-sm ${filterAct === 0 ? 'bg-rojo-pantone' : 'bg-rojo-pantone bg-opacity-25'} `}
									>
										Total
									</button>
									<button
										onClick={() => { setArrFilter(dataInventario); setFielterAct(1); setArrFilter(prev => prev.filter(el => el.qty === 0)) }}
										type="button"
										className={` px-4 py-2.5 text-sm w-full lg:w-32 font-semibold text-white hover:bg-rojo-pantone shadow-sm ${filterAct === 1 ? 'bg-rojo-pantone' : 'bg-rojo-pantone bg-opacity-25'}`}
									>
										Sin Stock
									</button>
									<button
										onClick={() => { setArrFilter(dataInventario); setFielterAct(2); setArrFilter(prev => prev.filter(el => el.isFavorite === true)) }}
										type="button"
										className={` px-4 py-2.5 lg:rounded-r-md text-sm w-full lg:w-32 font-semibold hover:bg-rojo-pantone text-white shadow-sm ${filterAct === 2 ? 'bg-rojo-pantone' : 'bg-rojo-pantone bg-opacity-25'}`}
									>
										Favoritos
									</button>
								</div>}
								{ inventario === 'Sucursal' ? <div className=" w-full grid grid-cols-4">
									<div className=" flex flex-col w-full justify-end items-end text-negro">
										<label htmlFor="location" className="block text-sm w-full lg:w-full text-center font-medium leading-6 text-BlancoIvory">
											Producto
										</label>
										<input
											value={valueInput}
											className=" block md:rounded-l-md border-0 py-1.5 w-full lg:w-full pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => setValueInput(e.target.value)}
											placeholder="Buscar Producto por Nombre"
										/>
									</div>
									<div className=" flex flex-col w-full justify-end items-end text-negro">
										<label htmlFor="location" className="block text-sm text-center w-full lg:w-full font-medium leading-6 text-BlancoIvory">
											Sucursal
										</label>
										<select
											id="location"
											name="location"
											className=" block  border-0 py-1.5 w-full lg:w-full pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => {
												if (e.target.value === '') {
													setSucursalBranch("")
												} else {
													setSucursalBranch(e.target.value)
												}
											}}
										>
											<option value={''}>Todas</option>
											{
												dataSucursal?.map((el) => (
													<option key={el.id} value={el.name}>{el.name}</option>
												))
											}

										</select>
									</div>
									<div className=" flex flex-col w-full justify-end items-end text-negro">
										<label htmlFor="location" className="block text-sm text-center w-full lg:w-full font-medium leading-6 text-BlancoIvory">
											Categoria
										</label>
										<select
											id="location"
											name="location"
											className=" block  border-0 py-1.5 w-full lg:w-full pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => {
												if (e.target.value === '') {
													setSucursalBranch("")
												} else {
													setCategory(e.target.value)
												}
											}}
										>
											<option value={''}>Todas</option>
											{
												dataCategory?.map((el) => (
													<option key={el.id} value={el.name}>{el.name}</option>
												))
											}

										</select>
									</div>

									<div className=" flex flex-col w-full justify-end items-end">
										<button onClick={() => { GetInventarioSearch(valueInput, sucursalBranch, category); setValueInput(""); setCategory(""); setSucursalBranch(""); setFielterAct(0) }} className='flex items-center w-full bg-rojo-pantone px-4 py-1.5  text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50'>Buscar</button>
									</div>
								</div> : <div className=" w-full grid grid-cols-3">
									<div className=" flex flex-col w-full justify-end items-end text-negro">
										<label htmlFor="location" className="block text-sm w-full lg:w-full text-center font-medium leading-6 text-BlancoIvory">
											Cliente
										</label>
										<input
											value={valueClient}
											className=" block md:rounded-l-md border-0 py-1.5 w-full lg:w-full pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => setValueClient(e.target.value)}
											placeholder="Buscar Cliente por Nombre"
										/>
									</div>
									<div className=" flex flex-col w-full justify-end items-end text-negro">
										<label htmlFor="location" className="block text-sm w-full lg:w-full text-center font-medium leading-6 text-BlancoIvory">
											Producto
										</label>
										<input
											value={valueInput}
											className=" block md:rounded-l-md border-0 py-1.5 w-full lg:w-full pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => setValueInput(e.target.value)}
											placeholder="Buscar Producto por Nombre"
										/>
									</div>
									<div className=" flex flex-col w-full justify-end items-end">
										<button onClick={() => { GetListConciliationSearchAdmin(valueClient,valueInput); setValueInput(""); setValueClient("") }} className='flex items-center w-full bg-rojo-pantone px-4 py-1.5  text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50'>Buscar</button>
									</div>
								</div> 
								}
							</div>
							{
								<div className={`grid grid-cols-2 pl-1 gap-x-2 pt-6 justify-between ${inventario === 'Sucursal' ? 'md:grid-cols-6' : 'md:grid-cols-7'}`}>
									{
										inventario === 'Cliente' && <div className=" hidden md:block py-3.5 pl-4 text-center  pr-3  text-sm font-semibold  sm:pl-0">
											N de Orden
										</div>
									}

									<div scope="col" className=" hidden md:block py-3.5 pl-4 text-center  pr-3  text-sm font-semibold  sm:pl-0">
										{inventario === 'Sucursal' ? "SKU" : 'Cliente'}
									</div>
									<div
										scope="col"
										className=" px-3 py-3.5 text-center  text-sm font-semibold  "
									>
										{inventario === 'Sucursal' ? "Nombre" : 'SKU'}
									</div>
									<div scope="col" className="px-3 hidden md:block py-3.5 text-center text-sm font-semibold ">
										{inventario === 'Sucursal' ? "Categoria" : 'Nombre'}
									</div>
									{inventario === 'Sucursal' && <div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold ">
										Sucursal
									</div>}
									<div scope="col" className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold ">
										Cantidad {inventario === 'Cliente' && 'Pedida'}
									</div>
									{
										inventario === 'Cliente' && <div className=" hidden md:block py-3.5 pl-4 text-center  pr-3  text-sm font-semibold  sm:pl-0">
											Por Conciliar
										</div>
									}
									<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
										<span >Detalle</span>
									</div>
								</div>
							}

						</div>
						{pending ? <div className='w-full h-[400px] flex justify-center items-center border-x'>
							<Loader />
						</div> :
							<div className="divide-y border  divide-negro bg-BlancoIvory">
								{arraySlice?.length > 0 ? arraySlice?.map((compra, id) => (
									<div key={id} className={`grid grid-cols-2 gap-x-2 pl-1 cursor-pointer hover:bg-slate-300 ${inventario === 'Sucursal' ? 'md:grid-cols-6' : 'md:grid-cols-7'}`}>
										{
											inventario === 'Cliente' && <div className=" hidden md:block px-3 py-4 text-sm text-center text-gray-500 ">
												{compra.orderId}
											</div>
										}
										<div className=" hidden md:block overflow-x-auto text-center  py-4  w-full text-sm font-medium  sm:pl-0 ">
											{inventario === 'Sucursal' ? compra.code : compra.requested}
										</div>
										<div className="  overflow-x-auto text-center px-1  py-4 text-sm text-gray-500 ">
											{inventario === 'Sucursal' ? compra.name : compra.code}
										</div>
										<div className=" hidden md:block px-3 py-4 text-center text-sm text-gray-500 ">
											{inventario === 'Sucursal' ? compra.categoryName === '' ? 'sin categoria' : compra.categoryName : compra.name}
										</div>
										<div className=" hidden md:block px-3 py-4 text-sm text-center text-gray-500 ">
											{inventario === 'Sucursal' ? compra.branchName : compra.qty}
										</div>
										<div className=" hidden md:block px-3 py-4 text-sm text-center text-gray-500 ">
											{inventario === 'Sucursal' ? compra.qty : compra.qtyReg}
										</div>
										<div className=" whitespace-nowrap py-4 px-4 w-full text-sm text-gray-500 hover:opacity-50 ">
											<button onClick={() => { setOpen(true); setDataDetails(compra) }} className=" bg-rojo-pantone w-full px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm">
												Detalle
											</button>
										</div>
									</div>
								)) : <h1 className="w-full flex justify-center items-center h-screen">No hay elementos para mostrar</h1>}
							</div>}
						<div className="px-5 py-5 bg-BlancoIvory border rounded-br-md rounded-bl-md flex flex-col xs:flex-row items-center xs:justify-between">
							<div className=" xs:mt-0">
								<select className="block w-full bg-gray-100 text-gray-800 border rounded py-1  mb-3 leading-tight focus:bg-white " value={cantPag} onChange={(e) => setCantPag(e.target.value)}>
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
								</select>
							</div>
							{/* <span className="text-xs xs:text-sm text-gray-900">
								{arrFilter?.length === 0 ? (`Mostrando ${arrFilter?.length} de ${arrFilter?.length} `) : (`Mostrando ${cantPag < arrFilter?.length ? cantPag : arrFilter?.length} de ${arrFilter?.length}`)}

							</span> */}
							<div className="inline-flex mt-2 xs:mt-0">
								<button className={` ${validarPreviusBoton(pagActual) ? ("opacity-25 text-sm text-BlancoIvory bg-rojo-pantone font-semibold py-2 px-2 rounded-l") : ('text-sm text-BlancoIvory transition duration-150 hover:bg-opacity-50 bg-rojo-pantone font-semibold py-2 px-2 rounded-l')}`} onClick={() => { previusPag() }} disabled={validarPreviusBoton(pagActual)}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
									</svg>
								</button>
								&nbsp; &nbsp;
								<div className='flex gap-2 mx-1'>
									{totalPages &&
										totalPages.splice(Math.max(pagActual - 4, 0), 5).map((el) => (
											<Fragment key={el}>
												<button className={`text-sm text-BlancoIvory transition duration-150 hover:bg-opacity-80 bg-rojo-pantone font-semibold py-2 px-2 rounded ${el === pagActual && ("bg-opacity-50")} `} onClick={() => setPagActual(el)}>
													{el}
												</button>
											</Fragment>
										)
										)}
									<span className="text-sm text-BlancoIvory transition duration-150 hover:bg-opacity-25 bg-rojo-pantone font-semibold py-2 px-2 rounded">
										...
									</span>
									<button
										className={`text-sm text-BlancoIvory transition duration-150 hover:bg-opacity-25 bg-rojo-pantone font-semibold py-2 px-2 rounded ${totalPages.includes(pagActual) && "bg-opacity-50"
											}`}
										onClick={() => {
											if (totalPages[totalPages.length - 1]) {
												setPagActual(totalPages[totalPages.length - 1])
											} else {
												return
											}

										}}
									>
										{totalPages[totalPages.length - 1]}
									</button>

								</div>
								&nbsp; &nbsp;
								<button className={` ${validarNextBoton(pagActual, verificarElementos) ? ("opacity-25 text-sm text-BlancoIvory bg-rojo-pantone font-semibold py-2 px-2 rounded-l") : ('text-sm text-BlancoIvory transition duration-150 hover:bg-opacity-25 bg-rojo-pantone font-semibold py-2 px-2 rounded-r')}`} onClick={() => { nextPag() }} disabled={validarNextBoton(pagActual, verificarElementos)}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalInventario open={open} setOpen={setOpen}>
				{inventario === 'Sucursal' ?
					<>
						<h1 className="text-center text-slate-600 font-bold my-5 md:text-sm">Detalle del Producto</h1>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-sm">
							<p><b>SKU:</b> {dataDetails?.code}</p>
							<p><b>Nombre:</b> {dataDetails?.name}</p>
							<p><b>Categoria:</b>{dataDetails?.categoryName === '' ? 'sin categoria' : dataDetails?.categoryName}</p>
							 <p><b>Costo:</b> {dataDetails?.cost}</p>
							<p><b>Precio 1:</b> {dataDetails?.price1} </p>
							<p><b>Precio 2:</b> {dataDetails?.price2} </p>
							<p><b>Cantidad Disponible:</b> {dataDetails?.qty}</p>
							<p><b>Activo En Sucursal:</b> {dataDetails?.activeInBranch ? 'Si' : 'No'}</p>
						</div>
						{
							dataDetails?.image && <div className="text-sm">
								<h1 className="text-center text-slate-600 font-bold md:text-sm">Producto</h1>
								<div className="grid grid-cols-2 mt-2 max-h-48 gap-3 overflow-auto">
									{
										dataDetails?.image?.map((el, id) => (<Image key={id} src={el.url} className="w-40 h-40 rounded-lg" width={100} height={100} priority alt="" />))
									}

								</div>
							</div>
						}
					</> :
					<>
						<h1 className="text-center text-slate-600 font-bold md:text-xl">Detalles de la Orden</h1>
						<div className="grid grid-cols-2 gap-6 mt-5">
							<p><b>Numero de orden:</b> {dataDetails?.code}</p>
							<p><b>Nombre del Cliente</b> {dataDetails?.requested}</p>
							<p><b>Fecha del Pedido:</b> {dataDetails?.dateReg?.substring(0, 10)?.split("-").reverse().join("-")}</p>
							<p><b>Nombre Producto:</b> {dataDetails?.name}</p>
							<p><b>Cantidad Pedida:</b> {dataDetails?.qty}</p>
							<p><b>Pendiente por Conciliar:</b> {dataDetails?.qtyReg}</p>
							<p><b>Cantidad Conciliada:</b> {dataDetails?.qtyReg >= 1 ? (dataDetails?.qty - dataDetails?.qtyReg) : dataDetails?.qty}</p>
							<p className="col-span-full"><b>Comentario:</b> {dataDetails?.comment === "" ? "Sin comentario" : dataDetails?.comment}</p>
							{<p><b>Tipo de Precio:</b> {dataDetails?.typePrice}</p>}
							{<p><b>Total:</b> {dataDetails?.amount}</p>}
						</div>

					</>
				}
			</ModalInventario>

		</>

	)
}
