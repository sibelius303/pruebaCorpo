import { useState } from "react";
import FormSucursal from "./FormSucursal";
import TablaSucursales from "./TablaSucursales";
import useFront from "@/hooks/useFront";

export default function Index() {
    const [value, setValue] = useState("")
    const [pending, setPending] = useState(false);
    const [editState, setEditState] = useState({
        editSucursales: false
    });
    const { agregarSucursal, setAgregarSucursal, GetListSucursal } = useFront()


    return <>
        {
            agregarSucursal ? < div className="divide-y divide-slate-500 px-4">
                <div className='w-full flex flex-col gap-6 mb-4'>
                    <button className=' w-10 flex justify-center items-center bg-rojo-pantone py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50' onClick={() => { setAgregarSucursal(false); setEditState(prev => ({ ...prev, editSucursales: false })) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <h1 className='font-semibold text-3xl ml-10 text-slate-400'>{editState.editSucursales ? "Editar Sucursal" : "Registrar Sucursal"}</h1>
                </div>
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10  py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-slate-400">Informacion de Sucursal</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Rellene la informacion de la Sucursal
                        </p>
                    </div>

                    <FormSucursal setAgregarSucursal={setAgregarSucursal} editSucursal={editState.editSucursales} setEditState={setEditState} />
                </div>
            </div> : <div className='px-10 mb-10'>
                <div className='w-full flex flex-col gap-4 px-8 justify-between md:flex-row'>
                    <h1 className='font-semibold text-3xl'>Sucursales</h1>
                    <button className='flex items-center  bg-rojo-pantone px-4 py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50' onClick={() => { setAgregarSucursal(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Agregar Sucursal
                    </button>
                </div>
                <div className="w-full flex justify-center mb-4">
                    <div className="flex flex-col w-1/2">
                        <label>
                            Buscar Sucursal
                        </label>
                        <div className="w-full flex">
                            <input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className={` w-full rounded-l-md border px-2 bg-slate-200 py-1.5 text-black shadow-sm ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm  `}
                            />
                            <button onClick={() => GetListSucursal(value)  } className="inline-flex w-1/4 justify-center rounded-r-md bg-rojo-pantone px-3 py-2 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-span-full">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <TablaSucursales setEditState={setEditState} setAgregarSucursal={setAgregarSucursal} />
            </div>
        }

    </>
}