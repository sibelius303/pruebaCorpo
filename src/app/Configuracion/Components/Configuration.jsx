'use client'


import { Fragment, useEffect, useState } from 'react'

import FormSenthings from './usuarios/FormSettings'
import TablaUsuarios from './usuarios/TablaUsuarios'
import TablaSucursales from './sucursales/TablaSucursales'
import TablaClientes from './clientes/TablaClientes'
import ProductGallery from '../Components/ProductGallery'
import FormSucursal from './sucursales/FormSucursal'
import FormProducts from '../Components/FormProducts'
import FormCliente from './clientes/FormCliente'
import Loader from '../Components/Loader'
import TablaCategorias from './categorias/TablaCategorias'
import FormCategoria from './categorias/FormCategoria'
import FormEditProducts from '../Components/FormEditProducts'
import TablaProveedores from './proveedores/TablaProveedores'
import FormProveedores from './proveedores/FormProveedores'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFront from '@/hooks/useFront'
import LoaderScreen from '@/components/LoaderScreen'
import { Field, Form, Formik } from 'formik'
import Reports from './Reports'
import { date } from 'yup'
import LoaderButton from '@/components/LoaderButton'
import TablaAudit from './TablaAudit'
import { REPORT } from "@/tools/constants";

import Usuarios from "./usuarios/index"
import Sucursales from "./sucursales/index"
import Clients from "./clientes/Index"
import Proveedores from "./proveedores/Index"
import Categorias from "./categorias/Index"

const secondaryNavigation = [
    { name: 'Usuarios', href: 'Usuarios', current: true },
    { name: 'Sucursales', href: 'Sucursales', current: false },
    { name: 'Proveedores', href: 'Proveedores', current: false },
    { name: 'Categorias', href: 'Categorias', current: true },
    { name: 'Productos', href: 'Productos', current: false },
    { name: 'Clientes', href: 'Clientes', current: false },
    { name: 'Multimoneda', href: 'Multimoneda', current: false },
    { name: 'Auditoria', href: 'Auditoria', current: false }

    // { name: 'Reportes', href: 'Reportes', current: false },
]

const initalEditState = {
    editUsuario: false,
    editClient: false,
    editSucursales: false,
    editCategory: false,
    editVendor: false,
    editProduct: false,
}

