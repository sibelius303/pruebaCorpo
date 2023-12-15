'use client'

import { Fragment, useEffect, useState } from 'react'
import {
    Bars4Icon,
    Squares2X2Icon as Squares2X2IconMini,
} from '@heroicons/react/20/solid'


import Stepper from '@/app/Ventas/Components/Stepper'
import ProductGallery from '../Components/ProductGallery'
import ShoppingCart from '../Components/ShoppingCart'
import FormPayment from '../Components/FormPayment'
import FormCliente from '../Components/FormCliente'
import ModalSucces from '../Components/ModalSucces'
import TablaProductos from '../Components/TablaProductos'
import "react-toastify/dist/ReactToastify.css";
import useFront from '@/hooks/useFront'
import Tooltip from './Tooltip'
import LoaderScreen from '@/components/LoaderScreen'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Sales() {
    const { dataCategory, dataProductsSales, dataSucursal, GetProductsSales, setDataProductsSales, setScreenPending, screenPending, openModalSucces,
        setOpenModalSucces, dataProductsClient, UserDataJson, setPending ,setDataProductsClient, GetListConciliationClient, GetListProduct } = useFront()
    const [stepAux, setStepAux] = useState(0)
    const [carrito, setCarrito] = useState([]);
    const [auxFormClient, setAuxFormClient] = useState(true)
    const [auxFormPayment, setAuxFormPayment] = useState(true)
    const [open, setOpen] = useState(false)
    const [listActive, setListActive] = useState(0)
    const [clientInfo, setClientInfo] = useState([])
    const [pagoTable, setPagoTable] = useState([]);
    const [auxTotal, setAuxTotal] = useState(0);
    const [data, setData] = useState([]);
    const [arrFilter, setArrfilter] = useState([])
    const [priceActive, setPriceActive] = useState(1);
    const [sucursalActive, setSucursalActive] = useState(false)
    const [filterAux, setFilterAux] = useState(0);
    const [currencyActive, setCurrencyActive] = useState('BS');
    const [auxUdapte, setAuxUpdated] = useState(0)



    useEffect(() => {
        if (UserDataJson?.idType === 2) {
            GetListConciliationClient();
        } else {
            setScreenPending(false);
            setPending(false);
        }
        return () => {
            setArrfilter([]);
            setOpen(false);
            setDataProductsSales([]);
            setDataProductsClient([]);
            setStepAux(0);
        }
    }, [UserDataJson, auxUdapte])

    
    useEffect(() => {
        if (dataProductsClient && dataProductsClient?.length > 0 ) {
            setArrfilter(dataProductsClient);
            setScreenPending(false);
            setPending(false);
        }
        else if (dataProductsSales && dataProductsSales?.length > 0 ) {
            setArrfilter(dataProductsSales?.filter(el => el.qty > 0));
            setScreenPending(false);
            setPending(false);
        }
    }, [dataProductsSales, dataProductsClient])

    const agregarProducto = (product) => {
        let typeQty = UserDataJson?.idType === 2 ? product.qtyReg : product.qty;
        let copia = [...carrito]
        if (carrito.some((el) => el.idProd === product.idProd)) {
            copia.forEach((el) => {
                if (el.idProd === product.idProd) {
                    if (el.cantidad < typeQty) {
                        el.cantidad = el.cantidad + 1
                        setCarrito([...copia])
                    }
                }
            })

        } else {
            product.cantidad = 1
            copia.push(product)
            setCarrito(copia);

        }
    }



    const closeModalSucces = () => {
        setArrfilter([]);
        setOpenModalSucces(false);
        setDataProductsSales([]);
        setStepAux(0)
    }

    return (
        <>
            {
                screenPending ? <LoaderScreen /> : <div>
                    {UserDataJson?.idType !== 2 && <div className='px-10 mt-10'>
                        <Stepper Step={stepAux} />
                    </div>}
                    <div className="flex overflow-hidden w-full pb-6 md:px-10">
                        {
                            stepAux === 0 &&

                            <>
                                <main className="overflow-y-auto  max-w-full w-full ">
                                    <div className="mx-auto px-4 pt-8 sm:px-6 lg:px-8">
                                        <div className="flex">
                                            {UserDataJson?.idType === 2 ? <h1 className="flex-1 text-2xl font-bold text-gray-900">Conciliar Productos Vendidos</h1> : <h1 className="flex-1 text-2xl font-bold text-gray-900">Productos</h1>}
                                        </div>

                                        {/* Tabs */}
                                        <div className="-mt-3 sm:mt-14">
                                            <div className="block">
                                                <div className="flex items-center flex-col w-full border-b border-gray-200 mt-6">
                                                    {UserDataJson?.idType !== 2 && <nav className=" flex w-full mb-10 justify-center" >

                                                        <button
                                                            onClick={() => { setCurrencyActive('BS') }}
                                                            className={classNames(
                                                                `whitespace-nowrap py-4 px-5 text-sm font-medium bg-azul-pantone text-BlancoIvory rounded-l-md ${currencyActive === 'BS' && 'bg-opacity-60'}`
                                                            )}
                                                        >
                                                            BS
                                                        </button>
                                                        <button
                                                            onClick={() => { setCurrencyActive('USD') }}
                                                            className={classNames(
                                                                `whitespace-nowrap py-4 px-5 text-sm font-medium bg-azul-pantone text-BlancoIvory ${currencyActive === 'USD' && 'bg-opacity-60'}`
                                                            )}
                                                        >
                                                            USD
                                                        </button>
                                                        <button
                                                            onClick={() => { setCurrencyActive('EUR') }}
                                                            className={classNames(
                                                                `whitespace-nowrap py-4 px-5 text-sm font-medium bg-azul-pantone text-BlancoIvory rounded-r-md ${currencyActive === 'EUR' && 'bg-opacity-60'}`
                                                            )}
                                                        >
                                                            EUR
                                                        </button>
                                                    </nav>}
                                                    {UserDataJson?.idType !== 2 && <div className='flex flex-col md:w-full  md:flex-row md:justify-between '>
                                                        <nav className="-mb-px flex flex-col w-full  md:flex-row" >

                                                            <button
                                                                onClick={() => { setArrfilter(dataProductsSales?.filter(el => el.qty > 0)); }}
                                                                className={classNames(
                                                                    'whitespace-nowrap py-4 px-5 text-sm font-medium bg-azul-pantone text-BlancoIvory rounded-tl-md rounded-tr-md md:rounded-l-md md:rounded-tr-none'
                                                                )}
                                                            >
                                                                Todos
                                                            </button>
                                                            <button
                                                                onClick={() => { setArrfilter(dataProductsSales?.filter(el => el.qty > 0)); setArrfilter(prev => prev.filter(el => el.isFavorite === true)) }}
                                                                className={classNames(
                                                                    'whitespace-nowrap py-4 px-5 text-sm font-medium bg-azul-pantone text-BlancoIvory md:rounded-r-md'
                                                                )}
                                                            >
                                                                Favoritos
                                                            </button>
                                                        </nav>
                                                        <div className='w-full flex justify-end'>
                                                            <Tooltip text="Activar precio 1" carrito={carrito}>
                                                                <button disabled={carrito.length > 0} className={`w-full rounded-bl-md py-4 px-5 text-sm font-medium bg-azul-pantone md:rounded-tl-md text-BlancoIvory ${priceActive === 1 && 'bg-opacity-60'}`} onClick={() => setPriceActive(1)}>
                                                                    P1
                                                                </button>
                                                            </Tooltip>
                                                            <Tooltip text="Activar precio 2" carrito={carrito}>
                                                                <button disabled={carrito.length > 0} className={`w-full py-4 px-5 text-sm font-medium bg-azul-pantone text-BlancoIvory rounded-r-md ${priceActive === 2 && 'bg-opacity-60'}`} onClick={() => setPriceActive(2)}>
                                                                    P2
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>}
                                                    {UserDataJson?.idType !== 2 && <div className='w-full mt-2 mb-6'>
                                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                                            Sucursales
                                                        </label>
                                                        <select
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            onChange={(e) => {
                                                                if (e.target.value === "") {
                                                                    setArrfilter([]);
                                                                } else {
                                                                    setPending(true);
                                                                    setSucursalActive(parseInt(e.target.value))
                                                                    GetProductsSales(e.target.value);
                                                                }

                                                            }}
                                                        >
                                                            <option value={""}>--</option>
                                                            {
                                                                dataSucursal?.map((el, id) => (<option value={el.id} key={id}>{el.name}</option>))
                                                            }
                                                        </select>
                                                    </div>}
                                                    {UserDataJson?.idType !== 2 && <div className='w-full mt-2 mb-6'>
                                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                                            Categorias
                                                        </label>
                                                        <select
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            onChange={(e) => {
                                                                if (e.target.value === "") {
                                                                    setArrfilter(dataProductsSales?.filter(el => el.qty > 0));
                                                                } else {
                                                                    setArrfilter(dataProductsSales?.filter(el => el.qty > 0));
                                                                    setArrfilter(prev => prev.filter(el => el.idCategory === parseInt(e.target.value)))
                                                                }

                                                            }}
                                                        >
                                                            <option value={""}>Todos</option>
                                                            <option value={"0"}>Sin Categoria</option>
                                                            {
                                                                dataCategory?.map((el, id) => (<option value={el.id} key={id}>{el.name}</option>))
                                                            }
                                                        </select>
                                                    </div>}

                                                    {UserDataJson?.idType !== 2 && <div className="ml-6 hidden items-center rounded-lg bg-gray-100 p-0.5 lg:flex">
                                                        <button
                                                            onClick={() => { setListActive(1) }}
                                                            type="button"
                                                            className={`rounded-md p-1.5  hover:shadow-sm  ${listActive === 1 ? 'bg-negro text-BlancoIvory' : 'bg-white text-gray-400 '}`}
                                                        >
                                                            <Bars4Icon className="h-5 w-5" />

                                                        </button>
                                                        <button
                                                            onClick={() => { setListActive(0) }}
                                                            type="button"
                                                            className={`ml-0.5 rounded-md p-1.5  shadow-sm  ${listActive === 0 ? 'bg-negro text-BlancoIvory' : 'bg-white text-gray-400 '}`}
                                                        >
                                                            <Squares2X2IconMini className="h-5 w-5" />

                                                        </button>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gallery */}
                                        {
                                            listActive ? (
                                                <TablaProductos UserDataJson currencyActive={currencyActive} agregarProducto={agregarProducto} arrFilter={arrFilter} priceActive={priceActive} />
                                            ) : (
                                                <ProductGallery agregarProducto={agregarProducto} setCarrito={setCarrito} carrito={carrito} arrFilter={arrFilter} priceActive={priceActive} currencyActive={currencyActive} />
                                            )
                                        }

                                    </div>

                                </main>


                            </>
                        }
                        {
                            stepAux === 1 &&
                            <div className='overflow-y-auto w-full mb-32 lg:mb-0 '>
                                <div className="mx-auto px-4 pt-8 sm:px-6 lg:px-8">
                                    <div className='w-full flex flex-col gap-6 mb-10 mt-10'>
                                        <button className=' w-10 flex justify-center items-center bg-azul-pantone py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50' onClick={() => { setStepAux(prev => prev - 1) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                            </svg>
                                        </button>
                                        <h1 className='font-semibold text-3xl ml-10 mt-10 text-slate-400'>Registrar Cliente</h1>
                                    </div>
                                    <FormCliente setAuxClient={setAuxFormClient} setClientInfo={setClientInfo} setAuxTotal={setAuxTotal} />
                                </div>
                            </div>
                        }
                        {
                            stepAux === 2 &&
                            <div className='overflow-y-auto w-full mb-10'>
                                <div className="mx-auto px-4 pt-8 sm:px-6 lg:px-8">
                                    <div className='w-full flex flex-col gap-6  mt-10'>
                                        <button className=' w-10 flex justify-center items-center bg-azul-pantone py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50' onClick={() => { setStepAux(prev => prev - 1) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                            </svg>
                                        </button>
                                        <h1 className='font-semibold text-3xl ml-10 mt-10 text-slate-400'>Realizar Pago</h1>
                                    </div>
                                    <FormPayment setAuxFormPayment={setAuxFormPayment} clientInfo={clientInfo} pagoTable={pagoTable} setPagoTable={setPagoTable} auxTotal={auxTotal} setAuxTotal={setAuxTotal} />
                                </div>
                            </div>
                        }
                        <ShoppingCart className="" setStep={setStepAux} carrito={carrito} setCarrito={setCarrito} step={stepAux} auxClient={auxFormClient} auxFormPayment={auxFormPayment} setOpen={setOpen} setAuxFormClient={setAuxFormClient} setAuxFormPayment={setAuxFormPayment}
                            clientInfo={clientInfo} pagoTable={pagoTable} setPagoTable={setPagoTable} priceActive={priceActive} sucursalActive={sucursalActive} currencyActive={currencyActive} setAuxUpdated={setAuxUpdated} closeModalSucces={closeModalSucces}
                        />
                        <ModalSucces open={openModalSucces} setOpen={closeModalSucces} boton1={"Ir al Inicio"} boton2={'Hacer otra Venta'} setStep={setStepAux} setArrfilter={setArrfilter} setDataProductsSales={setDataProductsSales}>
                            <div className='text-center flex flex-col justify-center items-center '>
                                <h1 className='text-xl font-bold my-5'>Venta Exitosa</h1>
                                <span className='text-Verde text-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </div>
                        </ModalSucces>
                    </div>
                </div>
            }
        </>

    )
}
