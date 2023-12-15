'use client'
import { useEffect, useState } from "react";
import FormProducts from "../component/FormProducts";
import TablaPedidos from "../component/TablaPedidos";
import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";
import LoaderScreen from "@/components/LoaderScreen";


export default function Order() {
    const { GetListOrder, GetListOrderAdmin, GetListOrderBranch, GetListOrderClient, setScreenPending, screenPending, UserDataJson, setDataOrder } = useFront()
    const [agregarPedido, setAgregarPedidos] = useState(false);
    const [isRotate, setIsRotate] = useState(false);
    const [auxOrder, setAuxOrder] = useState(0);
    const [filterAct, setFielterAct] = useState(0)

    useEffect(() => {
        if(UserDataJson){if (UserDataJson?.idType === 99) {
            GetListOrderAdmin(false).then(res => {setScreenPending(false);setIsRotate(false);setFielterAct(0)})

        } else if (UserDataJson?.idType === 1) {
            GetListOrderBranch(false).then(res => {setScreenPending(false);setIsRotate(false);setFielterAct(0)})
        } else {
            GetListOrderClient(false).then(res => {setScreenPending(false);setIsRotate(false);setFielterAct(0)})
        }} else {
            return
        }
    }, [UserDataJson,auxOrder])

    console.log(auxOrder)



    return (
        <>
            {
                screenPending ? <LoaderScreen /> :
                    agregarPedido ? <div className="divide-y divide-slate-500 px-4">
                        <div className='w-full flex flex-col gap-6 my-16 mb-4'>
                            <button className=' w-10 flex justify-center items-center bg-rojo-pantone py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50' onClick={() => { setAgregarPedidos(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <h1 className='font-semibold text-3xl ml-10 text-slate-400'>{'Pedido'}</h1>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10 py-10 px-10">
                            <div className='w-full md:w-1/4'>
                                <h2 className="text-base font-semibold leading-7 text-slate-400">Agregar productos</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Seleccione un producto para agregar a la lista
                                </p>
                            </div>
                            <FormProducts setAgregarPedidos={setAgregarPedidos} UserDataJson={UserDataJson} setAuxOrder={setAuxOrder} />
                        </div>
                    </div>
                        :
                        <div className='px-10'>
                            <div className='w-full flex flex-col gap-4 px-8 my-16 md:flex-row justify-between'>
                                <div className="flex">
                                <h1 className='font-semibold text-3xl'>Modulo de Pedidos</h1>
                                    <button onClick={() => { setDataOrder([]);setIsRotate(true); setAuxOrder(prev=>prev + 1) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-4 h-4 ${isRotate ? 'animate-spin' : ''} `}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </button>

                                </div>
                                

                                {UserDataJson?.idType !== 99 && <button className='flex items-center bg-rojo-pantone px-4 py-2 rounded-lg text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50' onClick={() => { setAgregarPedidos(true) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Hacer Pedido
                                </button>}

                            </div>
                            <TablaPedidos setAuxOrder={setAuxOrder} setDataOrder={setDataOrder} setIsRotate={setIsRotate} filterAct={filterAct} setFielterAct={setFielterAct}/>
                        </div>
            }
        </>
    )
}