import { Fragment, useEffect, useState } from "react"
import Loader from "./Loader";
import Modal from "./Modal";
import useFront from "@/hooks/useFront";
import Image from "next/image";
import Toggle from "./Toggle";
import noImage from "../../../../public/imagenNoDisponible.png"
import { REPORT } from "@/tools/constants";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductGallery({ setEditProduct, setAgregarProductos }) {
    const { ProductFavoriteSubmit, dataProducts, pending, ProductActiveSubmit, GetSearchListProduct, productSearchRepo, reportSubmit } = useFront()
    const [open, setOpen] = useState(false)
    const [dataDetails, setDataDetails] = useState([]);
    const [urlImage, setUrlImage] = useState("");
    const [pagActual, setPagActual] = useState(1);
    const [cantPag, setCantPag] = useState(6);
    const [pending2, setPending2] = useState(true);
    const [value, setValue] = useState("")
    const [search, setSearch] = useState("")
    const [open2, setOpen2] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setPagActual(1);
        setCantPag(8);
    }, [])

    useEffect(()=>{
        setSearch("")
    },[open2])

    let arraySlice = productSearchRepo && productSearchRepo?.slice(((pagActual * cantPag) - cantPag), cantPag * pagActual);
    const verificarElementos = Math.ceil(productSearchRepo.length / cantPag);

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

    const handlerSupport = async (searchTarget = "") => {
        const url = await reportSubmit(REPORT.PRODUCT, {
            id: 0,
            code: "",
            search: searchTarget,
            limit: 0
        })
        if( url ) {
            window.open( url )
        } else {
            setError( true )
        }
    }

    return (
        <section className="mt-8 pb-16 h-screen max-h-screen overflow-y-auto px-4 py-4 scrollbar scrollbar-thumb-gray-300" aria-labelledby="gallery-heading">
            {
                pending
                    ?
                    (<Loader />)
                    :
                    <>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-5  text-white">
                            <span className="rounded-md relative w-full h-3 justify-end col-span-5">
                                <button onClick={()=>setOpen2(true)} className="absolute right-0 bg-rojo-pantone top-0 p-1 rounded-md m-1 before:bg-white before:w-5 before:h-5 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </button>
                            </span>
                        </div>
                        <div className="w-full flex justify-center mb-4">
                            <div className="flex flex-col w-1/2">
                                <label>
                                    Buscar Producto
                                </label>
                                <div className="w-full flex">
                                    <input
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className={` w-full rounded-l-md border px-2 bg-slate-200 py-1.5 text-black shadow-sm ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm  `}
                                    />
                                    <button onClick={() => GetSearchListProduct(value)} className="inline-flex w-1/4 justify-center rounded-r-md bg-rojo-pantone px-3 py-2 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-span-full">
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul
                            role="list"
                            className="p-16 grid grid-cols-1 gap-x-4 gap-y-8   md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 only:xl:gap-x-16"
                        >{arraySlice.length > 0 ? arraySlice.map((file) => (
                            <li key={file.id} className="flex flex-col justify-between border border-slate-400 rounded-xl p-4">
                                <div
                                    onClick={() => {
                                        setOpen(true);
                                        setDataDetails(file)
                                        setUrlImage(file?.image === null ? noImage : file?.image[0]?.url)
                                    }}
                                    className={classNames(
                                        'aspect-w-8 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 pointer-events-none'
                                    )}
                                >
                                    <Image
                                        src={file?.image === null ? noImage : file?.image[0]?.url}
                                        width={200}
                                        height={200}
                                        alt=""
                                        className={classNames(
                                            file.current ? '' : 'group-hover:opacity-75',
                                            'pointer-events-none w-full px-4 h-48'
                                        )}
                                        priority
                                    />
                                </div>
                                <p className="pointer-events-none mt-2 block truncate text-lg font-medium text-gray-900">
                                    {file.name}
                                </p>
                                <p className="pointer-events-none block text-sm font-medium text-gray-500"><b className="text-black">Descripcion:</b> {file.descrip}</p>
                                <div className="w-full flex justify-between mt-4">

                                    <button
                                        onClick={(e) => {
                                            setOpen(true);
                                            setDataDetails(file)
                                            setUrlImage(file?.image === null ? noImage : file?.image[0]?.url)
                                        }}
                                        className=" bg-rojo-pantone rounded-xl px-4 py-2.5 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-rojo-pantone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-opacity-80">
                                        Ver Detalles
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            ProductFavoriteSubmit(file)
                                        }}
                                        className={` bg-rojo-pantone rounded-xl px-4 py-2.5 text-sm font-semibold  shadow-sm   hover:bg-opacity-80 `}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6  ${file?.isFavorite ? 'text-Rojo' : 'text-BlancoIvory'} `}>
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                    </button>
                                </div>

                            </li>
                        )) : <h1 className="text-center w-full col-span-full">No hay elementos para mostrar</h1>}</ul>
                        <div className="px-5 py-5  flex flex-col xs:flex-row items-center xs:justify-between">
                            {/* <span className="text-xs xs:text-sm text-gray-900">
                                {productSearchRepo.length === 0 ? (`Mostrando ${productSearchRepo.length} de ${productSearchRepo.length} `) : (`Mostrando ${cantPag < productSearchRepo.length ? cantPag : productSearchRepo.length} de ${productSearchRepo.length}`)}

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
                                    <span className="text-sm text-BlancoIvory transition duration-150 hover:bg-blue-700 bg-rojo-pantone font-semibold py-2 px-2 rounded">
                                        ...
                                    </span>
                                    <button
                                        className={`text-sm text-BlancoIvory transition duration-150 hover:bg-blue-700 bg-rojo-pantone font-semibold py-2 px-2 rounded ${totalPages.includes(pagActual) && "bg-opacity-50"
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
                                <button className={` ${validarNextBoton(pagActual, verificarElementos) ? ("opacity-25 text-sm text-BlancoIvory bg-rojo-pantone font-semibold py-2 px-2 rounded-l") : ('text-sm text-BlancoIvory transition duration-150 hover:bg-blue-700 bg-rojo-pantone font-semibold py-2 px-2 rounded-r')}`} onClick={() => { nextPag() }} disabled={validarNextBoton(pagActual, verificarElementos)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </>
            }
            <Modal open={open} setOpen={setOpen} dataDetails={dataDetails} boton1={"Editar"} boton2={'Cancelar'} setEditProduct={setEditProduct} setAgregarProductos={setAgregarProductos}>
                <div>
                    <h1 className="text-xl text-black font-bold text-center">
                        {dataDetails?.name}
                    </h1>
                </div>
                <div className="flex gap-4 justify-between">
                    <div className="w-auto p-2">
                        <div className="">
                            {<Image src={urlImage} loading='lazy' width={325} height={325} quality={50} className="h-72 w-72 max-h-72 rounded-md" alt="image product" />}
                        </div>
                        {dataDetails?.image && dataDetails?.image.length > 1 && <div className="h-1/4 flex gap-3 mt-2">{
                            dataDetails?.image?.map((el) => (<button key={el.url} onClick={() => setUrlImage(el.url)}><Image src={el.url === null ? noImage : el.url} width={325}
                                height={325} className="w-16 h-16" alt="" priority /></button>))
                        }
                        </div>}
                    </div>
                    <div className="w-auto">
                        <div className="flex flex-col gap-4 max-w-sm mt-2">
                            <p><b>SKU:</b> {dataDetails?.code} </p>
                            <p className="whitespace-break-spaces"><b>Descripcion:</b> {dataDetails?.descrip} </p>
                             <p><b>Costo:</b> {dataDetails?.cost} </p> 
                            <div className="flex gap-4"><b>Activo:</b> <Toggle defaultActive={dataDetails?.active} onChange={()=>ProductActiveSubmit(dataDetails)} /></div>
                            <p><b>Precio 1:</b> {dataDetails?.price1} </p>
                            <p><b>Precio 2:</b> {dataDetails?.price2} </p>
                            {/* <p><b>Precio Distribuidor:</b> {dataDetails?.price3} </p>
                            <p><b>Precio Distribuidor sin Estuche:</b> {dataDetails?.price4} </p> */}
                        </div>
                    </div>
                </div>
            </Modal>
            { open2 && <div className="absolute flex flex-col items-center justify-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-50">
                <div className="bg-white w-1/2 h-80 border border-slate-300 flex flex-col gap-4 items-center justify-center rounded-lg shadow-md shadow-slate-600">
                    <h2 className="text-xl font-semibold">Generar Reporte Productos</h2>
                    <p className="w-6/12 text-slate-600 text-xs">
                        Use el input para generar un reporte de un Producto especifico o en su defecto hago click en el boton {'"Reporte Completo"'} para uno mas completo
                    </p>
                    { error && <p className="w-6/12 text-red-500 text-xs">
                        Algo va mal, vuelve a intentar
                    </p>}
                    <div className="w-6/12 rounded-lg overflow-hidden border border-slate-500 p-0 m-0 flex flex-row justify-between">
                        <input type="text" value={search} onChange={event => setSearch(event.target.value)} className="w-8/12 border-none" />
                        <button type="button" onClick={()=>handlerSupport(search)} className="bg-rojo-pantone w-4/12 text-white h-full">Generar</button>
                    </div>
                    <div className="w-6/12 flex flex-row justify-center gap-2 items-center">
                        <button onClick={()=>{setOpen2(false); setError(false)}} className="w-1/2 bg-rojo-pantone text-white py-2 px-6 rounded-lg">Cancelar</button>
                        <button onClick={()=>handlerSupport()} className="w-1/2 bg-rojo-pantone text-white py-2 px-6 rounded-lg">Reporte Completo</button>
                    </div>
                </div>
            </div>}
        </section>


    )
}
