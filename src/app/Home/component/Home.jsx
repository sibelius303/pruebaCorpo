'use client'
import { useEffect, useState } from 'react'

import {
    BanknotesIcon,

} from '@heroicons/react/20/solid'
import useFront from '@/hooks/useFront'
import ModalDetails from './ModalDetails'
import Image from 'next/image'
import "react-toastify/dist/ReactToastify.css";
import Modal from './Modal'
import TablaVentas from './TableVentas'
import logoCobre from '../../../../public/LOGO_COBRE.png'
import ModalSalesDay from './ModalSalesDay'
import ModalDetailsSale from './ModalDetailsSale'
import LoaderScreen from '@/components/LoaderScreen'
import ModalReutilizable from '@/components/ModalReutilizable'


const statusStyles = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Home() {
    const [open, setOpen] = useState(false);
    const [datailsOpen, setDetailsOpen] = useState(false)
    const [dataDetails, setDataDetails] = useState([]);
    const [dataSaleDetails, setDataSaleDetails] = useState([])
    const [dayAmount, setDayAmount] = useState([]);
    const [ultimasTrans, setUltimasTrans] = useState([]);
    const [salesProd, setSalesProd] = useState([])
    const [openSalesDay, setOpenSalesDay] = useState(false)
    const [openDetailsSalesModal, setOpenDetailsSalesModal] = useState(false)
    const [dataCardModal, setDataCardModal] = useState([]);
    const [isRotate, setIsRotate] = useState(false);
    const { dataHome, UserDataJson, dataSalesDay, GetListSalesDay, setScreenPending, screenPending, GetListSalesDayBranch, GetListSalesDayClient, GetHome } = useFront();

    useEffect(() => {
        if(UserDataJson){
            GetHome()
        } else {
            return
        }
        
    }, [UserDataJson])

    useEffect(() => {
        if (dataHome) {
            setScreenPending(false);
            setDayAmount(dataHome?.statisticsByDate);
            setUltimasTrans(dataHome?.lastTrans);
            setSalesProd(dataHome?.salesProd);
        } else {
            return
        }

    }, [dataHome])

    return (
        <>
            {
                screenPending ? <LoaderScreen /> : <main className="flex-1 pb-8">
                    {/* Page header */}
                    <div className="bg-white shadow">
                        <div className=" bg-BlancoIvory  ">
                            <div className="py-6  md:flex md:items-center md:justify-between lg:px-8">
                                <div className="min-w-0 flex-1 ">
                                    {/* Profile */}
                                    <div className="flex items-center">
                                        { UserDataJson && <Image
                                            className="hidden h-28 w-28 rounded-full sm:block"
                                            width={100}
                                            height={100}
                                            src={ !!UserDataJson?.image ? UserDataJson?.image: logoCobre}
                                            alt=""
                                            priority
                                        />}
                                        <div>
                                            <div className="flex items-center">
                                                { UserDataJson && <Image
                                                    className="h-16 w-16 rounded-full sm:hidden"
                                                    src={ !!UserDataJson?.image ? UserDataJson?.image: logoCobre}
                                                    alt=""
                                                    width={100}
                                                    height={100}
                                                    priority
                                                />}
                                                <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                                                    Bienvenido, {UserDataJson?.name}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        {<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                            <div className='flex gap-2'>
                                <h2 className="text-2xl font-bold leading-6 text-negro my-6">Estadisticas</h2>
                                <button onClick={() => { setIsRotate(true); GetHome().then(res => setIsRotate(false)) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-4 h-4 ${isRotate ? 'animate-spin' : ''} `}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-2 grid grid-cols-1 gap-5  lg:grid-cols-3">
                                {/* Card */}
                                {dayAmount?.length > 0 && dayAmount?.map((card, id) => (
                                    <div key={id} className="overflow-hidden rounded-lg bg-BlancoIvory shadow">
                                        <div className="p-5">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <BanknotesIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className=" text-sm font-medium text-negro">{card.type === 1 && 'Ganancias del Dia'}{card.type === 2 && 'Ganancias de la Semana'}{card.type === 3 && 'Ganancias del Mes'}</dt>
                                                        <dd>
                                                            <div className="text-lg font-medium text-gray-900">$ {card.amount}</div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-azul-pantone px-5 py-3 hover:opacity-80">
                                            <div className="text-sm">
                                                <button onClick={() => { setOpen(true); setDataCardModal(card.details) }} className="font-medium   text-BlancoIvory w-full h-full hover:opacity-80">
                                                    Detalles
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>}
                        <TablaVentas datailsOpen={datailsOpen} setDetailsOpen={setDetailsOpen} setDataDetails={setDataDetails} ultimasTrans={ultimasTrans} />
                        <div className=" mb-16 mt-16 block">
                            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                                <div className="mt-2 flex flex-col">
                                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                                        <div className="min-w-full divide-y divide-gray-200 bg-BlancoIvory">
                                            <div className='text-BlancoIvory bg-azul-pantone'>
                                                <div className='grid grid-cols-1 lg:grid-cols-7 w-full'>
                                                    <div
                                                        className=" px-6 py-3 text-center text-sm lg:col-span-3 font-semibold "
                                                        scope="col"
                                                    >
                                                        Productos mas Vendidos
                                                    </div>
                                                    <div
                                                        className="  px-6 py-3 text-center text-sm font-semibold lg:col-span-2 md:block"
                                                        scope="col"
                                                    >
                                                        SKU del Producto
                                                    </div>
                                                    <div
                                                        className=" px-6 py-3 text-center text-sm font-semibold lg:col-span-2"
                                                        scope="col"
                                                    >
                                                        Nombre
                                                    </div>
                                                    {/* <div
                                                className=" px-6 py-6 text-right text-sm font-semibold text-gray-900"
                                                scope="col"
                                            >

                                            </div> */}
                                                </div>
                                            </div>
                                            <div className="divide-y divide-gray-200 bg-white">
                                                {salesProd?.length > 0 ? salesProd?.map((transaction, id) => (
                                                    <div key={id} className="bg-white grid grid-cols-1 lg:grid-cols-7 w-full">
                                                        <div className="w-full max-w-0 whitespace-nowrap lg:col-span-3 px-6 py-4 text-sm text-gray-900">
                                                            <div className="flex">

                                                                <BanknotesIcon
                                                                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                                <p className=" text-negro group-hover:text-gray-900">
                                                                    Cantidad Vendida: {transaction.qty}
                                                                </p>

                                                            </div>
                                                        </div>
                                                        <div className="whitespace-nowrap px-6 py-4  text-sm text-center lg:col-span-2 text-gray-500">
                                                            <span className="font-medium text-gray-900">{transaction.code}</span>

                                                        </div>
                                                        <div className=" whitespace-nowrap px-6 py-4 text-sm text-center lg:col-span-2 text-gray-500 block">
                                                            <span
                                                                className={classNames(
                                                                    statusStyles[transaction.status],
                                                                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize'
                                                                )}
                                                            >
                                                                {transaction.name}
                                                            </span>
                                                        </div>
                                                        <div className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                                            <time dateTime={transaction.datetime}>{transaction.date}</time>
                                                        </div>
                                                    </div>
                                                )) : <h1 className='text-center w-full'>No hay elementos para mostrar</h1>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activity div (small breakpoint and up) */}
                    </div>
                    {
                        open && <ModalReutilizable>
                            <ModalDetails open={open} setOpen={setOpen} saleData={dataCardModal} modalSalesDayOpen={setOpenSalesDay} GetListSalesDay={GetListSalesDay} GetListSalesDayBranch={GetListSalesDayBranch} UserDataJson={UserDataJson} GetListSalesDayClient={GetListSalesDayClient} />
                        </ModalReutilizable>
                    }

                    {openSalesDay && <ModalReutilizable>
                        <ModalSalesDay open={openSalesDay} setOpen={setOpenSalesDay} dataSalesDay={dataSalesDay} setDetailsOpen={setOpenDetailsSalesModal} setDataDetails={setDataSaleDetails} />
                    </ModalReutilizable>}
                    <Modal open={datailsOpen} setOpen={setDetailsOpen} dataDetails={dataDetails} />
                    {openDetailsSalesModal && <ModalReutilizable>
                        <ModalDetailsSale open={openDetailsSalesModal} setOpen={setOpenDetailsSalesModal} dataDetails={dataSaleDetails} setDataDetails={setDataSaleDetails} />
                    </ModalReutilizable>}
                </main>
            }

        </>


    )
}
