

import {
    BanknotesIcon,
} from '@heroicons/react/20/solid'




const statusStyles = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TablaVentas({ setDetailsOpen, setDataDetails, ultimasTrans}) {

    //const fechaHoraActual = new Date()
    //const formatoISO8601 = fechaHoraActual.toISOString();

    return (
        <div className=" mb-16 mt-16 block">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mt-2 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                        <div className="min-w-full divide-y divide-gray-200 bg-BlancoIvory">
                            <div className='text-BlancoIvory bg-azul-pantone'>
                                <div className='grid grid-cols-1 lg:grid-cols-7'>
                                    <div
                                        className="lg:col-span-2 px-6 py-3 text-center text-sm font-semibold "
                                        scope="col"
                                    >
                                        Ultimas Transacciones
                                    </div>
                                    <div
                                        className="px-6 py-3 text-center text-sm font-semibold "
                                        scope="col"
                                    >
                                        Cliente
                                    </div>
                                    <div
                                        className="px-6 py-3 text-center  text-sm font-semibold "
                                        scope="col"
                                    >
                                        Monto
                                    </div>
                                    <div
                                        className="hidden px-6 py-3 text-center  text-sm font-semibold  md:block"
                                        scope="col"
                                    >
                                        Sucursal
                                    </div>
                                    <div
                                        className="px-6 py-3 text-center  text-sm font-semibold "
                                        scope="col"
                                    >
                                        Fecha
                                    </div>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200 bg-white">
                                {ultimasTrans?.length > 0 ? ultimasTrans?.map((transaction, id) => (
                                    <div key={id} onClick={() => { setDetailsOpen(true); setDataDetails(transaction) }} className="bg-white grid grid-cols-1 lg:grid-cols-7 hover:bg-Gris hover:cursor-pointer">
                                        <div className="w-full max-w-0 whitespace-nowrap px-6 py-4 lg:col-span-2 text-sm ">
                                            <div className="flex">
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
                                        <div className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                                            <time>{transaction?.dateReg?.substring(0, 10).split("-").reverse().join("-")}</time>
                                        </div>
                                    </div>
                                )) : <h1 className='w-full text-center'>No hay elementos para mostrar</h1>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



