'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { Field, Formik } from 'formik'
import "react-toastify/dist/ReactToastify.css";
import useFront from '@/hooks/useFront'
import Tooltip from '@/app/Ventas/Components/Tooltip';
import Toggle from './Toggle';

export default function ModalConciliar({ open, setOpen, children, boton1, boton2, dataModal, setAuxOrderTab, setAuxOrder }) {
	const { orderUpdate } = useFront()
	const [montoAux, setMontoAux] = useState(0);
	const [checked, setChecked] = useState(false);
	const [checked2, setChecked2] = useState(false);
	const [priceActive, setPriceActive] = useState(0);

	const cancelButtonRef = useRef(null)

	useEffect(()=>{
		return ()=>{
			setMontoAux(0);
			setChecked(false);
			setChecked2(false);
			setPriceActive(0)
		}
	},[])



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
							<Dialog.Panel className="relative transform text-sm overflow-hidden rounded-lg bg-BlancoIvory px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								{dataModal?.descripType !== "Sucursal" ? <div>
									<Formik
										initialValues={{
											orderId: dataModal?.orderId,
											ok: "false",
											comment: "",
											amount: montoAux,
											typePrice: priceActive
										}}
										onSubmit={(valores) => {
											valores.ok = checked
											valores.typePrice = parseFloat(valores.typePrice)
											valores.amount = parseFloat(montoAux)
											valores.typePrice = priceActive
											orderUpdate(valores,setOpen, setAuxOrder)
											console.log(valores)
										}}
									>{({ handleSubmit, handleChange }) => (
										<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
											<div className="flex flex-col gap-2 w-full">
												<label htmlFor="ok" className="block text-sm w-full text-center font-bold leading-6 text-slate-400">
													Aceptar
												</label>
												<div className="flex justify-center gap-28 mt-5 w-full">
													<Toggle obj={checked} action={setChecked}/>
												</div>
											</div>
											<div className="flex flex-col gap-2">
												<label htmlFor='comment' className="block text-sm w-full text-center font-bold leading-6 text-slate-400">
													Comentario
												</label>
												<Field
													type="text"
													name="comment"
													id="comment"
												/>
											</div>
											<div className="flex flex-col gap-2 w-full">
												<label htmlFor="ok" className="block text-sm w-full text-center font-bold leading-6 text-slate-400">
													Selecionar Precio
												</label>
												<div className='w-full flex justify-center'>
                                                            <Tooltip text="Activar precio 1" >
                                                                <button type="button"  className={`w-full rounded-l-md py-4 px-5 text-sm font-medium bg-negro text-BlancoIvory ${priceActive === 1 && 'bg-opacity-60'}`} onClick={() => {setPriceActive(1);setMontoAux(dataModal?.qty * dataModal?.price1)}}>
                                                                    P1
                                                                </button>
                                                            </Tooltip>
                                                            <Tooltip text="Activar precio 2" >
                                                                <button type="button"  className={`w-full py-4 px-5 text-sm font-medium rounded-r-md bg-negro text-BlancoIvory ${priceActive === 2 && 'bg-opacity-60'}`} onClick={() => {setPriceActive(2);setMontoAux(dataModal?.qty * dataModal?.price2)}}>
                                                                    P2
                                                                </button>
                                                            </Tooltip>
                                                            {/* <Tooltip text="Activar precio distribuidor" >
                                                                <button type="button"  className={`w-full py-4 px-5 text-sm font-medium bg-negro text-BlancoIvory ${priceActive === 3 && 'bg-opacity-60'}`} onClick={() => {setPriceActive(3);setMontoAux(dataModal?.qty * dataModal?.price3)}}>
                                                                    P3
                                                                </button>
                                                            </Tooltip>
                                                            <Tooltip text="Activar precio distribuidor sin estuche" >
                                                                <button type="button" className={`w-full py-4 px-5 text-sm font-medium bg-negro rounded-r-md text-BlancoIvory ${priceActive === 4 && 'bg-opacity-60'}`} onClick={() => {setPriceActive(4);setMontoAux(dataModal?.qty * dataModal?.price4)}}>
                                                                    P4
                                                                </button>
                                                            </Tooltip> */}
                                                        </div>
												<div className="flex flex-col gap-2">
													<label htmlFor='amount' className="block text-sm w-full text-center font-bold leading-6 text-slate-400">
														Monto
													</label>
													<Field
														type="number"
														name="amount"
														id="amount"
														value={montoAux}
														onChange={(e) => {
															setMontoAux(e.target.value)
															handleChange(e)
														}}
													/>
												</div>
											</div>
											<div className="flex justify-end w-full">
												<button type="submit" className=" bg-rojo-pantone w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
													Enviar
												</button>
											</div>
										</form>
									)}</Formik>
								</div> : <div>
									<Formik
										initialValues={{
											orderId: dataModal?.orderId,
											ok: "false",
											comment: "",
											amount: 0,
											typePrice: 0
										}}
										onSubmit={(valores) => {
											valores.ok = checked2
											valores.typePrice = parseFloat(valores.typePrice)
											orderUpdate(valores,setOpen)
											console.log(valores)
										}}
									>{({ handleSubmit, handleChange }) => (
										<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
											<div className="flex flex-col gap-2 w-full">
												<label htmlFor="ok" className="block text-sm w-full text-center font-bold leading-6 text-slate-400">
													Aceptar
												</label>
												<div className="flex justify-center gap-28 mt-5 w-full">
													<Toggle obj={checked2} action={setChecked2}/>
												</div>
											</div>
											<div className="flex flex-col gap-2">
												<label htmlFor='comment' className="block text-sm w-full text-center font-bold leading-6 text-slate-400">
													Comentario
												</label>
												<Field
													type="text"
													name="comment"
													id="comment"
												/>
											</div>
											{/* <div className="flex flex-col gap-2 w-full">
												<label htmlFor="ok" className="block text-sm w-full text-center font-bold leading-6 text-slate-400">
													Selecionar Precio
												</label>
												<div className='w-full flex justify-center'>
                                                            <Tooltip text="Activar precio minorista" >
                                                                <button type="button"  className={`w-full rounded-l-md py-4 px-5 text-sm font-medium bg-negro text-BlancoIvory ${priceActive === dataModal?.price1 && 'bg-opacity-60'}`} onClick={() => {setPriceActive(dataModal?.price1);setMontoAux(dataModal?.qty * dataModal?.price1)}}>
                                                                    P1
                                                                </button>
                                                            </Tooltip>
                                                            <Tooltip text="Activar precio web" >
                                                                <button type="button"  className={`w-full py-4 px-5 text-sm font-medium bg-negro text-BlancoIvory ${priceActive === dataModal?.price2 && 'bg-opacity-60'}`} onClick={() => {setPriceActive(dataModal?.price2);setMontoAux(dataModal?.qty * dataModal?.price2)}}>
                                                                    P2
                                                                </button>
                                                            </Tooltip>
                                                            <Tooltip text="Activar precio distribuidor" >
                                                                <button type="button"  className={`w-full py-4 px-5 text-sm font-medium bg-negro text-BlancoIvory ${priceActive === dataModal?.price3 && 'bg-opacity-60'}`} onClick={() => {setPriceActive(dataModal?.price3);setMontoAux(dataModal?.qty * dataModal?.price3)}}>
                                                                    P3
                                                                </button>
                                                            </Tooltip>
                                                            <Tooltip text="Activar precio distribuidor sin estuche" >
                                                                <button type="button" className={`w-full py-4 px-5 text-sm font-medium bg-negro rounded-r-md text-BlancoIvory ${priceActive === dataModal?.price4 && 'bg-opacity-60'}`} onClick={() => {setPriceActive(dataModal?.price4);setMontoAux(dataModal?.qty * dataModal?.price4)}}>
                                                                    P4
                                                                </button>
                                                            </Tooltip>
                                                        </div> */}
												{/* <div className="flex flex-col gap-2">
													<label htmlFor='amount' className="block text-sm w-full text-center font-bold leading-6 text-slate-400">
														Monto
													</label>
													<Field
														type="number"
														name="amount"
														id="amount"
														value={montoAux}
														onChange={(e) => {
															setMontoAux(e.target.value)
															handleChange(e)
														}}
													/>
												</div> */}
											{/* </div> */}
											<div className="flex justify-end w-full">
												<button type="submit" className=" bg-rojo-pantone w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
													Enviar
												</button>
											</div>
										</form>
									)}</Formik>
								</div>}
								<div className="mt-5 w-full">
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400 sm:col-start-1 sm:mt-0"
										onClick={() => {setOpen(false);setChecked(false);setChecked2(false)}}
										ref={cancelButtonRef}
									>
										Cancelar
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
