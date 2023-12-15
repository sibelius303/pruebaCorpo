'use client'
import TablaCompra from "../components/TablaCompra";
import FormProducts from "../components/FormProducts";
import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";
import LoaderScreen from "@/components/LoaderScreen";
import { useEffect } from "react";


export default function Buy() {
    const {agregarCompra, setAgregarCompra, UserDataJson, setDataRposicionList, setScreenPending, screenPending, GetListReposicion } = useFront()

    useEffect(() => {
        if(UserDataJson){
            GetListReposicion()
            setScreenPending(false)
        }
        
        return () =>{
            setDataRposicionList([])
        }
    }, [UserDataJson])
    
    return (
        <>
            {
                screenPending ? <LoaderScreen/> :
                agregarCompra ? (
                    <div className="divide-y divide-slate-500 px-4">
                        <div className='w-full flex flex-col gap-6 my-16 mb-4'>
                            <button className=' w-10 flex justify-center items-center bg-rojo-pantone py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50' onClick={() => { setAgregarCompra(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <h1 className='font-semibold text-3xl ml-10 text-slate-400'>{'Reposicion'}</h1>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10 py-10 px-10">
                            <div className='w-full md:w-1/4'>
                                <h2 className="text-base font-semibold leading-7 text-slate-400">Agregar productos</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Seleccione un producto para agregar a la lista
                                </p>
                            </div>
                            <FormProducts setAgregarCompra={setAgregarCompra} UserDataJson={UserDataJson} />
                        </div>
                    </div>
                ) : (
                    <div className='px-10'>
                        <div className='w-full flex flex-col gap-4 px-8 my-16 md:flex-row justify-between'>
                            <h1 className='font-semibold text-3xl '>Modulo de {UserDataJson?.idType === 2 ? 'Pedido' : 'Reposicion'}</h1>
                            <button className='flex items-center bg-rojo-pantone px-4 py-2 rounded-lg text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50' onClick={() => { setAgregarCompra(true) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Reponer
                            </button>
                        </div>
                        <TablaCompra UserDataJson={UserDataJson} />
                    </div>
                )
            }
        </>
    )
}