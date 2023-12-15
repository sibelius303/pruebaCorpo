'use client'

import { useState } from "react"


export default function TablaPagos({ pagoTable, setPagoTable, setTotales, setAuxTotal }) {
	const [open, setOpen] = useState(false)
	const [dataDetails, setDataDetails] = useState(false);

	const SumMonto = (valores) => {
		console.log(valores)
        setTotales((prevState) => {
            const copia = { ...prevState };
                copia.monto = copia.monto + parseFloat(valores);
            return copia;
        });
    };

	return (
		<div className="mb-32 lg:mb-0">
			<div className=" lg:mt-8 sm:-mx-0">
				<div className="min-w-full divide-y divide-gray-300 bg-BlancoIvory border rounded-md">
					<div className="bg-azul-pantone text-BlancoIvory">
						<div className="grid grid-cols-2 gap-4 pl-7 md:grid-cols-2 lg:grid-cols-3 lg:pr-7">
							<div scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-0">
								Metodo de Pago
							</div>
							<div scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-0">
								Monto
							</div>
						</div>
					</div>
					<div className="divide-y divide-gray-200 bg-white">
						{pagoTable?.map((compra,id) => (

							<div key={id} className="grid pl-7 grid-cols-3 gap-6 cursor-pointer hover:bg-Gris md:grid-cols-3 lg:grid-cols-3 lg:pr-7">
								<div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
									{compra.metodoPago.descrip}
								</div>
								<div className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
									{parseFloat(compra.monto).toFixed(2)}
								</div>
								<div className="py-4">
									<button
										onClick={() => { setPagoTable(prev => prev.filter(el => el.id !== compra.id)); SumMonto(compra.monto); setAuxTotal(prev=>prev + 1) }}
										className='bg-negro text-rojo-pantone px-2 py-1 rounded-md hover:bg-red-600'
									>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
										</svg>
									</button>
								</div>

							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
