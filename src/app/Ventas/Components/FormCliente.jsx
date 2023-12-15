'use client'
import useFront from "@/hooks/useFront"
import axios from "axios";
import { Field, Formik, useFormikContext } from "formik"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from 'yup';


export default function FormCliente({ setAgregarClientes, setAuxListCliente, setAuxClient, setClientInfo, setAuxTotal }) {
    const { dataClient } = useFront()

    const [clientFilter, setClientFilter] = useState([]);
    const [busqueda, setBusqueda] = useState(false);
    const [inputValue, setInputValue] = useState("")

    const VerificationSchema = yup.object().shape({
        identification: yup.string().required('La identificacion del cliente es requerida'),
        nameClient: yup.string().required('El nombre del cliente es requerido'),
        descripClient: yup.string().required('La descripción del cliente es requerida'),
        address: yup.string().required('La dirección es requerida'),
    });


    return (
        <>
            <div className="flex w-full gap-2 items-end py-2 px-5">
                <div className="w-3/4">
                    <label className="block text-sm font-medium leading-6 text-slate-400">
                        Identificacion
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => {
                                setBusqueda(false)
                                setInputValue(e.target.value)
                                setClientFilter(dataClient.filter((el) => (el.identification === e.target.value)))

                            }}
                            className="block w-full rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <button onClick={() => setBusqueda(true)} className=' px-4 flex w-auto justify-center items-end py-1.5 bg-rojo-pantone rounded-lg text-BlancoIvory shadow-2xl hover:bg-opacity-50'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
            {busqueda && <Formik
                initialValues={{
                    idClient: clientFilter.length > 0 ? clientFilter[0]?.id : 0,
                    identification: clientFilter.length > 0 ? clientFilter[0]?.identification : inputValue,
                    nameClient: clientFilter[0]?.name,
                    descripClient: clientFilter[0]?.descrip,
                    address: clientFilter[0]?.address,
                    phone: clientFilter[0]?.phone
                }}
                onSubmit={(valores) => {
                    valores.identification = inputValue
                    valores.idBranch = parseInt(valores.idBranch)
                    setClientInfo(valores)
                    setAuxClient(false)
                    // ClientSubmit(valores)

                }}
                validationSchema={VerificationSchema}
            >{({ handleSubmit, handleChange, errors, touched }) => (
                <form onSubmit={handleSubmit} className="mt-5">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-5 lg:grid-cols-2">
                        <div className="">
                            <label htmlFor="identification" className="block text-sm font-medium leading-6 text-slate-400">
                                Identificacion*
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="identification"
                                    // value={inputValue}
                                    // onChange={(e)=>{setInputValue(e.target.value)}}
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
                        <div className="">
                            <label htmlFor="nameClient" className="block text-sm font-medium leading-6 text-slate-400">
                                Nombre del Cliente*
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="nameClient"
                                    id="nameClient"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.nameClient && touched.nameClient && 'border-Rojo'}`}
                                />
                            </div>
                            {
                                errors.nameClient && touched.nameClient && <div>
                                    <p>{errors.nameClient}</p>
                                </div>
                            }
                        </div>
                        <div className="">
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
                        <div className="">
                            <label htmlFor="descripClient" className="block text-sm font-medium leading-6 text-slate-400">
                                Descripcion
                            </label>
                            <div className="mt-2">
                                <Field
                                    type="text"
                                    name="descripClient"
                                    id="descripClient"
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 ${errors.descripClient && touched.descripClient && 'border-Rojo'}`}
                                />
                            </div>
                            {
                                errors.descripClient && touched.descripClient && <div>
                                    <p>{errors.descripClient}</p>
                                </div>
                            }
                        </div>

                        <div className="">
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
                            {
                                errors.address && touched.address && <div>
                                    <p>{errors.address}</p>
                                </div>
                            }
                        </div>
                        <div className='col-span-full'>
                            <div className='w-full flex items-center justify-end'>
                                <button
                                    type="submit"
                                    className=" bg-rojo-pantone px-4 py-2.5 text-sm rounded-md font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}</Formik>
            }</>
    )
}