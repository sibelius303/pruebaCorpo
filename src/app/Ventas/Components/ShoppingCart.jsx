'use client'
import useFront from '@/hooks/useFront'
import { Popover, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react'
import noImage from "../../../../public/imagenNoDisponible.png"

import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import ModalSerials from './ModalSerials'

export default function ShoppingCart({ setStep, carrito, setCarrito, step, auxClient, setOpen, setAuxFormPayment, setAuxFormClient, clientInfo, pagoTable, setPagoTable, priceActive, sucursalActive, currencyActive, setAuxUpdated, closeModalSucces }) {
    const { totales,
        setTotales,
        totalesFront,
        totales2, 
        setTotales2,
        saleSubmit,
        UserDataJson,
        conciliationClientSubmit,
        setDataProductsClient
    } = useFront()

    const codeProductForSerial = ['315']

    const [qtySerials, setQtySerials] = useState(0)
    const [modalSerialOpen, setModalSerialOpen] = useState(false)
    const [isComponentOpen, setIsComponentOpen] = useState(false);

    useEffect(() => {
        let obj = { monto: 0, unidades: 0 }
        if (currencyActive === 'BS') {
            carrito.forEach((el) => {
                obj.unidades += el.cantidad
                obj.monto += (el.cantidad * (priceActive === 1 ? el.price1 : el.price2 ))
            })
        } else if (currencyActive === 'USD') {
            carrito.forEach((el) => {
                obj.unidades += el.cantidad
                obj.monto += (el.cantidad * (priceActive === 1 ? el.convertCurrency.usd1 : el.convertCurrency.usd2))
            })

        } else {
            carrito.forEach((el) => {
                obj.unidades += el.cantidad
                obj.monto += (el.cantidad * (priceActive === 1 ? el.convertCurrency.eur1 :  el.convertCurrency.eur2 ))
            })
        }
        obj.monto = parseFloat(obj.monto.toFixed(2))
        setTotales(obj);
        let obj2 = { monto: 0, unidades: 0 }
        carrito.forEach((el) => {
            obj2.unidades += el.cantidad
            obj2.monto += (el.cantidad * (priceActive === 1 ? el.price1 : el.price2))
        })
        obj2.monto = parseFloat(obj2.monto.toFixed(2))
        setTotales2(obj2);
    }, [carrito, currencyActive])

    const handleBorrar = (id) => {
        setCarrito(prev => prev.filter(el => el.idProd !== id))
    }
    const sumarProducto = (product) => {
        let typeQty = UserDataJson?.idType === 2 ? product.qtyReg : product.qty;
        let copia = [...carrito];
        copia.forEach((el) => {
            if (el.idProd === product.idProd) {
                if (el.cantidad < typeQty) {
                    el.cantidad += 1
                    setCarrito([...copia])
                }
            }
        })
    }
    const inputProducto = (product,input) => {
        let typeQty = UserDataJson?.idType === 2 ? product.qtyReg : product.qty;
        let copia = [...carrito];
        copia.forEach((el) => {
            if (el.idProd === product.idProd) {
                if (el.cantidad < typeQty) {
                    if(input <= typeQty)
                    el.cantidad = input
                    setCarrito([...copia])
                }
            }
        })
    }



    const restarProducto = (product) => {
        let copia = [...carrito];
        copia.forEach((el) => {
            if (el.idProd === product.idProd) {
                if (el.cantidad <= 1) {
                    setCarrito(copia.filter((el) => el.idProd !== product.idProd))
                } else {
                    el.cantidad -= 1
                    setCarrito([...copia])
                }
            }
        })
    }

    const handlerCheckCart = () => {
        const numSerials = carrito.reduce((acc, product) => {
            if( product.isTransformer ) {
                return acc + product.cantidad
            }
            return acc
        },0)
        if( numSerials > 0 ) {
            setQtySerials( numSerials )
            setModalSerialOpen( true )
            return;
        }
        setStep(prev => prev + 1)
    }

    const handlerConfirmSerial = (serials) => {
        setModalSerialOpen( false )
        setCarrito( prev => carrito.map( product => {
            if( product.isTransformer ) {
                const productSerials = serials.slice(0,product.cantidad)
                serials = serials.slice( product.cantidad )
                return {
                    ...product,
                    serials: productSerials
                }
            }
            return product
        } ) )
        setStep(prev => prev + 1)
    }

    const getSerials = () => {
        return carrito.reduce( (acc, product) => {
            if( product.isTransformer && product.reference && product.reference.length>0 ) {
                return [...acc, ...product.reference]
            }
            return acc
        }, [] )
    }

    const getSerialsSelected = () => {
        return carrito.reduce( (acc, product) => {
            if( product.isTransformer && product.serials && product.serials.length>0 ) {
                return [...acc, ...product.serials]
            }
            return acc
        }, [] )
    }

    return (
        <>
            { modalSerialOpen && <ModalSerials
                maxItems={qtySerials}
                items={getSerials()}
                serialSelected={getSerialsSelected()}
                onAction={handlerConfirmSerial}
            />}
            <section
                className="hidden bg-gray-50 px-4 pb-4 pt-6 w-96    sm:px-6 md:mt-16 lg:block  lg:px-0 lg:pb-16 "
            >
                <div className="mx-auto  rounded-md border  md:flex md:flex-col md:justify-between h-auto lg:bg-BlancoIvory">
                    <div className='divide-y divide-gray-200'>
                        <h2 id="summary-heading" className="text-lg text-center py-6 px-4 rounded-t-sm  font-bold bg-rojo-pantone text-BlancoIvory">
                            Carrito
                        </h2>

                        <ul className="divide-y divide-gray-200  py-6 text-sm font-medium text-gray-900 max-h-96 overflow-y-auto scrollbar scrollbar-thumb-gray-300">
                            {carrito.map((product, id) => (
                                <li key={id} className="flex justify-center gap-3 py-2 px-2">
                                    <Image
                                        src={product?.image === null ? noImage : product?.image[0]?.url}
                                        width={100}
                                        height={100}
                                        priority
                                        className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                        alt="imagen no disponible"
                                    />
                                    <div>
                                        <div className="flex-auto space-y-1 text-sm">
                                            <h3>{product?.name}</h3>
                                        </div>
                                        {UserDataJson.idType !== 2 && <p className="flex-none text-sm font-medium">Precio: 
                                            {priceActive === 1 && currencyActive === 'BS' && product?.price1.toFixed(2)}
                                            {priceActive === 2 && currencyActive === 'BS' && product?.price2.toFixed(2)}
                                            {priceActive === 1 && currencyActive === 'USD' && product?.convertCurrency.usd1.toFixed(2)}
                                            {priceActive === 2 && currencyActive === 'USD' && product?.convertCurrency.usd2.toFixed(2)}
                                            {priceActive === 1 && currencyActive === 'EUR' && product?.convertCurrency.eur1.toFixed(2)}
                                            {priceActive === 2 && currencyActive === 'EUR' && product?.convertCurrency.eur2.toFixed(2)}
                                              {currencyActive}</p>}
                                        <div className="w-16 md:w-24 flex gap-2 ">
                                            <button className=" px-2 py-1 md:px-3 md:py-1 rounded-md bg-azul-pantone text-white" onClick={() => { restarProducto(product) }}>-</button>
                                            {/* <p className=" font-semibold text-sm">{product?.cantidad}</p> */}
                                            <input className='w-6' value={product?.cantidad} onChange={(e)=>{inputProducto(product,parseInt(e.target.value))}}/>
                                            <button className="px-2 py-1 md:px-3 md:py-1 rounded-md bg-azul-pantone text-white" onClick={() => { sumarProducto(product) }}>+</button>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleBorrar(product.idProd)}
                                            className='bg-azul-pantone text-white px-2 py-1 rounded-md hover:bg-red-600'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='px-8 pb-6'>
                        <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                            <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Cantidad de Productos</dt>
                                <dd>{totales?.unidades}</dd>
                            </div>

                            {UserDataJson?.idType !== 2 && <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Subtotal</dt>
                                <dd>{parseFloat(totales?.monto).toFixed(2)} {currencyActive}</dd>
                            </div>}
                            {UserDataJson?.idType !== 2 && <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">{parseFloat(totales?.monto).toFixed(2)} {currencyActive}</dd>
                            </div>}
                        </dl>
                        {
                            UserDataJson?.idType !== 2 && step === 0 && <button
                                disabled={carrito.length === 0}
                                onClick={handlerCheckCart}
                                className={`w-full px-8 py-4 flex items-center justify-center bg-rojo-pantone rounded-lg text-BlancoIvory shadow-2xl mt-16 ${carrito.length === 0 && 'opacity-20'}`}>
                                Siguiente
                            </button>
                        }
                        {
                            UserDataJson?.idType !== 2 && step === 1 && <button
                                disabled={auxClient}
                                onClick={() => { setStep(prev => prev + 1) }}
                                className={`w-full px-8 py-4 flex items-center justify-center bg-rojo-pantone rounded-lg text-BlancoIvory shadow-2xl mt-16 ${auxClient && 'opacity-20'}`}>
                                Siguiente
                            </button>
                        }
                        {
                            UserDataJson?.idType !== 2 && step === 2 && <button
                                disabled={totales.monto > 0}
                                onClick={() => { saleSubmit(clientInfo, carrito, totales2, pagoTable, priceActive, sucursalActive, currencyActive, closeModalSucces); setOpen(true); setAuxFormPayment(true); setAuxFormClient(true); setCarrito([]); setPagoTable([]) }}
                                className={`w-full px-8 py-4 flex items-center justify-center bg-rojo-pantone rounded-lg text-BlancoIvory shadow-2xl mt-16 ${totales.monto > 0 && 'opacity-20'}`}>
                                Pagar
                            </button>
                        }
                        {
                            UserDataJson?.idType === 2 && <button
                                onClick={() => { conciliationClientSubmit(carrito, totales,setAuxUpdated);setCarrito([]); setPagoTable([]); setDataProductsClient([]); }}
                                className={`w-full px-8 py-4 flex items-center justify-center bg-rojo-pantone rounded-lg text-BlancoIvory shadow-2xl mt-16 ${totales.monto > 0 && 'opacity-20'}`}>
                                Reportar
                            </button>
                        }
                    </div>
                </div>

            </section>
            <div className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-Cobre lg:hidden">
                <div className="relative z-10 border-t border-gray-200 bg-negro px-4 sm:px-6">
                    <div className="mx-auto max-w-lg">
                        <button onClick={() => setIsComponentOpen(!isComponentOpen)} className="flex w-full items-center py-6 font-medium">
                            <span className="mr-auto text-base">Total</span>
                            <span className="mr-2 text-base">${totales?.monto}</span>
                            <ChevronUpIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <Transition.Root show={isComponentOpen} as={Fragment}>
                    <div>
                        <Transition.Child
                            as="div"
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            {isComponentOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            )}
                        </Transition.Child>

                        <Transition.Child
                            as="div"
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-y-full"
                            enterTo="translate-y-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-y-0"
                            leaveTo="translate-y-full"
                        >
                            {isComponentOpen && (
                                <div className="relative bg-GrisFondo px-4 py-6 sm:px-6">
                                    <dl className="mx-auto max-h-96 flex flex-col gap-y-8 text-negro overflow-y-auto">
                                        {carrito.length > 0 ? carrito.map((product, id) => (
                                            <li key={id} className=" w-full flex justify-between border-b-2 pb-4">
                                                <Image
                                                    src={product?.image === null ? noImage : product?.image[0]?.url}
                                                    width={20}
                                                    height={20}
                                                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                                    alt="imagen no disponible"
                                                />
                                                <div className='w-full flex flex-col items-center'>
                                                    <div className="flex-auto space-y-1 text-lg">
                                                        <h3>{product.name}</h3>
                                                    </div>
                                                    <p className="flex-none text-base font-medium">Precio: {priceActive === 1 && currencyActive === 'USD' && product?.price1}
                                                        {priceActive === 2 && currencyActive === 'USD' && product?.price2}
                                                        {priceActive === 3 && currencyActive === 'USD' && product?.price3}
                                                        {priceActive === 4 && currencyActive === 'USD' && product?.price4}
                                                        {priceActive === 1 && currencyActive === 'MXN' && product?.convertCurrency.mxn1}
                                                        {priceActive === 2 && currencyActive === 'MXN' && product?.convertCurrency.mxn2}
                                                        {priceActive === 3 && currencyActive === 'MXN' && product?.convertCurrency.mxn3}
                                                        {priceActive === 4 && currencyActive === 'MXN' && product?.convertCurrency.mxn4}
                                                        {priceActive === 1 && currencyActive === 'EUR' && product?.convertCurrency.eur1}
                                                        {priceActive === 2 && currencyActive === 'EUR' && product?.convertCurrency.eur2}
                                                        {priceActive === 3 && currencyActive === 'EUR' && product?.convertCurrency.eur3}
                                                        {priceActive === 4 && currencyActive === 'EUR' && product?.convertCurrency.eur4}
                                                        {currencyActive}</p>
                                                    <div className="w-2/3 flex gap-1 justify-between ">
                                                        <button className=" px-2 py-1 md:px-3 md:py-1 rounded-md bg-negro text-Cobre" onClick={() => { restarProducto(product) }}>-</button>
                                                        <p className="md:mx-4 font-semibold text-lg">{product.cantidad}</p>
                                                        <button className="px-2 py-1 md:px-3 md:py-1 rounded-md bg-negro text-Cobre" onClick={() => { sumarProducto(product) }}>+</button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => handleBorrar(product.idProd)}
                                                        className='bg-negro text-Cobre px-2 py-1 rounded-md hover:opacity-50'
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </li>
                                        )) : <h1 className='text-center w-full'>No hay productos en el carrito</h1>}
                                        {
                                            step === 0 && <button
                                                disabled={carrito.length === 0}
                                                onClick={() => { setStep(prev => prev + 1); setIsComponentOpen(!isComponentOpen) }}
                                                className={`w-full px-8 py-4 flex items-center justify-center bg-Cobre rounded-lg text-BlancoIvory shadow-2xl mt-16 ${carrito.length === 0 && 'opacity-20'}`}>
                                                Siguiente
                                            </button>
                                        }
                                        {
                                            step === 1 && <button
                                                disabled={auxClient}
                                                onClick={() => { setStep(prev => prev + 1); setIsComponentOpen(!isComponentOpen) }}
                                                className={`w-full px-8 py-4 flex items-center justify-center bg-Cobre rounded-lg text-BlancoIvory shadow-2xl mt-16 ${auxClient && 'opacity-20'}`}>
                                                Siguiente
                                            </button>
                                        }
                                        {
                                            step === 2 && <button
                                                disabled={totales.monto > 0}
                                                onClick={() => { saleSubmit(clientInfo, carrito, totales, pagoTable, priceActive, sucursalActive); setOpen(true); setAuxFormPayment(true); setAuxFormClient(true); setCarrito([]); setPagoTable([]); setIsComponentOpen(!isComponentOpen) }}
                                                className={`w-full px-8 py-4 flex items-center justify-center bg-Cobre rounded-lg text-BlancoIvory shadow-2xl mt-16 ${totales.monto > 0 && 'opacity-20'}`}>
                                                Pagar
                                            </button>
                                        }
                                    </dl>
                                </div>
                            )}
                        </Transition.Child>
                    </div>
                </Transition.Root>
            </div>
        </>

    )
}
