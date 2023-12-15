'use client'

import { Fragment, useEffect, useState } from "react";
import ModalInventario from "../ModalInventario";
import TablaInventario from "../TablaInventario";

import Toggle from "../Toggle";
import { REPORT } from "@/tools/constants";
import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";





export default function TablaSucursales({setEditState, setAgregarSucursal}) {
	let userString = ""
	let UserDataJson = undefined
	if (typeof window !== 'undefined') {
		userString = localStorage.getItem('UserData')
		UserDataJson = JSON.parse(userString);
	}
	const { dataSucursal, setAuxListSucursal, auxListSucursal, GetListSucursal, SucursalActiveSubmit, reportSubmit } = useFront()
	//const [dataSucursalList, setDataSucursalList] = useState([]);
	const [open, setOpen] = useState(false);
	const [editarRow, setEditarRow] = useState(false)
	const [enabled, setEnabled] = useState(false)
	const [id, setId] = useState(false)
	const [pagActual, setPagActual] = useState(1);
    const [cantPag, setCantPag] = useState(10);
	const [search, setSearch] = useState("")
    const [open2, setOpen2] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		GetListSucursal()
	}, [auxListSucursal])

	useEffect(()=>{
        setSearch("")
    },[open2])

	useEffect(() => {
        setPagActual(1);
        setCantPag(10);
    }, [])

	let arraySlice = dataSucursal && dataSucursal?.slice(((pagActual * cantPag) - cantPag), cantPag * pagActual);
    const verificarElementos = Math.ceil(dataSucursal?.length / cantPag);

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

	const handlerSupport = async (searchTarget = "") => {
        const url = await reportSubmit(REPORT.BRANCH, {
            id: 0,
            code: "",
            search: searchTarget,
            limit: 0
        })
		if( url ) {
            window.open( url )
        } else {
            setError( true )
        }
    }


	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="-mx-4 mt-8 sm:-mx-0">
				<div className="min-w-full divide-y divide-gray-300 rounded-md border">
					<div className="bg-azul-pantone text-BlancoIvory">
						<div className="grid grid-cols-2 gap-4 md:grid-cols-5  ">
                            <span className="rounded-md relative w-full h-3 justify-end col-span-5">
                                <button onClick={()=>setOpen2(true)} className="absolute right-0 bg-rojo-pantone top-0 p-1 rounded-md m-1 before:bg-white before:w-5 before:h-5 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </button>
                            </span>
                        </div>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-7 ">
							<div scope="col" className="hidden md:block py-3.5 pl-4 pr-3 text-center text-sm font-semibold  sm:pl-0 ">
								Codigo Sucursal
							</div>
							<div
								scope="col"
								className=" px-3 py-3.5 text-center text-sm font-semibold   "
							>
								Nombre
							</div>
							<div
								scope="col"
								className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold   "
							>
								Descripcion
							</div>
							<div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold  ">
								Direccion
							</div>
							<div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold  ">
								Activo
							</div>
							<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold   ">
								Inventario
							</div>
							<div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold  ">
								Editar
							</div>
						</div>
					</div>
					<div className="divide-y divide-gray-200 bg-white">
						{arraySlice?.length > 0 ? arraySlice?.reverse().map((sucursal) => (
							 <div key={sucursal.id} className="grid grid-cols-2 gap-4 md:grid-cols-7 ">
								<div className=" hidden md:block px-3 py-4 text-sm text-center text-gray-500  ">
									{sucursal.code}
								</div>
								<div className=" px-3 py-4 text-sm text-center text-gray-500  ">
									{sucursal.name}
								</div>
								<div className=" hidden md:block px-3 py-4 text-sm text-center text-gray-500  ">
									{sucursal.descrip}
								</div>
								<div className=" hidden md:block px-3 py-4 text-sm text-center text-gray-500  ">
									{sucursal.address}
								</div>
								<div className="hidden md:block  px-3 py-4 text-sm text-center text-gray-500  ">
									<div><Toggle defaultActive={sucursal?.active} onChange={()=>SucursalActiveSubmit(sucursal)}/></div>
								</div>
								<div className=" py-4 text-sm px-4 text-gray-500 w-full mx-auto flex justify-center  ">
									<button onClick={() => { setOpen(true); setId(sucursal.id) }} className=" bg-rojo-pantone w-auto px-4 py-2.5 flex justify-center items-center rounded-md text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 ">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
										</svg>
									</button>
								</div>
								<div className=" hidden md:flex py-4 text-sm px-4 text-gray-500 w-full  justify-center  ">
									<button onClick={() => { setEditState(prev=>({...prev, editSucursales: sucursal})); setAgregarSucursal(true)}} className=" bg-rojo-pantone w-auto flex justify-center items-center px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 " >
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
										</svg>
									</button>
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
                                <span className="text-sm text-BlancoIvory transition duration-150 hover:bg-blue-700 bg-rojo-pantone font-semibold py-2 px-2 rounded">
                                    ...
                                </span>
                                <button
                                    className={`text-sm text-BlancoIvory transition duration-150 hover:bg-blue-700 bg-rojo-pantone font-semibold py-2 px-2 rounded ${totalPages.includes(pagActual) && "bg-opacity-50" 
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
                            <button className={` ${validarNextBoton(pagActual, verificarElementos) ? ("opacity-25 text-sm text-BlancoIvory bg-rojo-pantone font-semibold py-2 px-2 rounded-l") : ('text-sm text-BlancoIvory transition duration-150 hover:bg-blue-700 bg-rojo-pantone font-semibold py-2 px-2 rounded-r')}`} onClick={() => { nextPag() }} disabled={validarNextBoton(pagActual, verificarElementos)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
				</div>
			</div>
			<ModalInventario open={open} setOpen={setOpen}>
				<TablaInventario id={id} />
			</ModalInventario>
			{ open2 && <div className="absolute flex flex-col items-center justify-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-50">
				<div className="bg-white w-1/2 h-80 border border-slate-300 flex flex-col gap-4 items-center justify-center rounded-lg shadow-md shadow-slate-600">
					<h2 className="text-xl font-semibold">Generar Reporte Sucursales</h2>
					<p className="w-6/12 text-slate-600 text-xs">
						Use el input para generar un reporte de una sucursal especifico o en su defecto hago click en el boton {'"Reporte Completo"'} para uno mas completo
					</p>
					{ error && <p className="w-6/12 text-red-500 text-xs">
                    	Algo va mal, vuelve a intentar
                	</p>}
					<div className="w-6/12 rounded-lg overflow-hidden border border-slate-500 p-0 m-0 flex flex-row justify-between">
						<input type="text" value={search} onChange={event => setSearch(event.target.value)} className="w-8/12 border-none" />
						<button type="button" onClick={()=>handlerSupport(search)} className="bg-rojo-pantone w-4/12 text-white h-full">Generar</button>
					</div>
					<div className="w-6/12 flex flex-row justify-center gap-2 items-center">
						<button onClick={()=>setOpen2(false)} className="w-1/2 bg-rojo-pantone text-white py-2 px-6 rounded-lg">Cancelar</button>
						<button onClick={()=>handlerSupport()} className="w-1/2 bg-rojo-pantone text-white py-2 px-6 rounded-lg">Reporte Completo</button>
					</div>
				</div>
        	</div>}
		</div>

	)
}
