import { useState } from "react"
import Loader from "./Loader";
import Modal from "@/components/Layout/Modal";

import useFront from "@/hooks/useFront";
import Image from "next/image";
import noImage from "../../../../public/imagenNoDisponible.png"



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductGallery({ agregarProducto, arrFilter, priceActive, currencyActive }) {
    const { pending, UserDataJson } = useFront()
    const [open, setOpen] = useState(false)
    const [dataDetails, setDataDetails] = useState(false);
    const [urlImage, setUrlImage] = useState("")

    console.log(arrFilter)

    const converCurrecy = {
        eur1: 1.5,
        eur2: 2.5,
        eur3: 4.9,
        eur4: 5.6,
        mxn1: 17,
        mxn2: 18,
        mxn3: 19,
        mxn4: 20
    }

    return (
        <section className="mt-8 pb-16 h-auto max-h-screen overflow-y-auto px-4 py-4 scrollbar scrollbar-thumb-gray-300" aria-labelledby="gallery-heading">
            {
                pending
                    ?
                    (<Loader />)
                    : arrFilter.length > 0 ?
                        <ul
                            role="list"
                            className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 only:xl:gap-x-16"
                        >{arrFilter.map((file, id) => (
                            <li key={id} className="flex flex-col justify-between border border-slate-400 rounded-xl p-4">
                                <div
                                    onClick={() => { agregarProducto(file) }}
                                    className={classNames(
                                        file.current
                                            ? 'ring-2 ring-indigo-500 ring-offset-2'
                                            : 'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                                        'aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100'
                                    )}
                                >
                                    <Image
                                        src={file?.image === null ? noImage : file?.image[0]?.url}
                                        width={200}
                                        height={200}
                                        alt=""
                                        className={classNames(
                                            file.current ? '' : 'group-hover:opacity-75',
                                            'pointer-events-none px-4 w-full h-40'
                                        )}
                                        priority
                                    />
                                </div>
                                <p className="pointer-events-none mt-2 block truncate text-lg font-medium text-gray-900">
                                    {file.name}
                                </p>
                                {UserDataJson?.idType !== 2 && <p className="pointer-events-none block text-sm font-medium text-gray-500"><b className="text-black">Precio: </b>
                                    {priceActive === 1 && currencyActive === 'BS' && file.price1.toFixed(2)}
                                    {priceActive === 2 && currencyActive === 'BS' && file.price2.toFixed(2)}
                                    {priceActive === 1 && currencyActive === 'USD' && file.convertCurrency.usd1.toFixed(2)}
                                    {priceActive === 2 && currencyActive === 'USD' && file.convertCurrency.usd2.toFixed(2)}
                                    {priceActive === 1 && currencyActive === 'EUR' && file.convertCurrency.eur1.toFixed(2)}
                                    {priceActive === 2 && currencyActive === 'EUR' && file.convertCurrency.eur2.toFixed(2)}
                                    {currencyActive} </p>}
                                {UserDataJson?.idType === 2 ? <p className="pointer-events-none block text-sm font-medium text-gray-500"><b className="text-black">Disponible:</b> {file.qtyReg}</p> : <p className="pointer-events-none block text-sm font-medium text-gray-500"><b className="text-black">Disponible:</b> {file.qty}</p>}
                                <div className="w-full flex justify-end mt-4">
                                    {UserDataJson?.idType !== 2 ? <button
                                        onClick={(e) => {
                                            setOpen(true);
                                            setDataDetails(file)
                                            setUrlImage(file?.image === null ? noImage : file?.image[0]?.url)
                                        }}
                                        className=" bg-rojo-pantone rounded-xl px-4 py-2.5 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Ver Detalles
                                    </button> : <button
                                        onClick={(e) => {
                                            agregarProducto(file)
                                        }}
                                        className=" bg-rojo-pantone rounded-xl px-4 py-2.5 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Agregar
                                    </button>}
                                </div>

                            </li>
                        ))}</ul> : <h1 className="text-center w-full">No hay elementos para mostrar</h1>
            }
            <Modal open={open} setOpen={setOpen} dataDetails={dataDetails} boton1={"Agregar a Carrito"} boton2={'Cancelar'} agregarProducto={agregarProducto}>
                <h1 className="text-xl text-black font-bold text-center mb-4">
                    {dataDetails?.name}
                </h1>
                <div className="flex gap-2">

                    <div className="w-1/2 p-2">
                        <>
                            <div className="h-3/4">
                                {<Image src={urlImage} loading='lazy' width={325} height={325} quality={50} className="h-72 w-72 max-h-72 rounded-md" alt="image product" />}
                            </div>
                            <div className="h-1/4 flex gap-3 mt-2"> {dataDetails?.image && dataDetails?.image.length > 1 && <div className="h-1/4 flex gap-3 mt-2">{
                                dataDetails?.image?.map((el) => (<button key={el.url} onClick={() => setUrlImage(el.url)}><Image src={el.url === null ? noImage : el.url} width={325}
                                    height={325} className="w-16 h-16" alt="" priority /></button>))
                            }
                            </div>}
                            </div>
                        </>



                    </div>
                    <div className="w-1/2">

                        <div className="flex flex-col gap-4 mt-2">
                            <p><b>SKU:</b> {dataDetails?.code} </p>
                            <p><b>Descripcion:</b> {dataDetails?.descrip} </p>
                            {/* <p><b>Costo:</b> {dataDetails?.cost} </p> */}
                            <p><b>Precio 1:</b> {dataDetails?.price1} </p>
                            <p><b>Precio 2:</b> {dataDetails?.price2} </p>
                            {/* <p><b>Precio Distribuidor:</b> {dataDetails?.price3} </p>
                            <p><b>Precio Distribuidor sin Estuche:</b> {dataDetails?.price4} </p> */}
                            <p><b>Cantidad disponible:</b> {dataDetails?.qty} </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>


    )
}
