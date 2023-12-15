'use client'
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import ImagePrewie from "./ImagePrewie";
import useFront from "@/hooks/useFront";
import Image from "next/image";


export default function FormEditProducts({ setAgregarProductos, editProducts }) {
    const { dataSucursal,
        dataVendor,
        dataCategory,
        ProductSubmit } = useFront()
    // const userString = localStorage.getItem("UserData");
    //const UserDataJson = JSON.parse(userString);
    const [imageArr, setImageArr] = useState([]);
    const [imageArrBack, setImageArrBack] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [referenceString, setReferenceString] = useState([]);
    const [dataSucursalList, setDataSucursalList] = useState([]);
    const [dataProveedor, setDataProveedor] = useState([]);
    const [selectSucursal, setSelectSucursal] = useState([]);
    const [selectProveedor, setSelectProveedor] = useState([]);
    const [auxBranch, setAuxBranch] = useState([])
    const expirationNull = null

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

    function buscarProveedoresPorIDs(ids) {
        const proveedoresEncontrados = [];
        if (ids?.length > 0) {
            for (const id of ids) {
                const proveedorEncontrado = dataVendor.find(sucursal => sucursal.id === id);
                if (proveedorEncontrado) {
                    proveedoresEncontrados.push(proveedorEncontrado);
                }
            }

        }
        return proveedoresEncontrados;
    }

    function filtrarProveedoresPorIDs(ids) {
        const proveedoresFiltrados = [];
        if (ids?.length > 0) {
            for (const id of ids) {
                const proveedorFiltrado = dataVendor.filter(vendor => !ids.includes(vendor.id));
                if (proveedorFiltrado) {
                    proveedoresFiltrados.push(proveedorFiltrado);
                }
            }

        }

        return proveedoresFiltrados[0];
    }





    useEffect(() => {
        setAuxBranch(dataSucursal)
        console.log(editProducts)
    }, [])

    useEffect(() => {
        if(editProducts?.reference !== null){
            setReferenceString(editProducts?.reference?.map((el, id) => ({
                id: id,
                cont: el
            })))
        }
        if (editProducts?.branchId === null) {
            setDataSucursalList(dataSucursal)
        } else {
            setSelectSucursal(buscarSucursalesPorIDs(editProducts?.branchId))
            setDataSucursalList(filtrarSucursalesPorIDs(editProducts?.branchId))
        }
        if (editProducts?.vendorId === null) {
            setDataProveedor(dataVendor)
        } else {
            setSelectProveedor(buscarProveedoresPorIDs(editProducts?.vendorId))
            setDataProveedor(filtrarProveedoresPorIDs(editProducts?.vendorId));
        }

    }, [auxBranch])

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputValue("");
        const obj = {
            id: referenceString?.length + 1,
            cont: inputValue
        }
        setReferenceString(prev => [...prev, obj])
    };



    return (

        <div className="w-full">
            <div className="my-5">
                <label htmlFor="reference" className="block text-sm font-medium leading-6 text-slate-400">
                    Referencia
                </label>
                <div className="mt-2">
                    <div>
                        <form className="flex gap-2 py-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="reference"
                                id="reference"
                                value={inputValue}
                                onChange={handleInputChange}
                                className="block w-1/2 rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"

                            />
                            <button type="submit" className=" bg-rojo-pantone px-4 py-2.5 text-sm font-semibold rounded-md text-BlancoIvory shadow-sm hover:bg-opacity-25 ">Agregar Referencia</button>
                        </form>
                        {
                            referenceString?.length > 0 ?
                                <>
                                    {<h2 className="block text-sm font-medium leading-6 text-slate-400">Referencias del producto</h2>}
                                    <div className="grid grid-cols-2 gap-y-4 lg:grid-cols-3 my-4">

                                        {referenceString?.map((ref) => (

                                            <div key={ref.id} className="flex gap-2">
                                                <p >
                                                    {ref.cont}
                                                </p>
                                                <button
                                                    onClick={() => setReferenceString(prev => prev.filter(el => el.id !== ref.id))}
                                                    className='bg-negro text-rojo-pantone px-2 py-1 rounded-md hover:bg-red-600'
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))

                                        }</div>
                                </> : <h1>Asigna las referencias del producto</h1>
                        }
                    </div>
                </div>
            </div>
            <Formik
                initialValues={{
                    id: editProducts.id,
                    idCategory: JSON.stringify(editProducts.idCategory),
                    code: editProducts.code,
                    name: editProducts.name,
                    descrip: editProducts.descrip,
                    dateExpiration: editProducts.dateExpiration,
                    degrees: editProducts.degrees,
                    price1: editProducts.price1,
                    price2: editProducts.price2,
                    price3: editProducts.price3,
                    price4: editProducts.price4,
                    cost: editProducts.cost,
                    isSample: JSON.stringify(editProducts.isSample),
                    image: [],
                    isFavorite: editProducts.isFavorite,
                    branchId: [],
                    vendorId: [],
                    reference: editProducts?.reference,
                    active: JSON.stringify(editProducts.active)
                }}
                onSubmit={(valores) => {
                    valores.convertCurrency = editProducts?.convertCurrency
                    valores.image = imageArrBack
                    let fechaUTC = valores.dateExpiration === "" ? null : new Date(valores.dateExpiration).toISOString();
                    valores.dateExpiration = valores.dateExpiration === "" ? expirationNull : fechaUTC
                    valores.reference = referenceString?.map(item => item.cont)
                    valores.isSample = JSON.parse(valores.isSample)
                    valores.active = JSON.parse(valores.active)
                    valores.branchId = selectSucursal?.map(item => item.id)
                    valores.vendorId = selectProveedor?.map(item => item.id)
                    valores.idCategory = parseInt(valores.idCategory)
                    console.log(valores)
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
                            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                            priority
                        />
                        <div>
                            <input
                                type="file"
                                name="image"
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
                            SKU del Producto
                        </label>
                        <div className="mt-2">
                            <Field
                                type="text"
                                name="code"
                                id="code"
                                className="block w-full rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-400">
                            Nombre del Producto
                        </label>
                        <div className="mt-2">
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
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
                                className="block w-full rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* <div className="">
                        <label htmlFor="dateExpiration" className="block text-sm font-medium leading-6 text-slate-400">
                            Fecha de Vencimiento
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                <Field
                                    type="date"
                                    name="dateExpiration"
                                    id="dateExpiration"
                                    className="block w-full rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div> */}
                    <div className="col-span-full">
                        <label htmlFor="dateExpiration" className="block text-sm font-medium leading-6 text-slate-400">
                            Sucursales
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                <Field
                                    as="select"
                                    name="branchId"
                                    id="branchId"
                                    onChange={(e) => {
                                        if (e.target.value !== "") {
                                            setSelectSucursal(prev => [...prev, JSON.parse(e.target.value)]);
                                            setDataSucursalList(prev => prev.filter(el => el.id !== JSON.parse(e.target.value).id));
                                        } else {
                                            return
                                        }

                                    }}
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.dateExpiration && touched.dateExpiration && 'border-Rojo'}`}
                                >   <option value="">--</option>
                                    {dataSucursalList?.map(el => (<option value={JSON.stringify(el)} key={el.id}>{el.name}</option>))}</Field>
                            </div>
                        </div>
                        {selectSucursal && <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 my-4">
                            {
                                selectSucursal.map(surc => (<div className="flex justify-between" key={surc.id}>
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
                                    name="branchId"
                                    id="branchId"
                                    onChange={(e) => {
                                        if (e.target.value !== "") {
                                            setSelectProveedor(prev => [...prev, JSON.parse(e.target.value)]);
                                            setDataProveedor(prev => prev.filter(el => el.id !== JSON.parse(e.target.value).id));
                                        } else {
                                            return
                                        }

                                    }}
                                    className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.dateExpiration && touched.dateExpiration && 'border-Rojo'}`}
                                >   <option value="">--</option>
                                    {dataProveedor?.map(el => (<option value={JSON.stringify(el)} key={el.id}>{el.name}</option>))}</Field>
                            </div>
                        </div>
                        {selectProveedor && <div className="grid grid-cols-2 gap-y-4 lg:grid-cols-3 my-4">
                            {
                                selectProveedor.map(pro => (<div className="flex gap-4" key={pro.id}>
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
                                onWheel={e => e.currentTarget.blur()}
                                name="degrees"
                                id="degrees"
                                className="block w-full rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm  ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div> */}
                    <div className="">
                        <label htmlFor="cost" className="block text-sm font-medium leading-6 text-slate-400">
                            Costo
                        </label>
                        <div className="mt-2">
                            <Field
                                type="number"
                                onWheel={e => e.currentTarget.blur()}
                                name="cost"
                                id="cost"
                                className="block w-full rounded-md border-0 bg-slate-200 py-1.5 text-black shadow-sm ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* <div className="">
                        <label htmlFor="isSample" className="block text-sm font-medium leading-6 text-slate-400">
                            Es Muestra?
                        </label>
                        <div className="flex gap-20 mt-5">
                            <label>
                                <Field type="radio" name="isSample" value="true" />
                                Sí
                            </label>
                            <label>
                                <Field type="radio" name="isSample" value="false" />
                                No
                            </label>
                        </div>
                    </div> */}
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
                                    dataCategory?.map((el, id) => (<option key={id} value={el.id}>{el.name}</option>))
                                }
                            </Field>
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="price1" className="block text-sm font-medium leading-6 text-slate-400">
                            Precio 1
                        </label>
                        <div className="mt-2">
                            <Field
                                type="number"
                                onWheel={e => e.currentTarget.blur()}
                                name="price1"
                                id="price1"
                                className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.amount && touched.amount && 'border-Rojo'}`}
                            />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="price2" className="block text-sm font-medium leading-6 text-slate-400">
                            Precio 2
                        </label>
                        <div className="mt-2">
                            <Field
                                type="number"
                                onWheel={e => e.currentTarget.blur()}
                                name="price2"
                                id="price2"
                                className={`block w-full rounded-md  bg-slate-200 py-1.5 text-black shadow-sm ${errors.amount && touched.amount && 'border-Rojo'}`}
                            />
                        </div>
                    </div>
                    <div className='col-span-full'>
                        <div className='w-full flex items-center justify-end'>
                            <button
                                type="submit"
                                className=" bg-rojo-pantone px-4 py-2.5 text-sm font-semibold rounded-md text-BlancoIvory shadow-sm hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Agregar
                            </button>
                        </div>
                    </div>

                </form>
            )
                }</Formik >
        </div>

    )
}