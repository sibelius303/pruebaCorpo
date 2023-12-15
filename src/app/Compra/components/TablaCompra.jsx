'use client'
import useFront from "@/hooks/useFront";
import { Fragment, useEffect, useState } from "react";


export default function TablaCompra() {
	const { dataRposicionList, setDataRposicionList ,dataSucursal, dataCategory, dataProducts, setAux, GetSearchReposicion, GetListReposicion } = useFront()
	const [arrFilter, setArrFilter] = useState([]);
	const [filterAct, setFielterAct] = useState(0);
	const [valueInput, setValueInput] = useState("");
	const [sucursalBranch, setSucursalBranch] = useState("");
	const [initialDate, setInitialDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [pagActual, setPagActual] = useState(1);
    const [cantPag, setCantPag] = useState(10);
	
	useEffect(() => {
		setArrFilter(dataRposicionList.sort((a, b) => new Date(b.dateReg) - new Date(a.dateReg)))
	}, [dataRposicionList])

	useEffect(() => {
        setPagActual(1);
        setCantPag(10);
    }, [])

	let arraySlice = arrFilter && arrFilter?.slice(((pagActual * cantPag) - cantPag), cantPag * pagActual);
    const verificarElementos = Math.ceil(arrFilter.length / cantPag);

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
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="-mx-4 mt-8 sm:-mx-0">
				<div className="min-w-full divide-y divide-gray-300 bg-BlancoIvory border rounded-md mb-5">
					<div className="bg-azul-pantone text-BlancoIvory rounded-t-md">
						<div className="flex flex-col gap-y-5 lg:flex-row lg:justify-between lg:pr-2">
							<div className={`flex flex-col md:flex-row  w-auto   bg-rojo-pantone bg-opacity-20`} >
								<button
									onClick={() => { setArrFilter(dataRposicionList.filter(el => el.qty > 0)); setFielterAct(0) }}
									type="button"
									className={` lg:px-4 py-2.5 lg:rounded-l-md text-sm w-full lg:w-32 font-semibold hover:bg-rojo-pantone text-white shadow-sm ${filterAct === 0 && 'bg-rojo-pantone'} `}
								>
									Total
								</button>
								<button
									onClick={() => { setArrFilter(dataRposicionList.filter(el => el.qty > 0)); setFielterAct(2); setArrFilter(prev => prev.filter(el => el.isFavorite === true)) }}
									type="button"
									className={` px-4 py-2.5 lg:rounded-r-md text-sm w-full lg:w-32 font-semibold hover:bg-rojo-pantone text-white shadow-sm ${filterAct === 2 && 'bg-rojo-pantone'}`}
								>
									Favoritos
								</button>
							</div>
							<div className="flex flex-col lg:flex-row">
								<div className=" flex flex-col w-auto justify-end items-end text-BlancoIvory">
									<label htmlFor="location" className="block text-sm w-full lg:w-40 text-center font-medium leading-6 text-BlancoIvory">
										Producto
									</label>
									<input
										value={valueInput}
										className=" block md:rounded-l-md border-0 py-1.5 w-full lg:w-40 pl-3 pr-15 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onChange={(e) => setValueInput(e.target.value)}
										placeholder="Buscar Producto"
									/>
								</div>
								<div className=" flex flex-col w-auto justify-end items-end text-negro">
									<label htmlFor="location" className="block text-sm text-center w-full lg:w-32 font-medium leading-6 text-BlancoIvory">
										Sucursal
									</label>
									<select
										id="location"
										name="location"
										className=" block  border-0 py-1.5 w-full lg:w-32 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
								<div className=" flex flex-col w-auto justify-end items-end text-negro">
									<label htmlFor="location" className="block text-sm text-center w-full lg:w-40 font-medium leading-6 text-BlancoIvory">
										Fecha de Inicio
									</label>
									<input
										type="date"
										className=" block  border-0 py-1.5 w-full lg:w-40 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={initialDate}
										onChange={(e) => {
											if(e.target.value !== ""){
												setInitialDate(e.target.value)
											} else {
												setInitialDate("")
											}
											
										}}
									/>
								</div>
								<div className=" flex flex-col w-auto justify-end items-end text-negro">
									<label htmlFor="location" className="block text-sm text-center w-full lg:w-40 font-medium leading-6 text-BlancoIvory">
										Fecha Final
									</label>
									<input
										type="date"
										className=" block  border-0 py-1.5 w-full lg:w-40 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={endDate}
										onChange={(e) => {
											if(e.target.value !== ""){
												setEndDate(e.target.value)
											} else {
												setEndDate("")
											}
											
										}}
									/>
								</div>
								<div className=" flex flex-col w-full mt-2 lg:mt-0 lg:w-auto justify-end items-end">
									<button onClick={()=>{GetSearchReposicion(initialDate,endDate,valueInput,sucursalBranch);setValueInput("");setEndDate("");setInitialDate("");setSucursalBranch("")}} className='flex items-center w-full lg:w-auto bg-rojo-pantone px-4 py-1.5 lg:rounded-r-md text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50'>Buscar</button>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-4 md:grid-cols-6 ">
							<div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold ">
								Fecha Reposicion
							</div>
							<div scope="col" className=" hidden md:block py-3.5 pl-4 pr-3 text-center text-sm font-semibold  sm:pl-0">
								SKU
							</div>
							<div
								scope="col"
								className=" px-3 py-3.5 text-center text-sm font-semibold  sm:div-cell"
							>
								Nombre
							</div>
							<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
								Sucursal
							</div>
							<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
								Proveedores
							</div>
							<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
								Cantidad
							</div>
						</div>
					</div>
					<div className="divide-y divide-gray-200 bg-white">
						{arraySlice?.length > 0 ? arraySlice?.map((compra, id) => (
							<div key={id} className="grid  grid-cols-3 gap-4 md:grid-cols-6 ">
								<div className=" hidden whitespace-nowrap md:block text-center px-3 py-4 text-sm text-gray-500 lg:div-cell">
									{compra?.dateReg?.substring(0, 10).split("-").reverse().join("-")}
								</div>
								<div className="hidden md:block whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
									{compra.code}
								</div>
								<div className=" whitespace-nowrap text-center overflow-x-hidden px-3 py-4 text-sm text-gray-500 sm:div-cell">
									{compra.name}
								</div>
								<div className=" md:block whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 lg:div-cell">

									{compra.branchName}
								</div>
								<div className=" md:block whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 lg:div-cell">
									{compra.vendorName}
								</div>
								<div className=" whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 lg:div-cell">
									{compra.qty}
								</div>
							</div>
						)) : <h1 className="w-full text-center">No hay elementos para mostrar</h1>}
					</div>
					<div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
                        <div className=" xs:mt-0">
                            <select className="block w-full bg-gray-100 text-gray-800 border rounded py-1  mb-3 leading-tight focus:bg-white " value={cantPag} onChange={(e) => setCantPag(e.target.value)}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                        {/* <span className="text-xs xs:text-sm ">
                            {arrFilter.length === 0 ? (`Mostrando ${arrFilter.length} de ${arrFilter.length} `) : (`Mostrando ${cantPag > arrFilter.length ? arrFilter.length : cantPag } de ${arrFilter.length}`)}

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
                                            <button  className={`text-sm text-BlancoIvory transition duration-150 hover:bg-opacity-80 bg-rojo-pantone font-semibold py-2 px-2 rounded ${el === pagActual && ("bg-opacity-50")} `} onClick={() => setPagActual(el)}>
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
                                        if(totalPages[totalPages.length - 1]){
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
                            <button className={` ${validarNextBoton(pagActual, verificarElementos) ? ("opacity-25 text-sm text-BlancoIvory bg-rojo-pantone font-semibold py-2 px-2 rounded-l") : ('text-sm text-BlancoIvory transition duration-150 hover:bg-opacity bg-rojo-pantone font-semibold py-2 px-2 rounded-r')}`} onClick={() => { nextPag() }} disabled={validarNextBoton(pagActual, verificarElementos)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	)
}
