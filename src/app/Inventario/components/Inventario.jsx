'use client'
import useFront from "@/hooks/useFront";
import TablaInventario from "./TablaInventario";
import { useEffect, useState } from "react";
import LoaderScreen from "@/components/LoaderScreen";


export default function Inventario() {
    const {setDataInventario, setScreenPending, screenPending, setAux, GetListInventario, GetListConciliationAdmin, UserDataJson } = useFront();
    const [ inventario, setInventario] = useState("Sucursal");
    const [pending, setPending] = useState(false);

    useEffect(() => {
        setScreenPending(false);
        setAux(prev => prev + 1);
        GetListInventario();

        return () => {
            setInventario("Sucursal");
            setDataInventario([]);
          }
    }, [])

    return (
        <>
            {
                screenPending ? <LoaderScreen /> :
                    <div className='px-2 md:px-10 bg-GrisFondo'>
                        <div className='w-full flex flex-col gap-4  mt-5 mb-14 '>
                            <h1 className='font-semibold mt-10 mx-auto text-3xl'> Modulo de Inventario</h1>
                            {UserDataJson.idType === 99 && <div className={` mx-auto flex flex-col md:flex-row  w-auto`} >
                                <button
                                    onClick={() => {setPending(true);setInventario("Sucursal");GetListInventario().then(res=>setPending(false))}}
                                    type="button"
                                    className={` lg:px-4 py-2.5 lg:rounded-l-md text-sm w-full lg:w-32 font-semibold hover:bg-rojo-pantone text-BlancoIvory shadow-sm ${inventario === 'Sucursal' ? 'bg-rojo-pantone' : 'bg-rojo-pantone bg-opacity-25' }  `}
                                >
                                    Sucursales
                                </button>
                                <button
                                    onClick={() => { setPending(true);setInventario("Cliente");GetListConciliationAdmin().then(res=>setPending(false))}}
                                    type="button"
                                    className={` px-4 py-2.5 text-sm w-full lg:w-32 font-semibold text-BlancoIvory hover:bg-rojo-pantone shadow-sm rounded-r-md ${inventario === 'Cliente' ? 'bg-rojo-pantone' : 'bg-rojo-pantone bg-opacity-25' }  `}
                                >
                                    Clientes
                                </button>
                            </div>}
                        </div>
                        <TablaInventario inventario={inventario} pending={pending}/>
                    </div>
            }
        </>

    )
}