'use client'
import useFront from "@/hooks/useFront";
import { Fragment, useEffect, useState } from "react";


export default function TablaAudit({dataAudit}) {
	const [arrFilter, setArrFilter] = useState([]);
	const [pagActual, setPagActual] = useState(1);
    const [cantPag, setCantPag] = useState(10);
	
	useEffect(() => {
		setArrFilter(dataAudit.sort((a, b) => new Date(b.dateReg) - new Date(a.dateReg)))
	}, [dataAudit])

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
						<div className="grid grid-cols-3 gap-4 md:grid-cols-5 ">
							<div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold ">
								Fecha
							</div>
							<div scope="col" className=" hidden md:block py-3.5 pl-4 pr-3 text-center text-sm font-semibold  sm:pl-0">
								Usuario
							</div>
							<div
								scope="col"
								className=" px-3 py-3.5 text-center text-sm font-semibold  sm:div-cell"
							>
								Tipo de Auditoria
							</div>
							<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
								Proceso
							</div>
							<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold ">
								Descripcion
							</div>
						</div>
					</div>
					<div className="divide-y divide-gray-200 bg-white">
						{arraySlice?.length > 0 ? arraySlice?.map((compra, id) => (
							<div key={id} className="grid  grid-cols-3 gap-4 md:grid-cols-5 ">
								<div className=" hidden whitespace-nowrap md:block text-center px-3 py-4 text-sm text-gray-500 lg:div-cell">
									{compra?.dateReg?.substring(0, 10).split("-").reverse().join("-")}
								</div>
								<div className="hidden md:block whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
									{compra.userName}
								</div>
								<div className=" whitespace-nowrap text-center overflow-x-hidden px-3 py-4 text-sm text-gray-500 sm:div-cell">
									{compra.type === 0 && "No Aplica"}
									{compra.type === 1 && "Modulo de Usuario"}
									{compra.type === 2 && "Modulo de Sucursales"}
									{compra.type === 3 && "Modulo de Poveedores"}
									{compra.type === 4 && "Modulo de Clientes"}
									{compra.type === 5 && "Modulo de Categorias"}
									{compra.type === 6 && "Modulo de Productos"}
									{compra.type === 7 && "Modulo de Reposición"}
									{compra.type === 8 && "Modulo de Pedido"}
									{compra.type === 9 && "Modulo de Pedido (Aprobado/Rechazado)"}
									{compra.type === 10 && "Modulo de Ventas"}
									{compra.type === 11 && "Modulo de Multimoneda"}
									{compra.type === 12 && "Modulo de Conciliacion"}          
								</div>
								<div className=" md:block whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 lg:div-cell">

									{compra.process}
								</div>
								<div className=" md:block whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 lg:div-cell">
									{compra.descrip}
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
