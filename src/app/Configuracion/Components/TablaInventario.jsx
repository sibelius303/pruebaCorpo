'use client'

import { useEffect, useState } from "react"
import ModalInventario from "./ModalInventario"
import useFront from "@/hooks/useFront"
import Image from "next/image";



export default function TablaInventario(id) {
	const {GetSearchInventario} = useFront()
	// const userString = localStorage.getItem("UserData");
	// const UserDataJson = JSON.parse(userString);
	const [arrFilter, setArrFilter] = useState([]);
	const [open, setOpen] = useState(false);
	const [dataDetails, setDataDetails] = useState([]);
	const [dataInventario, setDataInventario] = useState([]);
	const [filterAct, setFielterAct] = useState(0);


	useEffect(() => {
		GetSearchInventario(id, setDataInventario);
	}, [])

	useEffect(()=>{
		setArrFilter(dataInventario)
	},[dataInventario])

	return (
		<>
			<div className="px-4 pb-10 sm:px-6 lg:px-8 ">
				<div className="border rounded-md ">
					<div className="min-w-full divide-y divide-gray-300  ">
						<div className="bg-azul-pantone text-BlancoIvory">
							<div className="flex lg:pr-10">
								<div className={`flex flex-col w-full md:flex-row md:w-auto rounded-md bg-rojo-pantone bg-opacity-20`} >
									<button
										onClick={() => { setArrFilter(dataInventario); setFielterAct(0) }}
										type="button"
										className={` px-4 py-2.5 w-full rounded-l-md text-sm md:w-32 font-semibold hover:bg-rojo-pantone text-white shadow-sm ${filterAct === 0 && 'bg-rojo-pantone'} `}
									>
										Total
									</button>
									{/* <button
										onClick={() => { setArrFilter(Compras); setFielterAct(1); setArrFilter(prev => prev.filter(el => el.consignado === true)) }}
										type="button"
										className={` px-4 py-2.5 text-sm w-32 font-semibold text-white hover:bg-rojo-pantone shadow-sm ${filterAct === 1 && 'bg-rojo-pantone'}`}
									>
										Consignado
									</button> */}
									<button
										onClick={() => { setArrFilter(dataInventario); setFielterAct(2); setArrFilter(prev => prev.filter(el => el.qty === 0)) }}
										type="button"
										className={` px-4 py-2.5 rounded-r-md w-full text-sm md:w-32 font-semibold hover:bg-rojo-pantone text-white shadow-sm ${filterAct === 2 && 'bg-rojo-pantone'}`}
									>
										Sin stock
									</button>
								</div>
							</div>
							<div className="grid grid-cols-3 lg:pl-10 gap-x-8 justify-between md:grid-cols-8 ">
								<div scope="col" className="hidden md:block py-3.5 pl-4 pr-3 text-center text-sm font-semibold  sm:pl-0">
									SKU
								</div>
								<div
									scope="col"
									className="  px-3 py-3.5 text-center text-sm font-semibold  sm:table-cell"
								>
									Nombre
								</div>
								<div
									scope="col"
									className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold  "
								>
									Descripcion
								</div>
								<div scope="col" className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold ">
									Categoria
								</div>
								<div scope="col" className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold ">
									Sucursal
								</div>
								<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
									Cantidad
								</div>
								<div scope="col" className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold ">
									Activo en Sucursal
								</div>
								<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
									<span >Detalle</span>
								</div>
							</div>
						</div>
						<div className="divide-y divide-gray-200 bg-white">
							{arrFilter.length > 0 ? arrFilter?.map((compra, id) => (
								<div key={id} className="grid grid-cols-3 gap-x-8 cursor-pointer hover:bg-slate-300 md:grid-cols-8 ">
									<div className=" hidden md:block break-words text-center py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
										{compra.code}
									</div>
									<div className="break-words text-center px-3 py-4 text-sm text-gray-500 sm:table-cell">
										{compra.name}
									</div>
									<div className=" hidden md:block  px-3 py-4 text-center text-sm text-gray-500 ">
										{compra.descrip}
									</div>
									<div className=" hidden md:block px-3 py-4 text-sm text-center text-gray-500 ">
										{compra.categoryName === '' ? 'sin categoria' : compra.categoryName}
									</div>
									<div className=" hidden md:block px-3 py-4 text-sm text-center  text-gray-500 ">
										{compra.branchName}
									</div>
									<div className=" px-3 py-4 text-sm text-center text-gray-500 ">
										{compra.qty}
									</div>
									<div className=" hidden md:block px-3 py-4 text-sm text-center text-gray-500 ">
										{compra.activeInBranch ? 'Si' : 'No'}
									</div>
									<div className=" whitespace-nowrap py-4 px-4 text-sm w-full text-gray-500 hover:opacity-50 md:col-span-2 lg:col-span-1 ">
										<button onClick={() => { setOpen(true); setDataDetails(compra) }} className=" bg-rojo-pantone w-full px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm">
											Detalle
										</button>
									</div>
								</div>
							)) : <h1 className="w-full text-center">No hay elementos para mostrar</h1>}
						</div>
					</div>
				</div>
			</div>
			<ModalInventario open={open} setOpen={setOpen}>
			<h1 className="text-center text-slate-600 font-bold my-5 md:text-sm">Detalle del Producto</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-sm max-w-md">
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
			</ModalInventario>
		</>

	)
}
