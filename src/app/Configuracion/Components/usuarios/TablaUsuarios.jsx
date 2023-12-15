'use client'

import { Fragment, useEffect, useState } from "react";
import Toggle from "../Toggle";



import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";
import Image from "next/image";
import imageNoDisponible from '../../../../../public/imagenNoDisponible.png'




export default function TablaUsuarios({setAgregarUsuario, setEditarUsuario, setEditState}) {
	const { dataUsers, setAux, UserActiveSubmit } = useFront();
	let userString = ""
	let UserDataJson = undefined
	if (typeof window !== 'undefined') {
		userString = localStorage.getItem('UserData')
		UserDataJson = JSON.parse(userString);
	}
	//const [dataUserList, setDataUserList] = useState([]);
	const [image, setImage] = useState(false);
	const [imageBase64, setImageBase64] = useState(false);
	const [pagActual, setPagActual] = useState(1);
    const [cantPag, setCantPag] = useState(10);

	
	useEffect(() => {
        setPagActual(1);
        setCantPag(10);
    }, [])

	let arraySlice = dataUsers && dataUsers.reverse()?.slice(((pagActual * cantPag) - cantPag), cantPag * pagActual);
    const verificarElementos = Math.ceil(dataUsers?.length / cantPag);

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
			<div className="-mx-4 mt-8 pb-10 sm:-mx-0">
				<div className="min-w-full divide-y divide-gray-300 border rounded-t-md rounded-b-md">
					<div className="bg-azul-pantone text-BlancoIvory">
						<div className="grid grid-cols-2 gap-4  md:grid-cols-7 xl:grid-cols-8">
							<div scope="col" className="px-3 py-3.5 text-center text-sm font-semibold  sm:pl-0 ">
								Foto
							</div>
							<div
								scope="col"
								className=" px-3 py-3.5 text-center text-sm font-semibold  sm:table-cell "
							>
								Usuario
							</div>
							<div
								scope="col"
								className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold   "
							>
								Nombre
							</div>

							<div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold  ">
								Email
							</div>
							<div scope="col" className="hidden md:flex px-3 py-3.5 text-center text-sm font-semibold   justify-center ">
								Tipo de Usuario
							</div>
							<div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold  ">
								Activo
							</div>
							<div scope="col" className="hidden md:block first-line:px-3 py-3.5 text-center text-sm font-semibold  xl:col-span-2">
								<span >Editar</span>
							</div>
						</div>
					</div>
					<div className="divide-y divide-gray-200 bg-white">
						{
							arraySlice?.length > 0 ? arraySlice?.map((person) => (
								<div key={person.id} className="grid grid-cols-2 gap-4  md:grid-cols-7 xl:grid-cols-8">
									<div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm flex justify-center font-medium  sm:pl-0 ">
										<Image src={person.image === "" ? imageNoDisponible : imageNoDisponible } width={100} height={100} className='w-10 h-10 rounded-full' alt='fotoPerfil' priority />
									</div>
									<div className="  px-3 py-4 text-sm text-gray-500 text-center sm:table-cell ">
										{person.userName}
									</div>
									<div className=" hidden md:block  px-3 py-4 text-sm text-gray-500 text-center  ">
										{person.name}
									</div>

									<div className=" hidden md:block break-words px-3 py-4 text-sm text-center text-gray-500  ">
										{person.email}
									</div>
									<div className=" hidden md:flex  px-3 py-4 text-sm text-gray-500  justify-center  ">
										{person.idType === 99 ? 'Administrador' : person.idType === 2 ? 'Cliente' : 'Sucursal'}
									</div>
									{/* <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
	
										{person.perfilUsuario}
									</td> */}
									<div className=" hidden md:block  px-3 py-4 text-sm text-gray-500 text-center  ">
										<div>
											<Toggle defaultActive={person?.active} onChange={()=>UserActiveSubmit(person)}/>
										</div>
									</div>
									<div className=" hidden md:block whitespace-nowrap lg:flex justify-center  py-4 text-sm w-full text-gray-500 px-4  xl:col-span-2">
										<button onClick={() => {setAgregarUsuario(true); setEditState(prev=> ({... prev, editUsuario: person}))}} className=" bg-rojo-pantone w-auto flex justify-center items-center px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 " >
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
											</svg>
										</button>
									</div>
								</div>
							)) : <h1 className="w-full text-center">No hay elementos para mostrar</h1>
						}
					</div>
					<div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between ">
                        <div className=" xs:mt-0">
                            <select className="block w-full bg-gray-100 text-gray-800 border rounded py-1  mb-3 leading-tight focus:bg-white " value={cantPag} onChange={(e) => setCantPag(e.target.value)}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                        {/* <span className="text-xs xs:text-sm ">
                            {dataUsers?.length === 0 ? (`Mostrando ${dataUsers?.length} de ${dataUsers?.length} `) : (`Mostrando ${cantPag > dataUsers?.length ? dataUsers?.length : cantPag } de ${dataUsers?.length}`)}

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
                            <button className={` ${validarNextBoton(pagActual, verificarElementos) ? ("opacity-25 text-sm text-BlancoIvory bg-rojo-pantone font-semibold py-2 px-2 rounded-l") : ('text-sm text-BlancoIvory transition duration-150 hover:bg-blue-700 bg-rojo-pantone font-semibold py-2 px-2 rounded-r')}`} onClick={() => { nextPag() }} disabled={validarNextBoton(pagActual, verificarElementos)}>
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
