'use client'

import { Field, FieldArray, Formik } from "formik";
import { useEffect, useState } from "react";
import ImagePrewie from "./ImagePrewie";
import * as Yup from 'yup';
import "react-toastify/dist/ReactToastify.css";
import useFront from "@/hooks/useFront";
import Image from "next/image";
import LoaderButton from "@/components/LoaderButton";
import Toggle from "./Toggle";
import ToggleTwo from "./ToggleTwo";


export default function FormProducts({ setAgregarProductos, setAuxListProduct, editProducts }) {
    const { dataSucursal,
        dataVendor,
        dataCategory,
        ProductSubmit,
        pendingButton, 
        setPendingButton
     } = useFront();
    const [imageArr, setImageArr] = useState([]);
    const [imageArrBack, setImageArrBack] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [referenceString, setReferenceString] = useState([]);
    const [dataSucursalList, setDataSucursalList] = useState([]);
    const [dataProveedor, setDataProveedor] = useState([]);
    const [selectSucursal, setSelectSucursal] = useState([]);
    const [selectProveedor, setSelectProveedor] = useState([]);
    const [addTransform, setAddTransform] = useState( editProducts?.isTransformer ?? false );
    const expirationNull = null


    useEffect(() => {
        setDataProveedor(dataVendor);
        setDataSucursalList(dataSucursal);
    }, [])



    useEffect(()=>{
        if( editProducts ) {
            console.log( editProducts?.isTransformer )
            setAddTransform( editProducts?.isTransformer ?? false )
            setReferenceString( editProducts?.reference.map( (ref, id) => ({id, cont:ref }) ) )
        }
    }, [editProducts])

    useEffect(()=>{
        if( dataSucursal && editProducts ) {
            setSelectSucursal( dataSucursal?.reduce( (acc, item)=>{
                if( editProducts.branchId.includes( item.id ) ) return [...acc, item]
                return acc
            },[]) )
        }
        if( dataVendor && editProducts ) {
            setSelectProveedor( dataVendor?.reduce( (acc, item)=>{
                if( editProducts.vendorId.includes( item.id ) ) return [...acc, item]
                return acc
            },[]) )
        }
    },[editProducts, dataSucursal, dataVendor])


    const validationSchema = Yup.object().shape({
        code: Yup.string().required('El campo  es obligatorio'),
        name: Yup.string().required('El campo  es obligatorio'),
        descrip: Yup.string().required('El campo es obligatorio'),
        cost: Yup.string().required('El campo es obligatorio'),
        price1: Yup.number().required('Debe colocar al menos un precio').min(1,'El número debe ser mayor a 0')
    });

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputValue("");
        const obj = {
            id: referenceString.length + 1,
            cont: inputValue
        }
        setReferenceString(prev => [...prev, obj])
    };

    return (

        <div className="w-full">
            <div className="w-full my-10 flex flex-col gap-2 items-center justify-center">
                <h1 className="text-gray-400">Agregar Transformador</h1>
                <ToggleTwo obj={editProducts?.isTransformer ?? false} onToggle={newValue => {console.log( newValue); setAddTransform(newValue)} }/>
            </div>
            { addTransform && <div className="my-5">
                <label  className="block text-sm font-medium leading-6 text-slate-400">
                    Seriales
                </label>
                <div className="mt-2">
                    <div>
                        <form className="flex gap-2 py-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e)=>handleInputChange(e)}
                                className="block w-1/2 rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"

                            />
                            <button type="submit" className=" bg-rojo-pantone px-4 py-2.5 text-sm font-semibold rounded-md text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Agregar Seriales</button>
                        </form>
                        {
                            referenceString.length > 0 ?
                                <>
                                    {<h2 className="block text-sm font-medium leading-6 text-slate-400">Seriales del producto</h2>}
                                    <div className="grid grid-cols-2 gap-y-4 lg:grid-cols-3 my-4">

                                        {referenceString.map((ref) => (

                                            <div key={ref.id} className="flex gap-2">
                                                <p >
                                                    {ref.cont}
                                                </p>
                                                <button
                                                    onClick={() => setReferenceString(prev => prev.filter(el => el.id !== ref.id))}
                                                    className='bg-negro text-rojo-pantone px-2 py-1 rounded-md hover:bg-red-600 '
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))

                                        }</div>
                                </> : <h1>Asigna los seriales del producto </h1>
                        }
                    </div>
                </div>
            </div>}
            <Formik
                initialValues={{
                    id: editProducts?.id ?? 0,
                    isTransformer: editProducts?.isTransformer ?? false,
                    idCategory: editProducts?.idCategory ?? "0",
                    idCapacity: editProducts?.idCapacity ?? "0",
                    code: editProducts?.code ?? "",
                    name: editProducts?.name ?? "",
                    descrip: editProducts?.descrip ?? "",
                    isFavorite: editProducts?.isFavorite ?? false,
                    dateExpiration: editProducts?.dateExpiration ?? "",
                    degrees: editProducts?.degrees ?? 0,
                    cost: editProducts?.cost ?? 0,
                    isSample: editProducts?.isSample ?? "false",
                    image: editProducts?.image ?? [],
                    reference: editProducts?.reference ?? [],
                    price1: editProducts?.price1 ?? 0,
                    price2: editProducts?.price2 ?? 0,
                    price3: editProducts?.price3 ?? 0,
                    price4: editProducts?.price4 ?? 0,
                    active: editProducts?.active ?? true,
                    branchId: editProducts?.branchId[0] ?? 0,
                    vendorId: editProducts?.vendorId[0] ?? 0
                }}
                validationSchema={validationSchema}
            onSubmit={(valores) => {
                setPendingButton(true);
                valores.image = imageArrBack
                let fechaUTC = valores.dateExpiration === "" ? null : new Date(valores.dateExpiration).toISOString();
                valores.dateExpiration = valores.dateExpiration === "" ? expirationNull : fechaUTC
                valores.reference = referenceString.map(item => item.cont)
                valores.isSample = JSON.parse(valores.isSample)
                valores.active = JSON.parse(valores.active)
                valores.branchId = selectSucursal.map(item => item.id)
                valores.vendorId = selectProveedor.map(item => item.id)
                valores.idCategory = parseInt(valores.idCategory)
                valores.idCapacity = parseInt(valores.idCapacity)
                valores.isTransformer = addTransform
                ProductSubmit(valores);
            }}
            >{({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 md:gap-6 ">
                    <div className="col-span-full flex flex-col gap-4 items-center gap-x-8 mb-5">
                        <Image
                            src="https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg"
                            alt=""
                            width={100}
                            height={100}
                            className="h-24 w-24 flex-none rounded-lg bg-gray-800"
                            priority
                        />
                        <div>
                            <input
                                type="file"
                                onChange={(e) => {
                                    setImageArr(prev => [...prev, e.target.files[0]])
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file)
                                    reader.onload = () => {
                                        setImageArrBack(prev => [...prev, {
                                            fileName: file.name,
                                            base64: reader.result,
                                            url: ""
                                        }])
                                    }
                                }}

                            />
                            {imageArr && <div className="flex gap-2">{imageArr.map((image, id) => (<ImagePrewie key={id} file={image} />))}</div>}

                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="code" className="block text-sm font-medium leading-6 text-slate-400">
                            SKU del Producto*
                        </label>
                        <div className="mt-2">
                            <Field
                                type="text"
                                name="code"
                                id="code"
                                disabled={ !!editProducts }
                                className={`block w-full disabled:bg-slate-100 rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.code && touched.code && 'border-Rojo'}`}
                            />
                        </div>
                        {
                            errors.code && touched.code && <div>
                                <p>{errors.code}</p>
                            </div>
                        }
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
                                className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.name && touched.name && 'border-Rojo'}`}
                            />
                        </div>
                        {
                            errors.name && touched.name && <div>
                                <p>{errors.name}</p>
                            </div>
                        }
                    </div>

                    <div className="">
                        <label htmlFor="descrip" className="block text-sm font-medium leading-6 text-slate-400">
                            Descripcion
                        </label>
                        <div className="mt-2">
                            <Field
                                id="descrip"
                                name="descrip"
                                type="text"
                                className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.descrip && touched.descrip && 'border-Rojo'}`}
                            />
                        </div>
                        {
                            errors.descrip && touched.descrip && <div>
                                <p>{errors.descrip}</p>
                            </div>
                        }
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="dateExpiration" className="block text-sm font-medium leading-6 text-slate-400">
                            Sucursales
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                <Field
                                    as="select"
                                    id="branchId"
                                    onChange={(e) => {
                                        if (e.target.value !== "0") {
                                            setSelectSucursal(prev => [
                                                ...prev,
                                                dataSucursalList.find( item => item.id == e.target.value )
                                            ]);
                                            setDataSucursalList(prev => prev.filter(el => el.id != e.target.value));
                                            handleChange(e)
                                        } else {
                                            return
                                        }

                                    }}
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.dateExpiration && touched.dateExpiration && 'border-Rojo'}`}
                                >   <option value="0">--</option>
                                    { dataSucursalList.length > 0 && dataSucursalList.filter( item => !selectSucursal.map( el => el.id ).includes(item.id) ).map(el => (<option value={el.id} key={el.id}>{el.name}</option>))}</Field>
                            </div>
                        </div>
                        {selectSucursal && <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 my-4">
                            {
                                selectSucursal.map(surc => (<div className="flex justify-between gap-4" key={surc.id}>
                                    <p>{surc.name}</p>
                                    <button
                                        onClick={() => { setSelectSucursal(prev => prev.filter(el => el.id !== surc.id)); setDataSucursalList(prev => [...prev, surc]) }}
                                        className='bg-negro text-rojo-pantone px-2 py-1 rounded-md hover:bg-red-600'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>))
                            }

                        </div>}
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="dateExpiration" className="block text-sm font-medium leading-6 text-slate-400">
                            Proveedores
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                <Field
                                    as="select"
                                    id="vendorId"
                                    onChange={(e) => {
                                        if (e.target.value !== "") {
                                            setSelectProveedor(prev => [
                                                ...prev,
                                                dataProveedor.find( item => item.id==e.target.value )
                                            ]);
                                            setDataProveedor(prev => prev.filter(el => el.id != e.target.value ));
                                            handleChange(e)
                                        } else {
                                            return
                                        }

                                    }}
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.dateExpiration && touched.dateExpiration && 'border-Rojo'}`}
                                >   <option value={"0"}>--</option>
                                    { dataProveedor.length > 0 && dataProveedor.filter( item => !selectProveedor.map( el => el.id ).includes(item.id) ).map(el => (<option value={el.id} key={el.id}>{el.name}</option>))}</Field>
                            </div>
                        </div>
                        {selectProveedor && <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 my-4">
                            {
                                selectProveedor.map(pro => (<div className="flex justify-between gap-2" key={pro.id}>
                                    <p>{pro.name}</p>
                                    <button
                                        onClick={() => { setSelectProveedor(prev => prev.filter(el => el.id !== pro.id)); setDataProveedor(prev => [...prev, pro]) }}
                                        className='bg-negro text-rojo-pantone px-2 py-1 rounded-md hover:bg-red-600'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>))
                            }

                        </div>}
                    </div>

                    {/* <div className="">
                        <label htmlFor="degrees" className="block text-sm font-medium leading-6 text-slate-400">
                            Grados Alcoholicos
                        </label>
                        <div className="mt-2">
                            <Field
                                type="number"
                                onWheel={ e => e.currentTarget.blur() }
                                name="degrees"
                                id="degrees"
                                className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.degrees && touched.degrees && 'border-Rojo'}`}
                            />
                        </div>
                    </div> */}
                     <div className="">
                        <label htmlFor="cost" className="block text-sm font-medium leading-6 text-slate-400">
                            Costo*
                        </label>
                        <div className="mt-2">
                            <Field
                                type="number"
                                onWheel={ e => e.currentTarget.blur() }
                                name="cost"
                                id="cost"
                                className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.cost && touched.cost && 'border-Rojo border'}`}
                            />
                        </div>
                        {
                            errors.cost && touched.cost && <div>
                                {
                                    <p>{errors.cost}</p>
                                }
                            </div>
                        }
                    </div>
                    <div className="">
                        <label htmlFor="idCapacity" className="block text-sm font-medium leading-6 text-slate-400">
                            Capacidad
                        </label>
                        <div className="mt-2">
                            <Field
                                as="select"
                                name="idCapacity"
                                id="idCapacity"
                                className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.amount && touched.amount && 'border-Rojo'}`}
                            >
                                <option value={"0"}>No Aplica</option>
                                <option value={"5000 kw"}>5000 kw</option>
                            </Field>
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="idCategory" className="block text-sm font-medium leading-6 text-slate-400">
                            Categoria
                        </label>
                        <div className="mt-2">
                            <Field
                                as="select"
                                name="idCategory"
                                id="idCategory"
                                className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.amount && touched.amount && 'border-Rojo'}`}
                            >
                                <option value={"0"}>--</option>
                                {
                                   dataCategory.length > 0 && dataCategory?.map((el, id) => (<option key={id} value={el.id}>{el.name}</option>))
                                }
                            </Field>
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="price1" className="block text-sm font-medium leading-6 text-slate-400">
                            Precio 1*
                        </label>
                        <div className="mt-2">
                            <Field
                                type="number"
                                onWheel={ e => e.currentTarget.blur() }
                                name="price1"
                                id="price1"
                                className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm  ${errors.price1 && touched.price1 && 'border-Rojo'}`}
                            />
                        </div>
                        {
                            errors.price1 && touched.price1 && <div>
                                <p>{errors.price1}</p>
                            </div>
                        }
                    </div>
                    <div className="">
                        <label htmlFor="price2" className="block text-sm font-medium leading-6 text-slate-400">
                            Precio 2
                        </label>
                        <div className="mt-2">
                            <Field
                                type="number"
                                onWheel={ e => e.currentTarget.blur() }
                                name="price2"
                                id="price2"
                                className={`block w-full rounded-md px-4 bg-slate-200 py-1.5 text-black shadow-sm `}
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
                                    pendingButton ? <LoaderButton/> : 'Agregar'
                                }
                            </button>
                        </div>
                    </div>

                </form>
            )
            }</Formik >
        </div >

    )
}