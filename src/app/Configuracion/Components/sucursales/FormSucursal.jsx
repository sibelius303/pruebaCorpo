'use client'
import axios from "axios";
import { Field, Formik } from "formik";
import * as Yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";
import LoaderButton from "@/components/LoaderButton";

export default function FormSucursal({ setAgregarSucursal, setEditState, editSucursal }) {
    const { SucursalSubmit,
        pendingButton,
        setPendingButton
    } = useFront()

    const validationSchema = Yup.object().shape({
        code: Yup.string().required('Este campo  es obligatorio'),
        name: Yup.string().required('Este campo es obligatorio'),
        descrip: Yup.string().required('Este campo es obligatorio'),
    });


    return (
        <>
            {editSucursal ? <Formik
                initialValues={{
                    id: editSucursal.id,
                    code: editSucursal.code,
                    name: editSucursal.name,
                    descrip: editSucursal.descrip,
                    address: editSucursal.address,
                    country: editSucursal.country,
                    state: editSucursal.state,
                    city: editSucursal.city,
                    active: editSucursal.active
                }}
                // validationSchema={validationSchema}
                onSubmit={(valores) => {
                    setPendingButton(true)
                    valores.active = JSON.parse(valores.active)
                    SucursalSubmit(valores)
                    setEditState(prev => ({ ...prev, editSucursales: false }))
                }}
            >{({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit} className="md:col-span-2">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:max-w-xl">
                        <div className="col-span-full">
                            <label htmlFor="code" className="block text-sm font-medium leading-6 text-slate-400">
                                Numero de Sucursal*
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="code"
                                    id="code"
                                    disabled
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.code && touched.code && 'border-Rojo'}`}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-400">
                                Nombre de Sucursal*
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.name && touched.name && 'border-Rojo'}`}
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
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.descrip && touched.descrip && 'border-Rojo'}`}
                                />
                            </div>
                            {
                                    errors.descrip && touched.descrip && <div>
                                        <p>{errors.descrip}</p>
                                    </div>
                                }
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="descrip" className="block text-sm font-medium leading-6 text-slate-400">
                                Direccion
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="address"
                                    id="address"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.address && touched.address && 'border-Rojo'}`}
                                />
                            </div>
                            {
                                    errors.address && touched.address && <div>
                                        <p>{errors.address}</p>
                                    </div>
                                }
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-slate-400">
                                Pais
                            </label>
                            <div className="mt-2">
                                <Field
                                    id="country"
                                    name="country"
                                    type="text"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.country && touched.country && 'border-Rojo'}`}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-slate-400">
                                Estado
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">

                                    <Field
                                        type="text"
                                        name="state"
                                        id="state"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.state && touched.state && 'border-Rojo'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-slate-400">
                                Ciudad
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="city"
                                    id="city"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.city && touched.city && 'border-Rojo'}`}
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
                    code: "",
                    name: "",
                    descrip: "",
                    address: "",
                    country: "",
                    state: "",
                    city: "",
                    active: true
                }}
                validationSchema={validationSchema}
                onSubmit={(valores) => {
                    setPendingButton(true)
                    SucursalSubmit(valores)
                }}
            >{({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit} className="md:col-span-2">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:max-w-xl">
                        <div className="col-span-full">
                            <label htmlFor="code" className="block text-sm font-medium leading-6 text-slate-400">
                                Numero de Sucursal*
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="code"
                                    id="code"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.code && touched.code && 'border-Rojo'}`}
                                />
                            </div>
                            {
                                    errors.code && touched.code && <div>
                                        <p>{errors.name}</p>
                                    </div>
                                }
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-400">
                                Nombre de Sucursal*
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.name && touched.name && 'border-Rojo'}`}
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
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.descrip && touched.descrip && 'border-Rojo'}`}
                                />
                            </div>
                            {
                                    errors.descrip && touched.descrip && <div>
                                        <p>{errors.descrip}</p>
                                    </div>
                                }
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="descrip" className="block text-sm font-medium leading-6 text-slate-400">
                                Direccion
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="address"
                                    id="address"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.address && touched.address && 'border-Rojo'}`}
                                />
                            </div>
                            {
                                    errors.address && touched.address && <div>
                                        <p>{errors.address}</p>
                                    </div>
                                }
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-slate-400">
                                Pais
                            </label>
                            <div className="mt-2">
                                <Field
                                    id="country"
                                    name="country"
                                    type="text"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.country && touched.country && 'border-Rojo'}`}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-slate-400">
                                Estado
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">

                                    <Field
                                        type="text"
                                        name="state"
                                        id="state"
                                        className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.state && touched.state && 'border-Rojo'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-slate-400">
                                Ciudad
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="city"
                                    id="city"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.city && touched.city && 'border-Rojo'}`}
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
            )}</Formik>}
        </>


    )
}