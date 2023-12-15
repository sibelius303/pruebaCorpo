'use client'
import { Fragment, useEffect, useState } from "react"
import ModalEditarPedidos from "./ModalEditarPedidos"
import ModalConciliar from "./ModalConciliar"
import useFront from "@/hooks/useFront"



export default function TablaPedidos({ setDataOrder, setIsRotate, filterAct, setFielterAct, setAuxOrder }) {
	const { GetListProduct, dataOrder,
		GetListOrder, auxOrderTab, setAuxOrderTab, dataProducts,
		GetListOrderAdmin, dataSucursal, UserDataJson, GetListOrderBranch, GetListOrderClient,
		GetSearchOrderBranch, GetSearchOrderAdmin,
		GetSearchOrderClient } = useFront()
	const [open, setOpen] = useState(false);
	const [dataModal, setDataModal] = useState(false);
	//const [conciliar, setConciliar] = useState(false);
	const [productName, setProductName] = useState([])
	const [open1, setOpen1] = useState(false)
	const [valueInput, setValueInput] = useState("");
	const [valueClient, setValueClient] = useState("");
	const [valueNumberOrder, setValueNumberOrder] = useState("");
	const [initialDate, setInitialDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [sucursalBranch, setSucursalBranch] = useState(0)
	const [status, setStatus] = useState(false);
	const [orderType, setOrderType] = useState(0);
	const [pagActual, setPagActual] = useState(1);
	const [cantPag, setCantPag] = useState(6);

	useEffect(() => {
		setPagActual(1);
		setCantPag(10);
	}, [])

	let dateUpdateOrder = dataOrder?.sort((a, b) => new Date(b.dateReg) - new Date(a.dateReg))

	let arraySlice = dataOrder && dateUpdateOrder?.slice(((pagActual * cantPag) - cantPag), cantPag * pagActual);
	const verificarElementos = Math.ceil(dataOrder?.length / cantPag);

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

	console.log(dataOrder)

	return (
		<>

			<div className="px-4 sm:px-6 lg:px-8">
				<div className="-mx-4 sm:-mx-0  mb-7">
					<div className="min-w-full ">
						<div className="bg-azul-pantone border text-BlancoIvory">
							<div className="flex flex-col  lg:flex-col  lg:justify-between ">
								<div className={`flex flex-col md:flex-row lg:w-auto`} >
									<button
										onClick={() => {
											if (UserDataJson?.idType === 99) {
												setDataOrder([])
												setIsRotate(true)
												GetListOrderAdmin(false).then(res => setIsRotate(false))
												setFielterAct(0);

											} else if (UserDataJson?.idType === 1) {
												setDataOrder([]);
												setIsRotate(true);
												GetListOrderBranch(false).then(res => setIsRotate(false));
												setFielterAct(0);
											} else {
												setDataOrder([]);
												setIsRotate(true);
												GetListOrderClient(false).then(res => setIsRotate(false));
												setFielterAct(0);
											}
										}}
										type="button"
										className={` lg:px-4 py-2.5 text-sm w-full lg:w-32 font-semibold hover:bg-rojo-pantone text-white shadow-sm ${filterAct === 0 ? 'bg-rojo-pantone' : 'bg-rojo-pantone bg-opacity-25'} `}
									>
										Pendientes
									</button>
									<button
										onClick={() => {
											if (UserDataJson?.idType === 99) {
												setDataOrder([])
												setIsRotate(true);
												GetListOrderAdmin(true).then(res => setIsRotate(false));
												setFielterAct(2)
											} else if (UserDataJson?.idType === 1) {
												setDataOrder([])
												setIsRotate(true);
												GetListOrderBranch(true).then(res => setIsRotate(false));
												setFielterAct(2)
											} else {
												setDataOrder([])
												setIsRotate(true);
												GetListOrderClient(true).then(res => setIsRotate(false));
												setFielterAct(2);
											}

										}}
										type="button"
										className={` px-4 py-2.5 lg:rounded-r-md text-sm w-full lg:w-32 font-semibold hover:bg-rojo-pantone text-white shadow-sm ${filterAct === 2 ? 'bg-rojo-pantone' : 'bg-rojo-pantone bg-opacity-25'}`}
									>
										{
											"Aceptados"
										}
									</button>
								</div>
								<div className={`${UserDataJson.idType === 99 ? "w-full grid lg:grid-cols-7" : UserDataJson.idType === 2 ? "w-full grid lg:grid-cols-5" : "w-full grid lg:grid-cols-6"}`}>
									<div className=" flex flex-col w-full  text-negro">
										<label htmlFor="location" className="block text-sm w-full lg:w-40 text-center font-medium leading-6 text-BlancoIvory">
											Producto
										</label>
										<input
											value={valueInput}
											className=" block  border-0 py-1.5 w-full lg:w-full pl-3 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => setValueInput(e.target.value)}
											placeholder="Producto"
										/>
									</div>
									{UserDataJson.idType === 99 && <div className=" flex flex-col w-full  text-negro">
										<label htmlFor="location" className="block text-sm w-full lg:w-40 text-center font-medium leading-6 text-BlancoIvory">
											Cliente
										</label>
										<input
											value={valueClient}
											className=" block  border-0 py-1.5 w-full lg:w-full pl-3 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => setValueClient(e.target.value)}
											placeholder="Cliente"
										/>
									</div>}
									{UserDataJson.idType !== 2 && <div className=" flex flex-col w-full text-negro">
										<label htmlFor="location" className="block text-sm text-center w-full lg:w-32 font-medium leading-6 text-BlancoIvory">
											Sucursal
										</label>
										<select
											id="location"
											name="location"
											className=" block  border-0 py-1.5 w-full lg:w-full pl-3 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => {
												setSucursalBranch(parseInt(e.target.value))
											}}
										>
											<option value={'0'}>Todas</option>
											{
												dataSucursal?.map((el) => (
													<option key={el.id} value={el.id}>{el.name}</option>
												))
											}

										</select>
									</div>}
									<div className=" flex flex-col w-full text-negro">
										<label htmlFor="location" className="block text-sm text-center w-full lg:w-40 font-medium leading-6 text-BlancoIvory">
											Fecha de Inicio
										</label>
										<input
											type="date"
											className=" block  border-0 py-1.5 w-full lg:w-full pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											value={initialDate}
											onChange={(e) => {
												if (e.target.value !== "") {
													setInitialDate(e.target.value)
												} else {
													setInitialDate("")
												}

											}}
										/>
									</div>
									<div className=" flex flex-col w-full text-negro">
										<label htmlFor="location" className="block text-sm text-center w-full lg:w-full font-medium leading-6 text-BlancoIvory">
											Fecha Final
										</label>
										<input
											type="date"
											className=" block  border-0 py-1.5 w-full lg:w-full pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											value={endDate}
											onChange={(e) => {
												if (e.target.value !== "") {
													setEndDate(e.target.value)
												} else {
													setEndDate("")
												}

											}}
										/>
									</div>
									<div className=" flex flex-col w-full text-negro">
										<label htmlFor="location" className="block text-sm text-center w-full lg:w-32 font-medium leading-6 text-BlancoIvory">
											Estado
										</label>
										<select
											id="location"
											name="location"
											value={status}
											className=" block  border-0 py-1.5 w-full lg:w-full pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => {
												if (e.target.value === "true") {
													setFielterAct(2);
													setStatus(JSON.parse(e.target.value))
												} else {
													setFielterAct(0);
													setStatus(JSON.parse(e.target.value))
												}

											}}
										>
											<option value={false}>Pendiente</option>
											<option value={true}>Aprobado</option>
										</select>
									</div>
									<div className=" flex flex-col justify-end w-full">
										<button onClick={() => {
											if (UserDataJson?.idType === 99) {
												GetSearchOrderAdmin(initialDate, endDate, valueInput, sucursalBranch, status, valueClient, valueNumberOrder)
												setValueInput("")
												setEndDate("")
												setInitialDate("")
												setValueClient("")
												setValueNumberOrder("")
												setSucursalBranch(0)
											} else if (UserDataJson?.idType === 1) {
												GetSearchOrderBranch(initialDate, endDate, valueInput, sucursalBranch, status)
												setValueInput("")
												setEndDate("")
												setInitialDate("")
												setValueClient("")
												setValueNumberOrder("")
												setSucursalBranch(0)
											} else {
												GetSearchOrderClient(initialDate, endDate, valueInput, sucursalBranch, status);
												setValueInput("")
												setEndDate("")
												setInitialDate("")
												setValueClient("")
												setValueNumberOrder("")
												setSucursalBranch(0)
											}
										}
										} className='flex items-center bg-rojo-pantone px-4 py-1.5  text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50'>Buscar</button>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-4 lg:grid-cols-7  px-5">
								<div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold ">
									Fecha Pedido
								</div>
								<div scope="col" className="hidden md:block py-3.5 pl-4 pr-3 text-center text-sm font-semibold  sm:pl-0">
									Codigo Pedido
								</div>
								<div
									scope="col"
									className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold  sm:table-cell"
								>
									Nombre Cliente o Sucursal
								</div>
								<div
									scope="col"
									className=" px-3 py-3.5 text-center text-sm font-semibold  "
								>
									Nombre del Producto
								</div>

								<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
									Cantidad Total
								</div>
								<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
									Comentario
								</div>
								<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
									<span > Detalle</span>
								</div>
							</div>
						</div>
						<div className="divide-y divide-gray-200 border-r border-l  border-gray-200 bg-white">
							{UserDataJson?.idType === 1 ? arraySlice?.length > 0 ? arraySlice?.map((compra, id) => (
								<div key={id} className="grid grid-cols-3 gap-4 px-5 md:grid-cols-7 ">
									<div className="hidden md:block break-words  px-3 py-4 text-sm text-gray-500 text-center ">
										{compra?.dateReg?.substring(0, 10).split("-").reverse().join("-")}
									</div>
									<div className="hidden md:block break-words py-4 pl-4 pr-3 text-sm text-center font-medium text-gray-900 sm:pl-0">
										{compra.orderId}
									</div>
									<div className="hidden md:block break-words  px-3 py-4 text-sm text-gray-500 text-center sm:table-cell">
										{compra.requested}
									</div>
									<div className=" break-words  px-3 py-4 text-sm text-gray-500 text-center ">
										{compra.name}
									</div>

									<div className=" break-words px-3 py-4 text-sm text-gray-500 text-center ">
										{compra.qty}
									</div>
									<div className=" break-words px-3 py-4 text-sm text-gray-500 ">
										{compra.comment === "" ? "Sin comentario" : compra.comment}
									</div>
									<div className="  px-3 py-4 text-sm text-gray-500 flex justify-center">
										<button onClick={() => { setOpen(true); setDataModal(compra) }} className=" bg-rojo-pantone px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm">
											Detalle
										</button>
									</div>
								</div>
							)) : <h1 className="w-full text-center">Aun no hay Pedidos Disponibles</h1> : UserDataJson?.idType === 99 ? arraySlice?.length > 0 ? arraySlice?.map((compra, id) => (
								<div key={id} className="grid grid-cols-3 gap-4 px-5 md:grid-cols-7 ">
									<div className="hidden md:block break-words  px-3 py-4 text-sm text-gray-500 text-center ">
										{compra?.dateReg?.substring(0, 10).split("-").reverse().join("-")}
									</div>
									<div className="hidden md:block break-words py-4 pl-4 pr-3 text-sm text-center font-medium text-gray-900 sm:pl-0">
										{compra.orderId}
									</div>
									<div className="hidden md:block break-words  px-3 py-4 text-sm text-gray-500 text-center sm:table-cell">
										{compra.requested}
									</div>
									<div className=" break-words  px-3 py-4 text-sm text-gray-500 text-center ">
										{compra.name}
									</div>

									<div className=" break-words px-3 py-4 text-sm text-gray-500 text-center ">
										{compra.qty}
									</div>
									{/* <div className=" break-words px-3 py-4 text-sm text-gray-500 flex justify-center ">
									<div className=" divide-y-2 flex flex-col gap-2">
										{compra.reference.map(el => <p className="my-1" key={el}>{el}</p>)}
									</div>
								</div> */}

									<div className=" break-words px-3 py-4 text-sm text-gray-500 ">
										{compra.comment === "" ? "Sin comentario" : compra.comment}
									</div>
									<div className="  px-3 py-4 text-sm text-gray-500 flex justify-center">
										<button onClick={() => { setOpen(true); setDataModal(compra) }} className=" bg-rojo-pantone px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm">
											Detalle
										</button>
									</div>
								</div>
							)) : <h1 className="w-full text-center">Aun no hay Pedidos Disponibles</h1> : arraySlice?.length > 0 ? arraySlice?.map((compra, id) => (
								<div key={id} className="grid grid-cols-3 gap-4 pl-5 pr-8 md:grid-cols-7 ">
									<div className="hidden md:block break-words  px-3 py-4 text-sm text-gray-500 text-center ">
										{compra?.dateReg?.substring(0, 10).split("-").reverse().join("-")}
									</div>
									<div className="hidden md:block break-words py-4 pl-4 pr-3 text-sm text-center font-medium text-gray-900 sm:pl-0">
										{compra.orderId}
									</div>
									<div className="hidden md:block break-words  px-3 py-4 text-sm text-gray-500 text-center sm:table-cell">
										{compra.requested}
									</div>
									<div className=" break-words  px-3 py-4 text-sm text-gray-500 text-center ">
										{compra.name}
									</div>

									<div className=" break-words px-3 py-4 text-sm text-gray-500 text-center ">
										{compra.qty}
									</div>
									{/* <div className=" break-words px-3 py-4 text-sm text-gray-500 flex justify-center ">
									<div className=" divide-y-2 flex flex-col gap-2">
										{compra.reference.map(el => <p className="my-1" key={el}>{el}</p>)}
									</div>
								</div> */}

									<div className=" break-words px-3 py-4 text-sm text-gray-500 ">
										{compra.comment === "" ? "Sin comentario" : compra.comment}
									</div>
									<div className="  px-3 py-4 text-sm flex justify-center text-gray-500 ">
										<button onClick={() => { setOpen(true); setDataModal(compra) }} className=" bg-rojo-pantone px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm">
											Detalle
										</button>
									</div>
								</div>
							)) : <h1 className="w-full text-center">Aun no hay Pedidos Disponibles</h1>}
						</div>
						<div className="px-5 py-5 bg-white border rounded-b flex flex-col xs:flex-row items-center xs:justify-between">
							<div className=" xs:mt-0">
								<select className="block w-full bg-gray-100 text-gray-800 border rounded py-1 px-8 mb-3 leading-tight focus:bg-white " value={cantPag} onChange={(e) => setCantPag(e.target.value)}>
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
								</select>
							</div>
							{/* <span className="text-xs xs:text-sm text-gray-900">
								{dataOrder?.length === 0 ? (`Mostrando ${dataOrder?.length} de ${dataOrder?.length} `) : (`Mostrando ${cantPag < dataOrder?.length ? cantPag : dataOrder?.length} de ${dataOrder?.length}`)}

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
				<ModalEditarPedidos open={open} setOpen={setOpen} dataModal={dataModal} modalConciliar={setOpen1} UserDataJson={UserDataJson}>
					<h1 className="text-center text-slate-600 font-bold md:text-xl">Detalle del Producto</h1>
					<div className="grid grid-cols-2 gap-6 mt-5">
						<p><b>Codigo de pedido:</b> {dataModal?.code}</p>
						<p><b>{dataModal?.descripType === "Sucursal" ? "Sucursal:" : "Nombre del Cliente:"}</b> {dataModal?.requested}</p>
						<p><b>Fecha del Pedido:</b> {dataModal?.dateReg?.substring(0, 10)?.split("-").reverse().join("-")}</p>
						<p><b>Nombre Producto:</b> {dataModal?.name}</p>
						<p><b>Cantidad Pedida:</b> {dataModal?.qty}</p>
						{dataModal?.ok && dataModal?.descripType !== "Sucursal" && <p><b>Pendiente por Conciliar:</b> {dataModal?.qtyReg}</p>}
						{dataModal?.ok && dataModal?.descripType !== "Sucursal" && <p><b>Cantidad Conciliada:</b> {dataModal?.qtyReg >= 1 ? (dataModal?.qty - dataModal?.qtyReg) : dataModal?.qty}</p>}
						<p className="col-span-full"><b>Comentario:</b> {dataModal?.comment === "" ? "Sin comentario" : dataModal?.comment}</p>
						{dataModal?.descripType !== "Sucursal" && <p><b>Tipo de Precio:</b> {dataModal?.typePrice}</p>}
						{dataModal?.descripType !== "Sucursal" && <p><b>Total:</b> {dataModal?.amount}</p>}
					</div>
				</ModalEditarPedidos>
				<ModalConciliar open={open1} setOpen={setOpen1} dataModal={dataModal} setAuxOrderTab={setAuxOrderTab} setAuxOrder={setAuxOrder} />
			</div>

		</>

	)
}
