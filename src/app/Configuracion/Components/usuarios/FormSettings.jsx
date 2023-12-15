'use client'
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import ImagePrewie from "../ImagePrewie";
import * as Yup from 'yup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";
import Image from "next/image";




export default function FormSettings({ setAgregarUsuario, editarUsuario, setEditarUsuario }) {
    const { UserSubmit, dataSucursal, dataClient } = useFront()
    const [image, setImage] = useState(false);
    const [sucursalInput, setSucursalInput] = useState(false);
    const [clientInput, setClientInput] = useState(false);
    const [sucursalData, setSucursalData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [imageBase64, setImageBase64] = useState("");
    const [sucursalSelect, setSucursalSelect] = useState([]);
    const [administrador, setAdministrador] = useState(false);
    const [auxSucursal, setAuxSucursal] = useState(false)

    const validationSchema = Yup.object().shape({
        UserName: Yup.string().required('El campo es obligatorio'),
        PassW: Yup.string().required('El campo  es obligatorio'),
        Name: Yup.string().required('El campo es obligatorio'),
        Email: Yup.string().email('Ingresa una dirección de correo electrónico válida').required('El campo es obligatorio'),
        Pin: Yup.number().required('El campo es obligatorio')
    });

    function buscarSucursalesPorIDs(ids) {
        const sucursalesEncontradas = [];
        if (ids?.length > 0) {
            for (const id of ids) {
                const sucursalEncontrada = dataSucursal.find(sucursal => sucursal.id === id);
                if (sucursalEncontrada) {
                    sucursalesEncontradas.push(sucursalEncontrada);
                }
            }

        }
        setSucursalInput(true)
        return sucursalesEncontradas;
    }

    function filtrarSucursalesPorIDs(ids) {
        const sucursalesFiltradas = [];
        if (ids?.length > 0) {
            for (const id of ids) {
                const sucursalFiltrada = dataSucursal.filter(sucursal => !ids.includes(sucursal.id));
                if (sucursalFiltrada) {
                    sucursalesFiltradas.push(sucursalFiltrada);
                }
            }

        }
        console.log(sucursalesFiltradas[0])
        return sucursalesFiltradas[0];
    }

    useEffect(() => {
        if(editarUsuario){
            setAuxSucursal(prev=> prev + 1)
        } else {
            setSucursalData(dataSucursal)
            setClientData(dataClient)
            setAdministrador(true)
            setClientInput(false)
            setSucursalInput(false)
        }
    }, [])


    useEffect(() => {
        if (editarUsuario?.branchId?.length > 0) {
            setSucursalSelect(buscarSucursalesPorIDs(editarUsuario?.branchId))
            setSucursalData(filtrarSucursalesPorIDs(editarUsuario?.branchId))
            
        } else {
            setSucursalData(dataSucursal)
        }
        // if (editProducts?.vendorId === null) {
        //     setDataProveedor(dataVendor)
        // } else {
        //     setSelectProveedor(buscarProveedoresPorIDs(editProducts?.vendorId))
        //     setDataProveedor(filtrarProveedoresPorIDs(editProducts?.vendorId));
        // }

    }, [auxSucursal])

    const InitialValues = editarUsuario ? ({
        id: editarUsuario.id,
        IdType: editarUsuario.IdType,
        UserName: editarUsuario.UserName,
        PassW: editarUsuario.PassW,
        Name: editarUsuario.Name,
        Email: editarUsuario.Email,
        Image: [],
        Permissions: editarUsuario.Permissions,
        branchId: editarUsuario.branchId,
        Active: editarUsuario.Active,
        Pin: editarUsuario.Pin,
        idClient: editarUsuario.idClient
    }) : ({
        id: 0,
        IdType: 0,
        UserName: "",
        PassW: "",
        Name: "",
        Email: "",
        Image: [],
        Permissions: null,
        branchId: null,
        Active: "false",
        Pin: 0,
        idClient: 0
    })

    return (
        <>
            {
                editarUsuario ? <Formik
                    initialValues={{
                        id: editarUsuario?.id,
                        IdType: editarUsuario?.idType,
                        UserName: editarUsuario?.userName,
                        PassW: editarUsuario?.passW,
                        Name: editarUsuario?.name,
                        Email: editarUsuario?.email,
                        Image: [],
                        Permissions: null,
                        branchId: [],
                        Active: true,
                        Pin: editarUsuario?.pin,
                        idClient: editarUsuario?.idClient
                    }}
                    onSubmit={(valores) => {
                        valores.Image = imageBase64
                        valores.Active = JSON.parse(valores.Active)
                        valores.branchId = sucursalSelect.map(el => parseInt(el.id));
                        valores.IdType = parseInt(valores.IdType)
                        valores.idClient = parseInt(valores.idClient)
                        if (clientInput) {
                            valores.branchId = null
                        }
                        setAgregarUsuario(false);
                        setEditarUsuario(prev=> ({...prev, editUsuario: false}));
                        UserSubmit(valores)
                    }}

                // validationSchema={validationSchema}

                >{({ handleSubmit, handleChange, errors, touched }) => (
                    <form className="divide-y divide-slate-200" onSubmit={handleSubmit}>
                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 mx-auto py-16 sm:px-6 lg:grid-cols-3 lg:px-8 ">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-slate-400">Informacion de Usuario</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Rellene la informacion del Usuario que quiere Editar
                                </p>
                            </div>

                            <div className="col-span-full lg:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:max-w-xl sm:grid-cols-6">
                                    <div className={`col-span-full flex flex-col gap-4 items-center gap-x-8 ${errors.Image && touched.Image && 'border-Rojo'}`}>
                                        <Image
                                            src="https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg"
                                            alt=""
                                            width={100}
                                            height={100}
                                            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                            priority
                                        />
                                        <div>
                                            <input
                                                className="flex flex-col"
                                                type="file"
                                                name="Image"
                                                onChange={(e) => {
                                                    setImage(e.target.files[0])
                                                    const file = e.target.files[0];
                                                    const reader = new FileReader();
                                                    reader.readAsDataURL(file)
                                                    reader.onload = () => {
                                                        setImageBase64(reader.result)
                                                    }
                                                }}

                                            />
                                            {image ? <ImagePrewie file={image} /> : <h1>Sube una Imagen para este Usuario</h1>}

                                        </div>
                                    </div>

                                    <div className="sm:col-span-full">
                                        <label htmlFor="Name" className="block text-sm font-medium leading-6 text-slate-400">
                                            Nombre y Apellido*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                type="text"
                                                name="Name"
                                                id="Name"
                                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.Name && touched.Name && 'border-Rojo'}`}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="Email" className="block text-sm font-medium leading-6 text-slate-400">
                                            Correo*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                id="Email"
                                                name="Email"
                                                type="email"
                                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.Email && touched.Email && 'border-Rojo'}`}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="UserName" className="block text-sm font-medium leading-6 text-slate-400">
                                            Usuario*
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">

                                                <Field
                                                    type="text"
                                                    name="UserName"
                                                    id="UserName"
                                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.UserName && touched.UserName && 'border-Rojo'}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="IdType" className="block text-sm font-medium leading-6 text-slate-400">
                                            Tipo de Usuario*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                as="select"
                                                id="IdType"
                                                name="IdType"
                                                onChange={(e) => {
                                                    if (e.target.value === "99") {
                                                        setAdministrador(true)
                                                        setClientInput(false)
                                                        setSucursalInput(false)
                                                        handleChange(e)
                                                    } else if (e.target.value === "1") {
                                                        setAdministrador(false)
                                                        setSucursalInput(true)
                                                        setClientInput(false)
                                                        handleChange(e)
                                                    } else {
                                                        setAdministrador(false)
                                                        setClientInput(true)
                                                        setSucursalInput(false)
                                                        handleChange(e)
                                                    }
                                                      
                                                }
                                                }
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value={"99"}>Administrador</option>
                                                <option value={"2"}>Cliente</option>
                                                <option value={"1"}>Sucursal</option>

                                                {/* <option>Encargado</option>
                                            <option>Gerente</option> */}
                                            </Field>
                                        </div>
                                    </div>
                                    {clientInput && <div className="col-span-full">
                                        <label htmlFor="IdType" className="block text-sm font-medium leading-6 text-slate-400">
                                            Clientes*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                as="select"
                                                id="idClient"
                                                name="idClient"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option>--</option>
                                                {
                                                    clientData?.map((el) => (
                                                        <option key={el.id} value={el.id}>{el.name}</option>
                                                    ))
                                                }
                                            </Field>
                                        </div>
                                    </div>}
                                    {sucursalInput && <div className="col-span-full">
                                        <label htmlFor="branchId" className="block text-sm font-medium leading-6 text-slate-400">
                                            Sucursal*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                as="select"
                                                id="branchId"
                                                onChange={(e) => {
                                                    if (e.target.value === "") {
                                                        return
                                                    } else {
                                                        setSucursalSelect(prev => [...prev, JSON.parse(e.target.value)])
                                                        setSucursalData((prev) => prev.filter(el => el.id !== JSON.parse(e.target.value).id))
                                                    }
                                                }}
                                                name="branchId"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value={""}>--</option>
                                                {
                                                    sucursalData?.map((el) => (
                                                        <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
                                                    ))
                                                }
                                                {/* <option>Encargado</option>
                                            <option>Gerente</option> */}
                                            </Field>
                                        </div>
                                        {
                                            sucursalSelect &&

                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                                                {
                                                    sucursalSelect?.map(suc => <div className="flex justify-between gap-2 text-sm" key={suc.id}>
                                                        <p>{suc.name}</p>
                                                        <button
                                                            onClick={() => { setSucursalSelect(prev => prev.filter(el => el.id !== suc.id)); setSucursalData(prev => [...prev, suc]) }}
                                                            className='bg-negro text-Cobre px-2 py-1 rounded-md hover:bg-red-600'
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>)
                                                }
                                            </div>
                                        }
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-slate-400">Contraseña</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Coloca la contraseña de tu Usuario
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="PassW" className="block text-sm font-medium leading-6 text-slate-400">
                                            Contraseña*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                id="PassW"
                                                name="PassW"
                                                type="password"
                                                autoComplete="current-password"
                                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.PassW && touched.PassW && 'border-Rojo'}`}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-slate-400">PIN</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Selecione un PIN de 4 digitos para el usuario
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="Pin" className="block text-sm font-medium leading-6 text-slate-400">
                                            PIN*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                id="Pin"
                                                name="Pin"
                                                type="number"
                                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.Pin && touched.Pin && 'border-Rojo'}`}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-span-full mt-10 px-10">
                                <div className="w-full flex justify-center lg:justify-end">
                                    <button
                                        type="submit"
                                        className=' px-4 flex justify-center items-center bg-rojo-pantone py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50'
                                    >
                                        Registrar Usuario
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}</Formik> : <Formik
                    initialValues={{
                        id: 0,
                        IdType: "99",
                        UserName: "",
                        PassW: "",
                        Name: "",
                        Email: "",
                        Image: [],
                        Permissions: null,
                        branchId: null,
                        Active: true,
                        Pin: 0,
                        idClient: 0
                    }}
                    onSubmit={(valores) => {
                        valores.Image = imageBase64
                        valores.branchId = sucursalSelect.map(el => parseInt(el.id));
                        valores.IdType = parseInt(valores.IdType)
                        valores.idClient = parseInt(valores.idClient)
                        if (clientInput) {
                            valores.branchId = null
                        }
                        UserSubmit(valores)
                    }}

                validationSchema={validationSchema}

                >{({ handleSubmit, handleChange, errors, touched }) => (
                    <form className="divide-y divide-slate-200" onSubmit={handleSubmit}>
                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 mx-auto py-16 sm:px-6 lg:grid-cols-3 lg:px-8 ">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-slate-400">Informacion de Usuario</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Rellene la informacion del Usuario que quiere crear
                                </p>
                            </div>

                            <div className="col-span-full lg:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:max-w-xl sm:grid-cols-6">
                                    <div className={`col-span-full flex flex-col gap-4 items-center gap-x-8 ${errors.Image && touched.Image && 'border-Rojo'}`}>
                                        <Image
                                            src="https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg"
                                            alt=""
                                            width={100}
                                            height={100}
                                            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                        />
                                        <div>
                                            <input
                                                className="flex flex-col"
                                                type="file"
                                                name="Image"
                                                onChange={(e) => {
                                                    setImage(e.target.files[0])
                                                    const file = e.target.files[0];
                                                    const reader = new FileReader();
                                                    reader.readAsDataURL(file)
                                                    reader.onload = () => {
                                                        setImageBase64(reader.result)
                                                    }
                                                }}

                                            />
                                            {image ? <ImagePrewie file={image} /> : <h1>Sube una Imagen para este Usuario</h1>}

                                        </div>
                                    </div>

                                    <div className="sm:col-span-full">
                                        <label htmlFor="Name" className="block text-sm font-medium leading-6 text-slate-400">
                                            Nombre y Apellido*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                type="text"
                                                name="Name"
                                                id="Name"
                                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.Name && touched.Name && 'border-Rojo'}`}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="Email" className="block text-sm font-medium leading-6 text-slate-400">
                                            Correo*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                id="Email"
                                                name="Email"
                                                type="email"
                                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.Email && touched.Email && 'border-Rojo'}`}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="UserName" className="block text-sm font-medium leading-6 text-slate-400">
                                            Usuario*
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">

                                                <Field
                                                    type="text"
                                                    name="UserName"
                                                    id="UserName"
                                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.UserName && touched.UserName && 'border-Rojo'}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="IdType" className="block text-sm font-medium leading-6 text-slate-400">
                                            Tipo de Usuario*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                as="select"
                                                id="IdType"
                                                name="IdType"
                                                onChange={(e) => {
                                                    if (e.target.value === "99") {
                                                        setClientInput(false)
                                                        setSucursalInput(false)
                                                        handleChange(e)
                                                    } else if (e.target.value === "1") {
                                                        setSucursalInput(true)
                                                        setClientInput(false)
                                                        handleChange(e)
                                                    } else {
                                                        setClientInput(true)
                                                        setSucursalInput(false)
                                                        handleChange(e)
                                                    }
                                                }}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value={99}>Administrador</option>
                                                <option value={2}>Cliente</option>
                                                <option value={1}>Sucursal</option>
                                                {/* <option>Encargado</option>
                                        <option>Gerente</option> */}
                                            </Field>
                                        </div>
                                    </div>
                                    {clientInput && <div className="col-span-full">
                                        <label htmlFor="IdType" className="block text-sm font-medium leading-6 text-slate-400">
                                            Clientes
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                as="select"
                                                id="idClient"
                                                name="idClient"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option>--</option>
                                                {
                                                    clientData?.map((el) => (
                                                        <option key={el.id} value={el.id}>{el.name}</option>
                                                    ))
                                                }
                                            </Field>
                                        </div>
                                    </div>}
                                    {sucursalInput && <div className="col-span-full">
                                        <label htmlFor="branchId" className="block text-sm font-medium leading-6 text-slate-400">
                                            Sucursal
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                as="select"
                                                id="branchId"
                                                onChange={(e) => {
                                                    if (e.target.value === "") {
                                                        return
                                                    } else {
                                                        setSucursalSelect(prev => [...prev, JSON.parse(e.target.value)])
                                                        setSucursalData((prev) => prev.filter(el => el.id !== JSON.parse(e.target.value).id))
                                                    }
                                                }}
                                                name="branchId"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value={""}>--</option>
                                                {
                                                    sucursalData?.map((el) => (
                                                        <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
                                                    ))
                                                }
                                                {/* <option>Encargado</option>
                                        <option>Gerente</option> */}
                                            </Field>
                                        </div>
                                        {
                                            sucursalSelect &&

                                            <div className="grid lg:grid-cols-3 gap-4 my-5">
                                                {
                                                    sucursalSelect?.map(suc => <div className="flex gap-2 justify-between text-sm" key={suc.id}>
                                                        <p>{suc.name}</p>
                                                        <button
                                                            onClick={() => { setSucursalSelect(prev => prev.filter(el => el.id !== suc.id)); setSucursalData(prev => [...prev, suc]) }}
                                                            className='bg-negro text-rojo-pantone px-2 py-1 rounded-md hover:bg-red-600'
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>)
                                                }
                                            </div>
                                        }
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-slate-400">Contraseña</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Coloca la contraseña de tu Usuario
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="PassW" className="block text-sm font-medium leading-6 text-slate-400">
                                            Contraseña*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                id="PassW"
                                                name="PassW"
                                                type="password"
                                                autoComplete="current-password"
                                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.PassW && touched.PassW && 'border-Rojo'}`}
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="col-span-full">
                                    <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-slate-400">
                                        New password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="new-password"
                                            name="new_password"
                                            type="password"
                                            autoComplete="new-password"
                                            className="block w-full rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div> */}

                                    {/* <div className="col-span-full">
                                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-slate-400">
                                    Confirmar contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirm-password"
                                        name="confirm_password"
                                        type="password"
                                        autoComplete="new-password"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-slate-400">PIN</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Selecione un PIN de 4 digitos para el usuario
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="Pin" className="block text-sm font-medium leading-6 text-slate-400">
                                            PIN*
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                id="Pin"
                                                name="Pin"
                                                type="number"
                                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.Pin && touched.Pin && 'border-Rojo'}`}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-span-full mt-10 px-10">
                                <div className="w-full flex justify-center lg:justify-end">
                                    <button
                                        type="submit"
                                        className=' px-4 flex justify-center items-center bg-rojo-pantone py-2 rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50'
                                    >
                                        Registrar Usuario
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}</Formik>
            }

        </>


    )
}
