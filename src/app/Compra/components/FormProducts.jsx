'use client'
import { Field, Formik } from "formik";

import { useState } from "react";
import Modal from "./Modal";
import ProductGallery from "./ProductGallery";
import TablaProductos from "./TablaProductos";
import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";
import * as yup from 'yup';
import { toast } from "react-toastify";



export default function FormProducts({ setAgregarProducto, setAuxListProduct, setAgregarCompra, UserDataJson }) {
    const { dataSucursal, setAux, dataVendor } = useFront()
    const [open, setOpen] = useState(false);
    const [productData, setProductData] = useState({});
    const [productsTable, setProductsTable] = useState([]);

    const schema = yup.object().shape({
        cantidad: yup.number().required("La cantidad es requerida").min(1,"No se permite valores menores a 1"),
        idBranch: yup.string().required("La sucursal es requerida").min(1,"La sucursal es requerida"),
    });

    console.log(productsTable)


    return (

        <div className="w-full">
            <div className="my-10 flex justify-between">
                <button onClick={() => { setOpen(true)}} className='flex items-center bg-rojo-pantone px-4 py-2 rounded-lg text-BlancoIvory shadow-2xl justify-center hover:bg-opacity-50'>
                    Ver Productos
                </button>
            </div>
            <Formik
                initialValues={{
                    code: productData?.code,
                    name: productData?.name,
                    descrip: productData?.descrip,
                    cantidad: "",
                    cost: productData?.cost,
                    idBranch: "",
                    idVendor: ""
                }}
                onSubmit={(valores, { resetForm }) => {
                    const numeroAleatorio = Math.floor(Math.random() * 90) + 100;
                    if (Object.keys(productData).length > 0) {
                        if(valores.idBranch !== ""){
                        valores.id = productData?.id
                        valores.code = productData?.code
                        valores.name = productData?.name
                        valores.descrip = productData?.descrip
                        valores.cost = productData?.cost
                        valores.idRepo = numeroAleatorio
                        valores.idVendor = parseInt( valores.idVendor )
                        console.log('valores', valores)
                        setProductsTable(prev => [...prev, valores])
                        resetForm()
                        }
                    } else {
                        toast.error('Debe seleccionar el producto que desea reponer')
                    }


                }}
                validationSchema={schema}
            >{({ handleSubmit, handleChange, setFieldValue, values, resetForm, errors, touched }) => (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 md:gap-6 ">
                    <div className="">
                        <label htmlFor="code" className="block text-sm font-medium leading-6 text-slate-400">
                            SKU del Producto*
                        </label>
                        <div className="mt-2">
                            <Field
                                type="text"
                                name="code"
                                id="code"
                                disabled
                                value={productData?.code}
                                className={`block w-full rounded-md border bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.code && touched.code && 'border-Rojo'}`}
                            />
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-400">
                            Nombre del Producto*
                        </label>
                        <div className="mt-2">
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                disabled
                                value={productData?.name}
                                className={`block w-full rounded-md border bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.name && touched.name && 'border-Rojo'}`}
                            />
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="descrip" className="block text-sm font-medium leading-6 text-slate-400">
                            Descripcion*
                        </label>
                        <div className="mt-2">
                            <Field
                                id="descrip"
                                name="descrip"
                                type="text"
                                disabled
                                value={productData?.descrip}
                                className={`block w-full rounded-md border bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.descrip && touched.descrip && 'border-Rojo'}`}
                            />
                        </div>
                    </div>
                     <div className="">
                        <label htmlFor="cost" className="block text-sm font-medium leading-6 text-slate-400">
                            Costo*
                        </label>
                        <div className="mt-2">
                            <Field
                                type="text"
                                name="cost"
                                id="cost"
                                disabled
                                value={productData?.cost}
                                className={`block w-full rounded-md border bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.cost && touched.cost && 'border-Rojo'}`}
                            />
                        </div>
                    </div> 
                    {UserDataJson.idType !== 2 && <div>
                        <label htmlFor="location" className="block text-sm mb-2 font-medium leading-6 text-slate-400">
                            Sucursal*
                        </label>
                        <Field
                            as="select"
                            id="idBranch"
                            name="idBranch"
                            className={`block w-full rounded-md border bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.idBranch && touched.idBranch && 'border-Rojo'}`}
                        >
                            <option value={""}>--</option>
                            {
                                dataSucursal?.map(el => (
                                    <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
                                ))
                            }
                            {
                                errors.idBranch && <div>
                                    <p>{errors.idBranch}</p>
                                </div>
                            }
                        </Field>
                    </div>}
                    <div>
                        <label htmlFor="location" className="block text-sm mb-2 font-medium leading-6 text-slate-400">
                            Proveedores*
                        </label>
                        <Field
                            as="select"
                            id="idVendor"
                            name="idVendor"
                            className={`block w-full rounded-md border bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.idBranch && touched.idBranch && 'border-Rojo'}`}
                        >
                            <option value={""}>--</option>
                            {
                                dataVendor?.map(el => (
                                    <option key={el.id} value={JSON.stringify(el.id)}>{el.name}</option>
                                ))
                            }
                            {
                                errors.idBranch && <div>
                                    <p>{errors.idBranch}</p>
                                </div>
                            }
                        </Field>
                    </div>
                    <div className="">
                        <label htmlFor="cost" className="block text-sm font-medium leading-6 text-slate-400">
                            Cantidad*
                        </label>
                        <div className="mt-2">
                            <Field
                                type="text"
                                name="cantidad"
                                id="cantidad"
                                className={`block w-full rounded-md border bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${errors.cantidad && touched.cantidad && 'border-Rojo'}`} />
                        </div>
                        {
                                errors.cantidad && <div>
                                    <p>{errors.cantidad}</p>
                                </div>
                            }
                    </div>
                    <div className='col-span-full'>
                        <div className='w-full mt-3 flex items-center justify-end'>
                            <button
                                type="submit"
                                className=" bg-rojo-pantone px-4 py-2.5 rounded-md text-sm font-semibold text-BlancoIvory shadow-sm hover:bg-opacity-50"
                            >
                                Agregar
                            </button>
                        </div>
                    </div>

                </form>
            )
                }</Formik >
            {productsTable.length > 0 && <TablaProductos productsTable={productsTable} setProductsTable={setProductsTable} />}
            <Modal open={open} setOpen={setOpen} boton1={'Cancelar'} action={setAux}>
                <ProductGallery setProductData={setProductData} setOpen={setOpen} />
            </Modal>
        </div>

    )
}