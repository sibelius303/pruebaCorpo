'use client'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function ModalSucces({open, setOpen, children, boton1, boton2, setStep, setArrfilter, setDataProductsSales }) {
	// const router = useRouter()


	//const cancelButtonRef = useRef(null)

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10"  onClose={setOpen}>
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
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-BlancoIvory px-4 pb-4  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div>
									{children}
								</div>
								<div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-inset ring-gray-300 hover:bg-negro hover:bg-opacity-75 sm:col-start-1 sm:mt-0 col-span-2"
										onClick={() => {setOpen()}}
										//ref={cancelButtonRef}
									>
										{boton2}
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
