"use client";

import useFront from "@/hooks/useFront";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Reports() {
    const [stats, setStats] = useState(null)
    const { UserDataJson } = useFront()

    

    useEffect(()=>{
        if( !stats ) {
            (async ()=>{
                const fromDate = "2023-07-21T12:42:31Z"
                const toDate = "2023-11-2T00:00:00Z"
                const { data } = await axios.post(`${process.env.API_URL}/audit`, {
                    "id": 0,
                    "dateStart": fromDate,
                    "dateEnd": toDate,
                    "userName": "",
                    "type": 0,
                    "limit": ""
                },{
                    auth: {
                        username: UserDataJson.token,
                        password: ''
                    }
                })
                console.log('stats', data)
            })()
            
        }

    },[stats])
    




    return <div className='px-10 mb-8'>
        <div className='w-full flex flex-col md:flex-row lg:px-8 justify-between'>
            <h1 className='font-semibold text-3xl'>Reportes</h1>
        </div>
        {/* <TablaClientes setAgregarClientes={setAgregarClientes} setEditState={setEditState} /> */}
        <div className="px-4 sm:px-6 lg:px-8">
			<div className="-mx-4 mt-8 sm:-mx-0">
				<div className="min-w-full divide-y divide-gray-300 border rounded-t-md rounded-b-md">
					<div className="bg-azul-pantone text-BlancoIvory ">
						<div className="grid grid-cols-2 gap-4 w-full md:grid-cols-6 ">
							<div scope="col" className=" px-3 py-3.5 text-sm text-center font-semibold  sm:table-cell">Proceso</div>
							<div scope="col" className="hidden md:block px-3 py-3.5 text-center text-sm font-semibold  lg:table-cell">Descripcion</div>
							<div scope="col" className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold  lg:table-cell">Usuario</div>
							<div scope="col" className=" hidden md:block  px-3 py-3.5 text-center text-sm font-semibold  lg:table-cell">Tipo de auditoria</div>
							<div scope="col" className=" hidden md:block px-3 py-3.5 text-center text-sm font-semibold  lg:table-cell">Fecha</div>
						</div>
					</div>
                    <div className="divide-y divide-gray-200 bg-white">
                        {stats && stats?.map( stat => <div key={stat.id} className="grid grid-cols-2 gap-4 md:grid-cols-6 ">
                            <div className=" whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 lg:table-cell">{stat.process}</div>
                            <div className=" whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 lg:table-cell">{stat.descrip}</div>
                            <div className=" whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 lg:table-cell">{stat.userName}</div>
                            <div className=" whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 lg:table-cell">{stat.type}</div>
                            <div className=" whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 lg:table-cell">{stat.dateReg}</div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}