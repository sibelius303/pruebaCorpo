'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BanknotesIcon } from '@heroicons/react/24/outline'


const statusStyles = {
	success: 'bg-green-100 text-green-800',
	processing: 'bg-yellow-100 text-yellow-800',
	failed: 'bg-gray-100 text-gray-800',
}

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}




export default function ModalSalesDay({ open, setOpen, dataSalesDay, setDetailsOpen, setDataDetails, openDetailsSalesModal, dataDetails }) {

	const [pagActual, setPagActual] = useState(1);
	const [cantPag, setCantPag] = useState(10);
	const cancelButtonRef = useRef(null)


	useEffect(() => {
		setPagActual(1);
		setCantPag(10);
	}, [])

	let arraySlice = dataSalesDay && dataSalesDay?.slice(((pagActual * cantPag) - cantPag), cantPag * pagActual);
	const verificarElementos = Math.ceil(dataSalesDay.length / cantPag);

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
		<div className="fixed inset-0 z-20 bg-negro bg-opacity-75 transition-opacity" >
			<div className="fixed inset-0 z-20 overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-BlancoIvory px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-auto sm:p-6">
						<div className=" mb-16 mt-16 block">
							<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
								<div className="mt-2 flex flex-col">
									<div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
										<div className="min-w-full divide-y divide-gray-200 bg-BlancoIvory">
											<div className='text-BlancoIvory bg-azul-pantone'>
												<div className='grid grid-cols-1 lg:grid-cols-6'>
													<div
														className=" lg:col-span-2 px-6 py-3 text-center text-sm font-semibold "
														scope="col"
													>
														Ultimas Transacciones
													</div>
													<div
														className=" px-6 py-3 text-center  text-sm font-semibold "
														scope="col"
													>
														Fecha
													</div>
													<div
														className=" px-6 py-3 text-center text-sm font-semibold "
														scope="col"
													>
														Cliente
													</div>
													<div
														className=" px-6 py-3 text-center  text-sm font-semibold "
														scope="col"
													>
														Monto
													</div>
													<div
														className="hidden  px-6 py-3 text-center  text-sm font-semibold  md:block"
														scope="col"
													>
														Sucursal
													</div>

												</div>
											</div>
											<div className="divide-y divide-gray-200 bg-white min-h-96">
												{arraySlice?.length > 0 ? arraySlice?.slice().reverse().map((transaction, id) => (
													<div key={id} onClick={() => { setDetailsOpen(true); setDataDetails(transaction) }} className="bg-white  grid grid-cols-1 lg:grid-cols-6 hover:bg-Gris hover:cursor-pointer">
														<div className="w-full  whitespace-nowrap px-6 py-4 lg:col-span-2 text-sm ">
															<div className="flex justify-center w-full">
																<BanknotesIcon
																	className="h-5 w-5 flex-shrink-0 text-negro group-hover:text-gray-500"
																	aria-hidden="true"
																/>
																<p className=" text-negro text-center group-hover:">
																	{transaction.userName}
																</p>
															</div>
														</div>
														<div className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
															<p>{transaction?.dateReg?.substring(0, 10).split("-").reverse().join("-")}</p>
														</div>

														<div className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
															<span className="font-medium ">{transaction.client}</span>
														</div>
														<div className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
															<span className="font-medium ">{transaction.amount}</span>
														</div>
														<div className="hidden whitespace-nowrap text-center px-6 py-4 text-sm text-gray-500 md:block">
															<span
																className={classNames(
																	statusStyles[transaction.status],
																	'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize'
																)}
															>
																{transaction.branchName}
															</span>
														</div>


													</div>
												)) : <h1 className='w-full text-center'>No hay elementos para mostrar</h1>}
											</div>
											<div className="px-5 py-5 bg-BlancoIvory flex flex-col xs:flex-row items-center xs:justify-between">
												<div className=" xs:mt-0">
													<select className="block w-full bg-gray-100 border rounded py-1  mb-3 leading-tight focus:bg-white " value={cantPag} onChange={(e) => setCantPag(e.target.value)}>
														<option value="10">10</option>
														<option value="20">20</option>
														<option value="30">30</option>
													</select>
												</div>
												{/* <span className="text-xs xs:text-sm ">
													{dataSalesDay.length === 0 ? (`Mostrando ${dataSalesDay.length} de ${dataSalesDay.length} `) : (`Mostrando ${cantPag < dataSalesDay.length ? cantPag : dataSalesDay.length} de ${dataSalesDay.length}`)}

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
																	<button className={`text-sm text-BlancoIvory transition duration-150 hover:bg-opacity-80 bg-rojo-pantone font-semibold py-2 px-2 rounded ${el === pagActual && ("bg-opacity-50")} `} onClick={() => setPagActual(el)}>
																		{el}
																	</button>
																</Fragment>
															)
															)}
														<span className="text-sm text-BlancoIvory transition duration-150 hover:bg-opacity bg-rojo-pantone font-semibold py-2 px-2 rounded">
															...
														</span>
														<button
															className={`text-sm text-BlancoIvory transition duration-150 hover:bg-opacity-25 bg-rojo-pantone font-semibold py-2 px-2 rounded ${totalPages.includes(pagActual) && "bg-opacity-50"
																}`}
															onClick={() => {
																if (totalPages[totalPages.length - 1]) {
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
													<button className={` ${validarNextBoton(pagActual, verificarElementos) ? ("opacity-25 text-sm text-BlancoIvory bg-rojo-pantone font-semibold py-2 px-2 rounded-l") : ('text-sm text-BlancoIvory transition duration-150 hover:bg-opacity-20 bg-rojo-pantone font-semibold py-2 px-2 rounded-r')}`} onClick={() => { nextPag() }} disabled={validarNextBoton(pagActual, verificarElementos)}>
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
															<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
														</svg>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-span-full sm:gap-3">
							<button
								type="button"
								className="inline-flex w-full justify-center rounded-md bg-azul-pantone px-3 py-2 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-80 sm:col-span-full md:col-span-1"
								onClick={() => setOpen(false)}
							>
								Atras
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
