import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({ open, setOpen, dataDetails }) {

	const cancelButtonRef = useRef(null)

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-negro bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden w-auto rounded-lg bg-BlancoIvory px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8  sm:p-6">

								<div className="w-auto p-2">
									<h1 className="text-xl text-black font-bold text-center mb-4">
										Detalles de la Venta
									</h1>
									<div className="grid grid-cols-2 gap-x-4">
										<p className="col-span-full"><b>Nro Factura:</b> {dataDetails?.nro} </p>
										<p><b>Id Venta:</b> {dataDetails?.saleId} </p>
										<p><b>Fecha:</b> {dataDetails?.dateReg?.substring(0, 10).split("-").reverse().join("-")} </p>
										<p><b>Sucursal:</b> {dataDetails?.branchName} </p>
										<p><b>Clientes:</b> {dataDetails?.client} </p>
										<p><b>Usuario:</b> {dataDetails?.userName} </p>
										<p><b>Monto:</b> {dataDetails?.amount} </p>
										<p><b>Cantidad Total:</b> {dataDetails?.qty} </p>

									</div>
									<div>
										<h1 className='text-center text-lg font-bold my-4'>Productos</h1>
										{
											dataDetails?.details?.map((el, id) => (
												<div key={id} className='grid grid-cols-2 my-2'>
													<p><b>SKU:</b> {el.code}</p>
													<p><b>Producto:</b> {el.name}</p>
													<p><b>Precio de Venta:</b> {el.amount}</p>
													<p><b>Cantidad:</b> {el.qty}</p>
													<p><b>Precio 1:</b> {el?.price1} </p>
													<p><b>Precio 2:</b> {el?.price2} </p>
												</div>
											))
										}
									</div>
									<div>
										<h1 className='text-center text-lg font-bold my-4'>Metodos de Pago</h1>
										{
											dataDetails?.paymentMethod?.map((el, id) => (
												<div key={id} className='grid grid-cols-2 my-2'>
													<p><b>Metodo Pago:</b> {el.descrip}</p>
													<p><b>Monto:</b> {el.amount}</p>
												</div>
											))
										}
									</div>

								</div>

								<div className="mt-5 w-full">
									<button
										type="button"
										className="inline-flex w-full justify-center rounded-md bg-azul-pantone px-3 py-2 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  sm:col-start-2"
										onClick={() => {
											setOpen(false)
										}}
									>
										Cancelar
									</button>
									{/* <button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-BlancoIvory px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-Gris sm:col-start-1 sm:mt-0"
										onClick={() => {
											setOpen(false)

										}}
										ref={cancelButtonRef}
									>
										{boton2}
									</button> */}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
