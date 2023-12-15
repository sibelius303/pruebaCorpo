'use client'
import useFront from "@/hooks/useFront";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import TablaPagos from "./TablaPagos";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup';

export default function FormPayment({ setAuxFormPayment, pagoTable, setPagoTable, auxTotal, setAuxTotal }) {
    const { totales, setTotales, totales2, setTotales2 } = useFront()
    const [montoAux, setMontoAux] = useState("")
    const [idAux, setIdAux] = useState(0)
    const [objPayment, setObjPayment] = useState({ idType: 1, descrip: "Efectivo" })

    useEffect(() => {
        setMontoAux(parseFloat(totales.monto).toFixed(2))
    }, [totales])

    console.log(totales.monto)


    const dismMonto = (valores) => {
        console.log(valores)
        console.log(totales)
        if (totales.monto >= valores.monto) {
            setTotales((prevState) => {
                const copia = { ...prevState };
                if (copia.monto >= valores.monto) {
                    copia.monto = copia.monto - valores.monto;
                   copia.monto = parseFloat(copia.monto.toFixed(2))
                    return copia
                } else {
                 //   copia.monto = copia.monto.fixed(4)
                    return copia
                }

            });
        }
    };

    console.log(parseFloat(totales.monto).toFixed(2))



    return (
        <>
            <Formik
                initialValues={{
                    metodoPago: "",
                    monto: montoAux,
                    total: totales?.monto
                }}
                onSubmit={(valores, { resetForm }) => {
                    console.log(valores);
                    console.log(totales)
                    console.log(montoAux)
                    if (totales.monto >= montoAux) {
                        console.log(valores.monto)
                        if (valores.monto >= 0) {
                            setIdAux(prev => prev + 1)
                            console.log(valores)
                            valores.id = idAux
                            valores.metodoPago = Object.keys(objPayment).length > 0 ? objPayment : { idType: 1, descrip: "Efectivo" }
                            valores.monto = parseFloat(parseFloat(montoAux).toFixed(2))
                            dismMonto(valores)
                            setPagoTable(prev => [...prev, valores])
                            console.log(pagoTable)
                            setAuxFormPayment(false);
                            setObjPayment({})
                            resetForm();
                            setAuxTotal(prev => prev + 1)
                        } else {
                            toast.error('No puede ingresar numeros negativos')

                        }

                    } else {
                        toast.error('Supera la totalidad del monto de la Venta')
                    }

                }}
            >{({ handleSubmit, handleChange, errors, touched }) => (
                <form onSubmit={handleSubmit} className="px-4 mb-6 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
                    <div className="mx-auto max-w-lg lg:max-w-none">
                        <section className="mt-10 ">
                            <h2 id="payment-heading" className="text-xl font-medium text-gray-900">
                                Detalle de Pago
                            </h2>
                            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div className="col-span-1">
                                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                        Metodo de Pago
                                    </label>
                                    <Field
                                        id="metodoPago"
                                        as='select'
                                        name="metodoPago"
                                        onChange={(e) => {
                                            setObjPayment(JSON.parse(e.target.value))
                                            handleChange(e)
                                        }}
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value={JSON.stringify({ idType: 1, descrip: "Efectivo" })}>Efectivo</option>
                                        <option value={JSON.stringify({ idType: 2, descrip: "Tarjeta" })}>Tarjeta</option>
                                    </Field>
                                </div>

                                <div className="col-span-1">
                                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                        Monto a Pagar
                                    </label>
                                    <div className="mt-2 flex">
                                        <Field
                                            type="number"
                                            id="monto"
                                            step="0.01"
                                            name="monto"
                                            value={montoAux}
                                            onChange={(e) => {
                                                setMontoAux(e.target.value)
                                                handleChange(e)
                                            }}
                                            className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    {
                                        errors.monto && touched.monto && <div>
                                            <p>{errors.monto}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </section>
                        <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-end">
                            <button
                                disabled={totales?.monto <= 0}
                                type="submit"
                                className={`w-full rounded-md  bg-rojo-pantone px-4 py-2 text-sm font-medium text-BlancoIvory shadow-sm hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto ${totales.monto <= 0 && 'opacity-20'}`}
                            >
                                Registrar
                            </button>

                        </div>
                    </div>
                </form>
            )}</Formik>
            {pagoTable.length > 0 && <TablaPagos pagoTable={pagoTable} setPagoTable={setPagoTable} setTotales={setTotales} setAuxTotal={setAuxTotal} />}
        </>



    )
}
