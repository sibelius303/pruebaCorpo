'use client'

import { Field, Formik } from "formik"
import * as Yup from 'yup';

import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";
import LoaderButton from "@/components/LoaderButton";


export default function FormCliente({ setAgregarClientes, editClientes, setEditState }) {
    const { ClientSubmit,
        pendingButton,
        setPendingButton
    } = useFront()

    const validationSchema = Yup.object().shape({
        identification: Yup.string().required('La identificacion es obligatoria'),
        name: Yup.string().required('El nombre es obligatorio'),
        // descrip: Yup.string().required('El campo "descrip" es obligatorio'),
        // address: Yup.string().required('El campo "address" es obligatorio'),
    });



    return (
        <>
            {
                editClientes ? <Formik
                    initialValues={{
                        id: editClientes.id,
                        identification: editClientes.identification,
                        name: editClientes.name,
                        descrip: editClientes.descrip,
                        address: editClientes.address,
                        active: editClientes.active,
                        phone: editClientes.phone
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(valores) => {
                        setPendingButton(true);
                        setEditState(prev => ({ ...prev, editClient: false }))
                        ClientSubmit(valores);
                    }}
                >{({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:max-w-xl">
                            <div className="col-span-full">
                                <label htmlFor="code" className="block text-sm font-medium leading-6 text-slate-400">
                                    Identificacion*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="identification"
                                        id="identification"
                                        disabled
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black disabled:text-gray-400 disabled:bg-gray-100 shadow-sm sm:text-sm sm:leading-6 ${errors.identification && touched.identification && 'border-Rojo'}`}
                                    />
                                </div>
                                {
                                    errors.identification && touched.identification && <div>
                                        <p>{errors.identification}</p>
                                    </div>
                                }
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-400">
                                    Nombre del Cliente*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.name && touched.name && 'border-Rojo'}`}
                                    />
                                </div>
                                {
                                    errors.name && touched.name && <div>
                                        <p>{errors.name}</p>
                                    </div>
                                }
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-slate-400">
                                    Telefono
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        onKeyDown={(e) => {
                                            if (!(e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Backspace') && !/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.descrip && touched.descrip && 'border-Rojo border'}`}
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="descrip" className="block text-sm font-medium leading-6 text-slate-400">
                                    Descripcion
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="descrip"
                                        id="descrip"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm   sm:text-sm sm:leading-6 ${errors.descrip && touched.descrip && 'border-Rojo'}`}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-slate-400">
                                    Direccion
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="address"
                                        name="address"
                                        type="text"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.address && touched.address && 'border-Rojo'}`}
                                    />
                                </div>
                            </div>
                            <div className='col-span-full'>
                                <div className='w-full flex items-center justify-end'>
                                    <button
                                        type="submit"
                                        disabled={pendingButton}
                                        className=" bg-rojo-pantone rounded-md px-4 py-2.5 mt-4 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {
                                            pendingButton ? <LoaderButton /> : 'Agregar'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}</Formik> : <Formik
                    initialValues={{
                        id: 0,
                        identification: "",
                        name: "",
                        descrip: "",
                        address: "",
                        active: true,
                        phone: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(valores) => {
                        setPendingButton(true);
                        ClientSubmit(valores);
                    }}
                >{({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:max-w-xl">
                            <div className="col-span-full">
                                <label htmlFor="code" className="block text-sm font-medium leading-6 text-slate-400">
                                    Identificacion*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="identification"
                                        id="identification"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.identification && touched.identification && 'border-Rojo'}`}
                                    />
                                </div>
                                {
                                    errors.identification && touched.identification && <div>
                                        <p>{errors.identification}</p>
                                    </div>
                                }
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-400">
                                    Nombre del Cliente*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.name && touched.name && 'border-Rojo border'}`}
                                    />
                                </div>
                                {
                                    errors.name && touched.name && <div>
                                        <p>{errors.name}</p>
                                    </div>
                                }
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-slate-400">
                                    Telefono
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        onKeyDown={(e) => {
                                            if (!(e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Backspace') && !/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.descrip && touched.descrip && 'border-Rojo border'}`}
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="descrip" className="block text-sm font-medium leading-6 text-slate-400">
                                    Descripcion
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="descrip"
                                        id="descrip"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.descrip && touched.descrip && 'border-Rojo border'}`}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-slate-400">
                                    Direccion
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="address"
                                        name="address"
                                        type="text"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.address && touched.address && 'border-Rojo'}`}
                                    />
                                </div>
                            </div>
                            <div className='col-span-full'>
                                <div className='w-full flex items-center justify-end'>
                                    <button
                                        type="submit"
                                        disabled={pendingButton}
                                        className=" bg-rojo-pantone rounded-md px-4 py-2.5 mt-4 text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {
                                            pendingButton ? <LoaderButton /> : 'Agregar'
                                        }
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