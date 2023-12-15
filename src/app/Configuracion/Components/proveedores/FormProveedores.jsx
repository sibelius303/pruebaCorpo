'use client'

import { Field, Formik } from "formik"
import * as Yup from 'yup';

import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";
import LoaderButton from "@/components/LoaderButton";


export default function FormProveedores({ setAgregarProveedor, setEditState, editProveedor }) {
    const { VendorSubmit,
        pendingButton,
        setPendingButton } = useFront()

    const validationSchema = Yup.object().shape({
        code: Yup.string().required('El campo es obligatorio'),
        name: Yup.string().required('El campo es obligatorio'),
        descrip: Yup.string().required('El campo es obligatorio'),
    });



    return (
        <>
            {
                editProveedor ? <Formik
                    initialValues={{
                        id: editProveedor.id,
                        code: editProveedor.code,
                        name: editProveedor.name,
                        descrip: editProveedor.descrip,
                        active: editProveedor.active
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(valores) => {
                        setPendingButton(true);
                        console.log(valores);
                        setEditState(prev => ({ ...prev, editVendor: false }))
                        VendorSubmit(valores);
                    }}
                >{({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:max-w-xl">
                            <div className="col-span-full">
                                <label htmlFor="code" className="block text-sm font-medium leading-6 text-slate-400">
                                    Codigo de Proveedor*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="code"
                                        id="code"
                                        disabled
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.code && touched.code && 'border-Rojo'}`}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-400">
                                    Nombre del Proveedor*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.name && touched.name && 'border-Rojo'}`}
                                    />
                                </div>
                                
                                    {
                                        errors.name && touched.name && <div>
                                            <p>{errors.name}</p>
                                        </div>
                                    }
                                
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="descrip" className="block text-sm font-medium leading-6 text-slate-400">
                                    Descripcion*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="descrip"
                                        id="descrip"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.descrip && touched.descrip && 'border-Rojo'}`}
                                    />
                                </div>
                                {
                                    errors.descrip && touched.descrip && <div>
                                        <p>{errors.descrip}</p>
                                    </div>
                                }
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
                        code: "",
                        name: "",
                        descrip: "",
                        active: true
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(valores) => {
                        setPendingButton(true)
                        console.log(valores)
                        VendorSubmit(valores);
                    }}
                >{({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:max-w-xl">
                            <div className="col-span-full">
                                <label htmlFor="code" className="block text-sm font-medium leading-6 text-slate-400">
                                    Codigo de Proveedor*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="code"
                                        id="code"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.code && touched.code && 'border-Rojo'}`}
                                    />
                                </div>
                                {
                                    errors.code && touched.code && <div>
                                        <p>{errors.code}</p>
                                    </div>
                                }
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-400">
                                    Nombre del Proveedor*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.name && touched.name && 'border-Rojo'}`}
                                    />
                                </div>
                                {
                                    errors.name && touched.name && <div>
                                        <p>{errors.name}</p>
                                    </div>
                                }
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="descrip" className="block text-sm font-medium leading-6 text-slate-400">
                                    Descripcion*
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="text"
                                        name="descrip"
                                        id="descrip"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.descrip && touched.descrip && 'border-Rojo'}`}
                                    />
                                </div>
                                {
                                    errors.descrip && touched.descrip && <div>
                                        <p>{errors.descrip}</p>
                                    </div>
                                }
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