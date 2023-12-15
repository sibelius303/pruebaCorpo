import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function ModalDetails({ open, setOpen, saleData, modalSalesDayOpen, GetListSalesDay, GetListSalesDayBranch, GetListSalesDayClient, UserDataJson }) {

	const cancelButtonRef = useRef(null)
	return (
		<div className="fixed inset-0 z-10 bg-negro bg-opacity-75 transition-opacity overflow-auto">
			<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
				<div className="relative transform overflow-hidden rounded-lg bg-BlancoIvory px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-auto sm:p-6">
					<div className="min-w-full divide-y divide-gray-200 bg-BlancoIvory border-2">
						<div className='text-BlancoIvory bg-azul-pantone grid grid-cols-6 rounded-t-md '>
							<div
								className="  px-6 py-3 text-center  text-sm font-semibold   col-span-2"
							>
								Fecha
							</div>
							<div
								className=" px-6 py-3 text-center  text-sm font-semibold  col-span-2"
							>
								Monto
							</div>
							<div
								className=" px-6 py-3 text-center  text-sm font-semibold  col-span-2"
								scope="col"
							>

							</div>

						</div>
						<div className="divide-y divide-gray-200 bg-white">
							{saleData?.length > 0 ? saleData?.map((transaction, id) => (
								<div key={id} className="bg-white grid grid-cols-6  hover:bg-Gris hover:cursor-pointer">
									<div className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900 col-span-2">
										<div className="flex">
											<p className=" text-negro text-center group-hover:text-gray-900">
												{transaction?.dateReg?.substring(0, 10).split("-").reverse().join("-")}
											</p>
										</div>
									</div>
									<div className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500 col-span-2">
										<span className="font-medium text-gray-900">{transaction.amount}</span>
									</div>
									<div className='col-span-2 flex justify-center items-center'>
										<button className='col-span-2 bg-rojo-pantone text-BlancoIvory px-2 py-2 rounded-md hover:bg-red-600'
											onClick={() => {
												if (UserDataJson?.idType === 99) {
													GetListSalesDay(transaction.dateReg).then(res =>{modalSalesDayOpen(true);})
												} else if (UserDataJson?.idType === 1) {
													GetListSalesDayBranch(transaction.dateReg).then(res =>{modalSalesDayOpen(true)})
												} else {
													GetListSalesDayClient(transaction.dateReg).then(res => { modalSalesDayOpen(true) })
												}
											}}>
											Detalles
										</button>
									</div>
								</div>
							)) : <h1 className='w-full text-center'>No hay elementos para mostrar</h1>}
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
	)
}