export default function Configuration() {
    const { agregarProductos, setAgregarProductos, agregarUsuario, setAgregarUsuario, agregarSucursal, setAgregarSucursal,
        agregarClientes, setAgregarClientes, agregarCategorias, setAgregarCategorias, agregarProveedores, setAgregarProveedores,
        setScreenPending, screenPending, suggestedMoney, factorPost, lastFactor, setAux, pendingButton,
        setPendingButton, GetAuditUser, dataAudit, reportSubmit
    } = useFront()

    const [settings, setSettings] = useState("Usuarios");
    const [pending, setPending] = useState(false);
    const [editProducts, setEditProduct] = useState(false);
    const [editState, setEditState] = useState(initalEditState);
    const [currency, setCurrency] = useState({});
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setScreenPending(false)
    }, [])

    const handlerSupport = async (searchTarget = "") => {
        setError( false )
        const url = await reportSubmit(REPORT.AUDIT, {
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
        <>
            {
                screenPending ? <LoaderScreen /> : <>
                    <main className='overflow-x-hidden'>
                        <header className=" my-8 w-full flex justify-center">
                            {/* Secondary navigation */}
                            <nav className="flex overflow-x-auto py-2 bg-rojo-pantone text-BlancoIvory rounded-md ">
                                <ul
                                    role="list"
                                    className="flex flex-col min-w-full gap-6 px-4 text-xl font-semibold leading-6 text-center  sm:px-6 md:w-full md:text-sm lg:grid lg:grid-cols-4 xl:flex xl:flex-row lg:px-8"
                                >
                                    {secondaryNavigation.map((item) => (
                                        <li key={item.name} >
                                            <button onClick={() => { setSettings(item.href) }} className={item.name === settings ? 'bg-azul-pantone text-BlancoIvory w-full h-full px-3 py-1 rounded-md bg-opacity-50' : 'px-3 py-1 rounded-md hover:text-BlancoIvory hover:bg-azul-pantone hover:bg-opacity-50'}>
                                                {item.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </header>

                        {/* Settings forms */}
                        <div className="">
                            {settings === 'Reportes' && <Reports />}
                            {settings === 'Usuarios' && <Usuarios />}
                            {settings === 'Sucursales' && <Sucursales />}
                            {settings === 'Clientes' && <Clients />}
                            {
                                settings === 'Productos' &&
                                <>
                                    {
                                        agregarProductos ? editProducts ? (< div className="divide-y divide-slate-500 px-4">
                                            <div className='w-full flex flex-col gap-6 mb-4'>
                                                <button className=' w-10 flex justify-center items-center bg-rojo-pantone py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50' onClick={() => { setAgregarProductos(false); setEditProduct(false) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                    </svg>
                                                </button>
                                                <h1 className='font-semibold text-3xl ml-10 text-slate-400'>Editar Producto</h1>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-10 py-10 px-10">
                                                <div className='w-full lg:w-1/4'>
                                                    <h2 className="text-base font-semibold leading-7 text-slate-400">Informacion del Producto</h2>
                                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                                        Rellene la informacion del Producto
                                                    </p>
                                                </div>
                                                <FormProducts setAgregarProductos={setAgregarProductos} editProducts={editProducts} />
                                            </div>
                                        </div>) : (< div className="divide-y divide-slate-500 px-4">
                                            <div className='w-full flex flex-col gap-6 mb-4'>
                                                <button className=' w-10 flex justify-center items-center bg-rojo-pantone py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50' onClick={() => { setAgregarProductos(false) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                    </svg>
                                                </button>
                                                <h1 className='font-semibold text-3xl ml-10 text-slate-400'>Agregar Producto</h1>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-10 py-10 px-10">
                                                <div className='w-full text-center lg:w-1/4'>
                                                    <h2 className="text-base font-semibold leading-7 text-slate-400">Informacion del Producto</h2>
                                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                                        Rellene la informacion del Producto
                                                    </p>
                                                </div>
                                                <FormProducts setAgregarProductos={setAgregarProductos} />
                                            </div>
                                        </div>) : (<div className='px-10'>
                                            <div className='w-full flex flex-col gap-4 justify-between lg:px-8 md:flex-row'>
                                                <h1 className='font-semibold text-3xl'>Productos</h1>
                                                <button className='flex items-center  bg-rojo-pantone px-4 py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50' onClick={() => { setAgregarProductos(true) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                    Agregar Productos
                                                </button>
                                            </div>
                                            <ProductGallery setEditProduct={setEditProduct} setAgregarProductos={setAgregarProductos} />
                                        </div>)
                                    }

                                </>
                            }
                            {settings === 'Proveedores' && <Proveedores />}
                            {settings === 'Categorias' && <Categorias />}
                            {
                                settings === 'Multimoneda' &&
                                <>
                                    <div className='px-10 mb-10'>
                                        <div className='my-5 w-full flex justify-center'>
                                            <div className='my-5 w-3/4 flex-col justify-center'>
                                                <h4 className='font-bold text-center text-3xl '>Multimoneda</h4>
                                                <p>La moneda base que se utiliza es el BS (Bolivar), aca puedes fijar o modificar las tasas con la cual quieras mostrar tus precios en otra monedas</p>
                                            </div>
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            <div className='flex gap-5 w-3/4 justify-between'>
                                                <div>
                                                    <h3>Factor sugerido al dia <b>{suggestedMoney?.dateReg?.substring(0, 10).split("-").reverse().join("-")}</b></h3>
                                                    <p>Dolar: <b>{suggestedMoney?.usd} USD</b></p>
                                                    <div className='flex justify-between items-center'>
                                                        <p>Euros: <b>{suggestedMoney?.eur} EUR</b></p>
                                                        <button onClick={() => setCurrency(suggestedMoney)} className='flex items-center bg-rojo-pantone px-2 py-2 rounded-lg text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3>Ultimo Valor Guardado al dia <b>{lastFactor?.dateReg?.substring(0, 10).split("-").reverse().join("-")}</b></h3>
                                                    <p>Dolar: <b>{lastFactor?.usd} USD</b></p>
                                                    <div className='flex justify-between items-center'>
                                                        <p>Euros: <b>{lastFactor?.eur} EUR</b></p>
                                                        {/* <button onClick={() => setCurrency(lastFactor)} className='flex items-center bg-rojo-pantone px-2 py-2 rounded-lg text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                            </svg>
                                                        </button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className='font-semibold text-center text-3xl'>Fijar Tasas </h4>
                                        <div className='flex justify-center'>

                                            <Formik
                                                initialValues={{
                                                    eur: 0,
                                                    usd: 0
                                                }}
                                                onSubmit={(valores) => {
                                                    valores.usd = parseFloat(currency?.usd)
                                                    valores.eur = parseFloat(currency?.eur)
                                                    console.log(valores)
                                                    factorPost(valores, setAux)
                                                }}
                                            >{({ handleSubmit, handleChange }) => (
                                                <form className='grid grid-cols-1 w-1/3 gap-y-4' onSubmit={handleSubmit}>
                                                    <div className='flex flex-col'>
                                                        <label className="block text-sm font-medium leading-6 text-slate-400">Dolar</label>
                                                        <Field
                                                            type="number"
                                                            name="usd"
                                                            className='block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm'
                                                            onWheel={e => e.currentTarget.blur()}
                                                            value={currency.usd}
                                                            onChange={(e) => { setCurrency(prev => ({ ...prev, usd: e.target.value })); handleChange(e) }}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className="block text-sm font-medium leading-6 text-slate-400">Euros</label>
                                                        <Field
                                                            type="number"
                                                            name="eur"
                                                            className='block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm'
                                                            onWheel={e => e.currentTarget.blur()}
                                                            value={currency.eur}
                                                            onChange={(e) => { setCurrency(prev => ({ ...prev, eur: e.target.value })); handleChange(e) }}
                                                        />
                                                    </div>
                                                    <div className='flex items-end justify-between'>
                                                        <button type='submit' className='flex w-full items-center bg-rojo-pantone px-4 py-2 rounded-lg text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50'>Guardar</button>
                                                    </div>
                                                </form>)}</Formik>
                                        </div>
                                    </div>
                                </>
                            }
                            {
                                settings === 'Auditoria' && <>
                                    <div className='my-5 w-full flex justify-center'>
                                        <div className='my-5 w-3/4 flex-col justify-center'>
                                            <h4 className='font-bold text-center text-3xl '>Auditoria</h4>
                                            <p className="text-center">Seleccione e ingrese los campos para auditar un usuario</p>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-5 text-white">
                                                <span className="rounded-md relative w-full h-3 justify-end col-span-5">
                                                    <button onClick={()=>setOpen(true)} className="absolute right-0 bg-rojo-pantone top-0 p-1 rounded-md m-1 before:bg-white before:w-5 before:h-5 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            id: 0,
                                            dateStart: "",
                                            dateEnd: "",
                                            userName: "",
                                            type: 0,
                                            limit: "20"
                                        }}
                                        onSubmit={(valores,actions) => {
                                            setPendingButton(true)
                                            if(valores.dateStart === ""){
                                                valores.dateStart = null
                                            } else {
                                                valores.dateStart = valores.dateStart + "T00:00:00Z"
                                            }
                                            if(valores.dateEnd === ""){
                                                valores.dateEnd = null
                                            } else {
                                                valores.dateEnd = valores.dateEnd + "T00:00:00Z"
                                            }
                                            valores.type = parseInt(valores.type)
                                            valores.limit = parseInt(valores.limit)
                                            GetAuditUser(valores)
                                            valores.dateStart = ""
                                            valores.dateEnd = ""
                                            actions.resetForm()
                                        }}
                                    >{({ handleSubmit, handleChange }) => (
                                        <Form className='grid grid-cols-2 gap-4 w-1/2 mx-auto' onSubmit={handleSubmit}>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium leading-6 text-slate-400">Fecha de Inicio</label>
                                                <Field name="dateStart" type="date" className="block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6" />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium leading-6 text-slate-400">Fecha Final</label>
                                                <Field name="dateEnd" type="date" className="block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6" />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium leading-6 text-slate-400">Usuario</label>
                                                <Field name="userName" type="text" className="block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6" />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium leading-6 text-slate-400">Tipo de Auditora</label>
                                                <Field as="select" name="type" className="block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6">
                                                    <option value={"0"}>No Aplica</option>
                                                    <option value={"1"}>Modulo de Usuario</option>
                                                    <option value={"2"}>Modulo de Sucursales</option>
                                                    <option value={"3"}>Modulo de Poveedores</option>
                                                    <option value={"4"}>Modulo de Clientes</option>
                                                    <option value={"5"}>Modulo de Categorias</option>
                                                    <option value={"6"}>Modulo de Productos</option>
                                                    <option value={"7"}>Modulo de Reposición</option>
                                                    <option value={"8"}>Modulo de Pedido</option>
                                                    <option value={"9"}>Modulo de Pedido (Aprobado/Rechazado)</option>
                                                    <option value={"10"}>Modulo de Ventas</option>
                                                    <option value={"11"}>Modulo de Moneda</option>
                                                    <option value={"12"}>Modulo de Conciliación</option>
                                                </Field>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium leading-6 text-slate-400">Cantidad de items</label>
                                                <Field as="select" name="limit" className="block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6">
                                                    <option value={"20"}>20</option>
                                                    <option value={"50"}>50</option>
                                                    <option value={"100"}>100</option>
                                                </Field>
                                            </div>
                                            <div className='col-span-full'>
                                                <div className='w-full flex items-center justify-end'>
                                                    <button
                                                        type="submit"
                                                        disabled={pendingButton}
                                                        className=" bg-rojo-pantone rounded-md px-4 py-2.5 mt-4 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        {
                                                            pendingButton ? <LoaderButton /> : 'Consultar'
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}</Formik>
                                    { dataAudit && <div className="mt-10 p-5 ">
                                        <TablaAudit dataAudit={dataAudit}/>

                                    </div>}
                                    { open && <div className="absolute flex flex-col items-center justify-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-50">
                                        <div className="bg-white w-1/2 h-80 border border-slate-300 flex flex-col gap-4 items-center justify-center rounded-lg shadow-md shadow-slate-600">
                                            <h2 className="text-xl font-semibold">Generar Reporte Auditorias</h2>
                                            <p className="w-6/12 text-slate-600 text-xs">
                                                Use el input para generar un reporte de una Auditoria especifico o en su defecto hago click en el boton {'"Reporte Completo"'} para uno mas completo
                                            </p>
                                            { error && <p className="w-6/12 text-red-500 text-xs">
                                                Algo va mal, vuelve a intentar
                                            </p>}
                                            <div className="w-6/12 rounded-lg overflow-hidden border border-slate-500 p-0 m-0 flex flex-row justify-between">
                                                <input type="text" value={search} onChange={event => setSearch(event.target.value)} className="w-8/12 border-none" />
                                                <button type="button" onClick={()=>handlerSupport(search)} className="bg-rojo-pantone w-4/12 text-white h-full">Generar</button>
                                            </div>
                                            <div className="w-6/12 flex flex-row justify-center gap-2 items-center">
                                                <button onClick={()=>{setOpen(false); setError(false)}} className="w-1/2 bg-rojo-pantone text-white py-2 px-6 rounded-lg">Cancelar</button>
                                                <button onClick={()=>handlerSupport()} className="w-1/2 bg-rojo-pantone text-white py-2 px-6 rounded-lg">Reporte Completo</button>
                                            </div>
                                        </div>
                                    </div>}

                                </>

                            }

                        </div>
                    </main>
                    <ToastContainer />
                </>
            }

        </>

    )
}
