
import Loader from "./Loader";
import useFront from "@/hooks/useFront";
import Image from "next/image";
import noImage from "../../../../public/imagenNoDisponible.png"
import { Fragment, useEffect, useState } from "react";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductGallery({ setProductData, setOpen }) {
    const { pending, productSearchRepo, GetSearchListProduct } = useFront()
    const [value, setValue] = useState("")
    const [pagActual, setPagActual] = useState(1);
    const [cantPag, setCantPag] = useState(6);

    useEffect(() => {
        setPagActual(1);
        setCantPag(6);
    }, [])
    
    let arraySlice = productSearchRepo && productSearchRepo?.slice(((pagActual * cantPag) - cantPag), cantPag * pagActual);
    const verificarElementos = Math.ceil(productSearchRepo.length / cantPag);

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
        <section className="mt-8  h-auto max-h-screen overflow-y-auto px-4 py-2 scrollbar scrollbar-thumb-gray-300">
            <div className="w-full flex justify-center mb-4">
                <div className="flex flex-col w-1/2">
                    <label>
                        Buscar Producto
                    </label>
                    <div className="w-full flex">
                        <input
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        className={` w-full rounded-l-md border px-2 bg-slate-200 py-1.5 text-black shadow-sm ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm  `}
                        />
                        <button onClick={()=>GetSearchListProduct(value)} className="inline-flex w-1/4 justify-center rounded-r-md bg-rojo-pantone px-3 py-2 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-span-full">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            {
                pending
                    ?
                    (<Loader />)
                    :
                    <>
                    <ul
                        role="list"
                        className="grid grid-cols-1 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 "
                    >{arraySlice.length > 0 ? arraySlice?.map((file) => (
                        <li key={file.id} className="flex flex-col justify-between items-center border border-slate-400 rounded-xl w-52 p-4 overflow-x-hidden">
                            <div
                                onClick={() => { setProductData(file); setOpen(false) }}
                                className={classNames(
                                    file.current
                                        ? 'ring-2 ring-indigo-500 ring-offset-2'
                                        : 'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                                    ' aspect-h-7 group w-full overflow-hidden rounded-lg bg-gray-100 flex justify-center'
                                )}
                            >
                                <Image
                                    src={file?.image === null ? noImage : file?.image[0]?.url}
                                    alt=""
                                    width={100}
                                    height={100}
                                    className={classNames(
                                        file.current ? '' : 'group-hover:opacity-75',
                                        'pointer-events-none rounded-md  w-40 h-40 max-h-40'
                                    )}
                                    priority
                                />
                            </div>
                            <p className="pointer-events-none mt-2 block truncate text-lg font-medium text-gray-900 overflow-hidden">
                                {file.name}
                            </p>
                            <p className="pointer-events-none block text-sm font-medium text-gray-500"><b className="text-black">Descripcion:</b> {file.descrip}</p>
                             <p className="pointer-events-none block text-sm font-medium text-gray-500"><b className="text-black">Costo:</b> {file.cost}</p> 


                        </li>
                    )) : <h1 className="w-full text-center">No hay elementos para mostrar</h1>}</ul>
                    <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
                        {/* <span className="text-xs xs:text-sm text-gray-900">
                            {productSearchRepo.length === 0 ? (`Mostrando ${productSearchRepo.length} de ${productSearchRepo.length} `) : (`Mostrando ${cantPag > productSearchRepo.length ? productSearchRepo.length : cantPag} de ${productSearchRepo.length}`)}

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
                                <span className="text-sm text-BlancoIvory transition duration-150 hover:bg-bopacity-25 bg-rojo-pantone font-semibold py-2 px-2 rounded">
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
                    </div></>
            }
        </section>


    )
}
