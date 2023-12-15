'use client'
import { useState, useEffect, createContext } from "react";
import { usePathname, useRouter } from 'next/navigation'
import {
    CogIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'
import {

    ClockIcon,
    CreditCardIcon,

    ScaleIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline'
import { toast as toastProvider } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const FrontContext = createContext();



const FrontProvider = ({ children }) => {
    const [prueba, setPrueba] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dataUser, setDataUser] = useState(false)
    const [totales, setTotales] = useState(false)
    const [totalesFront, setTotalesFront] = useState(false)
    const formikReference = null
    const pathname = usePathname();
    const router = useRouter()
    const [navigation, setNavigation] = useState([])
    const [dataSucursal, setDataSucursal] = useState(null);
    const [dataVendor, setDataVendor] = useState(null);
    const [dataCategory, setDataCategory] = useState(null);
    const [dataClient, setDataClient] = useState(null);
    const [dataUsers, setDataUsers] = useState(null);
    const [dataHome, setDataHome] = useState(null)
    const [dataSalesDay, setDataSalesDay] = useState([])
    const [dataProducts, setDataProducts] = useState(null);
    const [dataProductsClient, setDataProductsClient] = useState(null);
    const [dataProductsSales, setDataProductsSales] = useState(null)
    const [dataRposicionList, setDataRposicionList] = useState([])
    const [agregarProductos, setAgregarProductos] = useState(false);
    const [agregarUsuario, setAgregarUsuario] = useState(false);
    const [agregarSucursal, setAgregarSucursal] = useState(false);
    const [agregarClientes, setAgregarClientes] = useState(false);
    const [agregarCategorias, setAgregarCategorias] = useState(false);
    const [agregarProveedores, setAgregarProveedores] = useState(false);
    const [agregarCompra, setAgregarCompra] = useState(false);
    const [aux, setAux] = useState(0)
    const [auxCache, setAuxCache] = useState(0)
    const [auxListUsers, setAuxListUsers] = useState(0);
    const [auxListSucursal, setAuxListSucursal] = useState(0);
    const [auxListProduct, setAuxListProduct] = useState(0);
    const [auxListCliente, setAuxListCliente] = useState(0);
    const [auxListCategoria, setAuxListCategoria] = useState(0);
    const [auxListProveedor, setAuxListProveedor] = useState(0);
    const [auxOrderTab, setAuxOrderTab] = useState(0);
    const [pending, setPending] = useState(true);
    const [dataInventario, setDataInventario] = useState(null)
    const [dataOrder, setDataOrder] = useState(null);
    const [UserDataJson, setUserDataJson] = useState(false);
    const [localStorageReady, setLocalStorageReady] = useState(false);
    const [productSearchRepo, setProductSearchRepo] = useState(null);
    const [suggestedMoney, setSuggestedMoney] = useState(null);
    const [totales2, setTotales2] = useState([]);
    const [dataAudit, setDataAudit] = useState(false)


    const [pendingButton, setPendingButton] = useState(false)
    const [screenPending, setScreenPending] = useState(false)

    const [openModalSucces, setOpenModalSucces] = useState(false)
    const [lastFactor, setLastFactor] = useState(null);

    const [started, setStarted] = useState(false)

    const toast = {
        ...toastProvider,
        error: (...args) => {
            if(started) toastProvider.error(...args)
        }
    }


    const urlBase = process.env.API_URL

    const fechaActual = new Date();

    const unaSemanaAtras = new Date();
    unaSemanaAtras.setDate(fechaActual.getDate() - 7);
    const fechaActualISO = fechaActual.toISOString();
    const unaSemanaAtrasISO = unaSemanaAtras.toISOString();
    const unMesAtras = new Date();
    unMesAtras.setDate(fechaActual.getDate() - 30);
    const unMesAtrasISO = unMesAtras.toISOString();
    const unAñoAtras = new Date();
    unAñoAtras.setDate(fechaActual.getDate() - 365);
    const unAñoAtrasISO = unAñoAtras.toISOString();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userString = localStorage.getItem('UserData');
            const parsedUserData = JSON.parse(userString);
            if (userString !== null) {
                setUserDataJson(parsedUserData);
                setAux(prev => prev + 1);
                setDataUser(true)
                setLocalStorageReady(true);
            } else {
                setLocalStorageReady(true);
            }
        }
    }, [auxCache])


    useEffect(() => {
        const sideBarUser = () => {
            if (UserDataJson?.idType === 99) {
                setNavigation([
                    { name: 'Inicio', href: '/Home', icon: HomeIcon, idType: 99 },
                    { name: 'Reposicion', href: '/Compra', icon: ClockIcon, idType: 99 },
                    { name: 'Ventas', href: '/Ventas', icon: ScaleIcon, idType: 99 },
                    { name: 'Pedido', href: '/Pedido', icon: CreditCardIcon, idType: 99 },
                    { name: 'Inventario', href: '/Inventario', icon: UserGroupIcon, idType: 99 },
                    // { name: 'Reporte', href: '/Reporte', icon: DocumentChartBarIcon, current: false },
                    { name: 'Configuracion', href: '/Configuracion', icon: CogIcon, idType: 2 }
                ])

            } else if (UserDataJson?.idType === 2) {
                setNavigation([
                    { name: 'Inicio', href: '/Home', icon: HomeIcon, idType: 99 },
                    { name: 'Conciliar Productos', href: '/Ventas', icon: ScaleIcon, idType: 99 },
                    { name: 'Pedido', href: '/Pedido', icon: CreditCardIcon, idType: 99 }
                    // { name: 'Reporte', href: '/Reporte', icon: DocumentChartBarIcon, current: false },

                ])

            } else {
                setNavigation([
                    { name: 'Inicio', href: '/Home', icon: HomeIcon, idType: 99 },
                    { name: 'Ventas', href: '/Ventas', icon: ScaleIcon, idType: 99 },
                    { name: 'Pedido', href: '/Pedido', icon: CreditCardIcon, idType: 99 },
                    { name: 'Inventario', href: '/Inventario', icon: UserGroupIcon, idType: 99 },
                    // { name: 'Reporte', href: '/Reporte', icon: DocumentChartBarIcon, current: false },

                ])

            }

        }
        sideBarUser();


    }, [UserDataJson])


    const login = async (valores) => {
        let config = {
            auth: {
                username: process.env.TOKEN_PROD,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/login`, valores, config);
            console.log( data )
            if (data.data) {
                setScreenPending(true);
                setDataUser(data.data)
                toast.success(`Bienvenido ${data?.data?.userName}`)
            }
        } catch (error) {
            console.log( error )
            toast.error(error?.response?.data?.message)
        }
    };

    useEffect(() => {
        let arr = dataUser && Object.keys(dataUser).length

        if ((dataUser) && (arr > 0)) {
            const dataUserString = JSON.stringify(dataUser);
            localStorage.setItem("UserData", dataUserString);
            setAuxCache(prev => prev + 1)
        }

    }, [dataUser])

    const logout = () => {
        setDataHome([]);
        setDataProducts([]);
        setDataProductsSales([]);
        setDataProductsClient([]);
        setDataOrder([]);
        setDataUser(false);
        localStorage.clear();
        router.push('/');
    };

    console.log(UserDataJson)

    const ProductFavoriteSubmit = async (prod) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: prod.id,
            idCategory: prod.idCategory,
            code: prod.code,
            name: prod.name,
            descrip: prod.descrip,
            isFavorite: !prod.isFavorite,
            dateExpiration: prod.dateExpiration,
            degrees: prod.degrees,
            price1: prod.price1,
            price2: prod.price2,
            price3: prod.price3,
            price4: prod.price4,
            cost: prod.cost,
            isSample: prod.isSample,
            image: prod.image,
            reference: prod.reference,
            active: prod.active,
            branchId: prod.branchId,
            vendorId: prod.vendorId
        }
        try {
            const { data } = await axios.post(`${urlBase}/product/post`, valores, config);
            setAux(prev => prev + 1);
            toast.success('Producto Actualizado Exitosamente')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const ProductActiveSubmit = async (obj) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: obj.id,
            idCategory: obj.idCategory,
            code: obj.code,
            name: obj.name,
            descrip: obj.descrip,
            isFavorite: obj.isFavorite,
            dateExpiration: obj.dateExpiration,
            degrees: obj.degrees,
            price1: obj.price1,
            price2: obj.price2,
            price3: obj.price3,
            price4: obj.price4,
            cost: obj.cost,
            isSample: obj.isSample,
            image: obj.image,
            reference: obj.reference,
            active: !obj.active,
            branchId: obj.branchId,
            vendorId: obj.vendorId
        }
        try {
            const { data } = await axios.post(`${urlBase}/product/post`, valores, config);
            GetListProduct()
            toast.success(`Producto ${obj.active ? 'Desactivado' : 'Activado'} Exitosamente`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const GetListSucursal = async (value="") => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            Search: value
        }

        try {
            const { data } = await axios.post(`${urlBase}/branch/getlist`, valores, config);
            if(UserDataJson?.idType === 1){
                const branchData = data.data
                setDataSucursal(branchData.filter(el=> UserDataJson?.branchId.includes(el.id)))
                
            } else {
                setDataSucursal(data.data)
            }
            
        }
        catch (error) {
            setDataSucursal([])
        }
    }

    const GetListVendor = async (value="") => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            Search: value
        }

        try {
            const { data } = await axios.post(`${urlBase}/vendor/getlist`, valores, config);
            setDataVendor(data.data)
        }
        catch (error) {
            setDataVendor([])
        }
    }

    const GetListCategory = async (value="") => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            Search: value
        }

        try {
            const { data } = await axios.post(`${urlBase}/category/getlist`, valores, config);
            setDataCategory(data.data)
        }
        catch (error) {
            setDataCategory([])
        }
    }

    const ProductSubmit = async (valores) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/product/post`, valores, config);
            setAgregarProductos(false);
            setPendingButton(false)
            GetListProduct()
            toast.success('Producto Registrado Exitosamente')
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setPendingButton(false);
        }
    }

    const CategorySubmit = async (valores) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/category/post`, valores, config);
            setAgregarCategorias(false);
            setPendingButton(false);
            GetListCategory()
            toast.success('Categoria Registrada Exitosamente')

        } catch (error) {
            toast.error(error.response.data.message)
            setPendingButton(false)
        }
    }

    const CategoryActiveSubmit = async (obj) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };

        let valores = {
            id: obj.id,
            code: obj.code,
            name: obj.name,
            descrip: obj.descrip,
            active: !obj.active
        }
        try {
            const { data } = await axios.post(`${urlBase}/category/post`, valores, config);
            toast.success(`Categoria ${obj.active ? 'Desactivada' : 'Activada'} Exitosamente`)
            GetListCategory()

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const ClientSubmit = async (valores) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/client/post`, valores, config);
            setAgregarClientes(false);
            setPendingButton(false);
            toast.success('Cliente registrado Exitosamente')
            GetListClient();

        } catch (error) {
            toast.error(error.response.data.message)
            setPendingButton(false);
        }
    }

    const ClientActiveSubmit = async (obj) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };

        let valores = {
            id: obj.id,
            identification: obj.identification,
            name: obj.name,
            descrip: obj.descrip,
            address: obj.address,
            active: !obj.active
        }
        try {
            const { data } = await axios.post(`${urlBase}/client/post`, valores, config);
            GetListClient();
            toast.success(`Cliente ${obj.active ? 'Desactivado' : 'Activado'} Exitosamente`)

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const VendorSubmit = async (valores) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/vendor/post`, valores, config);
            setAgregarProveedores(false);
            setPendingButton(false);
            toast.success('Proveedor registrado exitosamente')
            GetListVendor()

        } catch (error) {
            toast.error(error.response.data.message)
            setPendingButton(false);
        }

    }

    const VendorActiveSubmit = async (obj) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {

            id: obj.id,
            code: obj.code,
            name: obj.name,
            descrip: obj.descrip,
            active: !obj.active

        }
        try {
            const { data } = await axios.post(`${urlBase}/vendor/post`, valores, config);
            GetListVendor()
            toast.success(`Proveedor ${obj.active ? 'Desactivado' : 'Activado'} exitosamente`)

        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    const UserSubmit = async (valores) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/user/post`, valores, config);
            toast.success('Usuario Registrado con Exito')
            setAgregarUsuario(false);
            GetListUsers()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const UserActiveSubmit = async (obj) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };

        let valores = {
            id: obj.id,
            IdType: obj.idType,
            UserName: obj.userName,
            PassW: obj.passW,
            Name: obj.name,
            Email: obj.email,
            Image: obj.image,
            Permissions: obj.permissions,
            branchId: obj.branchId,
            idClient: obj.idClient,
            Active: !obj.active,
            Pin: obj.pin
        }
        try {
            const { data } = await axios.post(`${urlBase}/user/post`, valores, config);
            toast.success(`Usuario ${obj.active ? 'Desactivado' : 'Activado'} exitosamente`)
            GetListUsers()

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const GetListClient = async (value="") => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            Search: value
        }

        try {
            const { data } = await axios.post(`${urlBase}/client/getlist`, valores, config);
            setDataClient(data.data)
        }
        catch (error) {
            setDataClient([])
        }
    }

    const SucursalSubmit = async (valores) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/branch/post`, valores, config);
            setAgregarSucursal(false);
            setPendingButton(false)
            GetListSucursal()
            toast.success('Sucursal registrada Exitosamente');


        } catch (error) {
            toast.error(error.response.data.message)
            setPendingButton(false)
        }
    }

    const SucursalActiveSubmit = async (obj) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };

        let valores = {
            id: obj.id,
            code: obj.code,
            name: obj.name,
            descrip: obj.descrip,
            address: obj.address,
            country: obj.country,
            state: obj.state,
            city: obj.city,
            active: !obj.active
        }
        try {
            const { data } = await axios.post(`${urlBase}/branch/post`, valores, config);
            GetListSucursal();
            toast.success(`Sucursal ${obj.active ? 'Desactivado' : 'Activado'} Exitosamente`)

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const GetListUsers = async (value) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            idType: 0,
            Search: value
        };

        try {
            const { data } = await axios.post(`${urlBase}/user/getlist`, valores, config);
            console.log( 'users', data )
            setDataUsers(data.data);
        }
        catch (error) {
            console.log( 'users murio' )
            setDataUsers([])
        }
    }

    const GetListProduct = async () => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            idType: 0,
            Search: ""
        }

        try {
            const { data } = await axios.post(`${urlBase}/product/getlist`, valores, config);
            setDataProducts(data.data)
            setProductSearchRepo(data.data)
            setPending(false)
        } catch (error) {
            setDataProducts([])
            setProductSearchRepo([])
            setPending(false)
        }
    }

    const GetSearchListProduct = async (busqueda) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            idType: 0,
            Search: busqueda
        }

        try {
            const { data } = await axios.post(`${urlBase}/product/getlist`, valores, config);
            setProductSearchRepo(data.data)
            setPending(false)
        } catch (error) {
            setPending(false)
        }
    }

    const GetListInventario = async () => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            code: "",
            product: "",
            reference: "",
            idCategory: 0,
            category: "",
            idBranch: 0,
            branch: "",
            idVendor: 0,
            vendor: "",
            limit: 0
        }

        try {
            const { data } = await axios.post(`${urlBase}/product/detail/getlist`, valores, config);
            console.log( 'inventario', data )
            setDataInventario(data.data);
        }
        catch (error) {
            console.log('inventario', error)
            setDataInventario([])
        }
    }

    const GetProductsSales = async (branchId) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            code: "",
            product: "",
            reference: "",
            idCategory: 0,
            category: "",
            idBranch: parseInt(branchId),
            branch: "",
        }

        try {
            const { data } = await axios.post(`${urlBase}/product/detail/getlist`, valores, config);
            setDataProductsSales(data.data);
        }
        catch (error) {
            setDataProductsSales([]);
        }
    }

    const GetListOrderAdmin = async (status) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            dateStart: unaSemanaAtrasISO,  
            dateEnd: fechaActualISO,
            id: 0,
            code: "", 
            product: "" , 
            reference: "" , 
            idCategory: 0, 
            category: "",
            idType: 0,
            branch: "",
            idClient: 0,
            client: "",   
            idBranch: 0,
            qtyReg: 0,
            ok: status
        }

        try {
            const { data } = await axios.post(`${urlBase}/order/getlist`, valores, config);
            setDataOrder(data.data)
        } catch (error) {
            setDataOrder([])
        }

}

    const GetListOrderBranch = async (status) => {
            let config = {
                auth: {
                    username: UserDataJson?.token,
                    password: ''
                }
            };
            let valores = {
                dateStart: unaSemanaAtrasISO,  
                dateEnd: fechaActualISO,
                id: 0,
                code: "", 
                product: "" , 
                reference: "" , 
                idCategory: 0, 
                category: "",  
                idBranch: 0, 
                ok: status
            }

            try {
                const { data } = await axios.post(`${urlBase}/order/getlistbybranch`, valores, config);
                setDataOrder(data.data)
            } catch (error) {
                toast.error(error?.response?.data?.message);
                setDataOrder([])
            }
    }

    const GetListOrderClient = async (status) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            dateStart: unaSemanaAtrasISO,
            dateEnd: fechaActualISO,
            id: 0,
            code: "",
            product: "" , 
            reference: "" ,
            idCategory: 0,
            category: "", 
            qtyReg: 0,
            ok: status
        }

        try {
            const { data } = await axios.post(`${urlBase}/order/getlistbyclient`, valores, config);
            setDataOrder(data.data)
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setDataOrder([])
        }
}


const GetListConciliationClient = async (status) => {
    let config = {
        auth: {
            username: UserDataJson?.token,
            password: ''
        }
    };
    let valores = {
        code: "",
        product: "" , 
        reference: "" ,
        idCategory: 0,
        category: "",
    }

    try {
        const { data } = await axios.post(`${urlBase}/conciliation/getitembyclient`, valores, config);
        setDataProductsClient(data.data)
    } catch (error) {
        setDataProductsClient([])
        toast.error(error?.response?.data?.message);
    }
}

const GetListConciliationAdmin = async () => {
    let config = {
        auth: {
            username: UserDataJson?.token,
            password: ''
        }
    };
    let valores = {
        dateStart: unAñoAtrasISO, 
        dateEnd: fechaActualISO, 
        id: 0,
        code: "", 
        product: "" ,
        reference: "" , 
        idCategory: 0,
        category: "",
        idType: 0,
        idClient: 0, 
        client: "", 
        qtyReg: 0,
        ok: false
    }

    try {
        const { data } = await axios.post(`${urlBase}/conciliation/getconciliationbyadmin`, valores, config);
        setDataInventario(data.data)
    } catch (error) {
    }
}

const GetListConciliationSearchAdmin = async (cliente,producto) => {
    let config = {
        auth: {
            username: UserDataJson?.token,
            password: ''
        }
    };
    let valores = {
        dateStart: unAñoAtrasISO, 
        dateEnd: fechaActualISO, 
        id: 0,
        code: "", 
        product: producto,
        reference: "" , 
        idCategory: 0,
        category: "",
        idType: 0,
        idClient: 0, 
        client: cliente, 
        qtyReg: 0,
        ok: false
    }

    try {
        const { data } = await axios.post(`${urlBase}/conciliation/getconciliationbyadmin`, valores, config);
        setDataInventario(data.data)
        toast.success("Busqueda realizada con exito");
    } catch (error) {
        setDataInventario([]);
        toast.error(error?.response?.data?.message);
    }
}

const GetSearchOrderAdmin = async (desde, hasta, nameProduct, idBranch, status, clientName, orderId) => {
    let fechaDesdeValid
        let fechaHastaValid
        if (desde === "") {
            fechaDesdeValid = null
        } else {
            let fechaDesde = new Date(desde);
            fechaDesdeValid = fechaDesde.toISOString()
        }
        if (hasta === "") {
            fechaHastaValid = null
        } else {
            let fechaHasta = new Date(hasta);
            fechaHastaValid = fechaHasta.toISOString()
        }
    let config = {
        auth: {
            username: UserDataJson?.token,
            password: ''
        }
    };
    let valores = {
        dateStart: fechaDesdeValid,  
        dateEnd: fechaHastaValid,
        id: orderId === "" ? 0 : parseInt(orderId),
        code: "", 
        product: nameProduct , 
        reference: "" , 
        idCategory: 0, 
        category: "",
        idType: 0,
        branch: "",
        idClient: 0,
        client: clientName,   
        idBranch: idBranch,
        qtyReg: 0,
        ok: status
    }

    try {
        const { data } = await axios.post(`${urlBase}/order/getlist`, valores, config);
        setDataOrder(data.data)
    } catch (error) {
        setDataOrder([])
    }

}

const GetSearchOrderClient = async (desde, hasta, nameProduct, idBranch, status) => {
    let fechaDesdeValid
        let fechaHastaValid
        if (desde === "") {
            fechaDesdeValid = null
        } else {
            let fechaDesde = new Date(desde);
            fechaDesdeValid = fechaDesde.toISOString()
        }
        if (hasta === "") {
            fechaHastaValid = null
        } else {
            let fechaHasta = new Date(hasta);
            fechaHastaValid = fechaHasta.toISOString()
        }
    let config = {
        auth: {
            username: UserDataJson?.token,
            password: ''
        }
    };
    let valores = {
        dateStart: fechaDesdeValid,
        dateEnd: fechaHastaValid,
        id: 0,
        code: "",
        product: nameProduct , 
        reference: "" ,
        idCategory: 0,
        category: "", 
        qtyReg: 0,
        ok: status
    }

    try {
        const { data } = await axios.post(`${urlBase}/order/getlistbyclient`, valores, config);
        setDataOrder(data.data)
    } catch (error) {
        toast.error(error?.response?.data?.message);
        setDataOrder([])
    }
}



    const GetSearchOrderBranch = async (desde, hasta, nameProduct, idBranch, status) => {
        let fechaDesdeValid
        let fechaHastaValid
        if (desde === "") {
            fechaDesdeValid = null
        } else {
            let fechaDesde = new Date(desde);
            fechaDesdeValid = fechaDesde.toISOString()
        }
        if (hasta === "") {
            fechaHastaValid = null
        } else {
            let fechaHasta = new Date(hasta);
            fechaHastaValid = fechaHasta.toISOString()
        }
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            dateStart: fechaDesdeValid,  
            dateEnd: fechaHastaValid,
            id: 0,
            code: "", 
            product: nameProduct , 
            reference: "" , 
            idCategory: 0, 
            category: "",  
            idBranch: idBranch, 
            ok: status
        }
        try {
            const { data } = await axios.post(`${urlBase}/order/getlistbybranch`, valores, config);
            setDataOrder(data.data);
            toast.success("Busqueda realizada con exito")
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setDataOrder([]);
        }
    }

    const OrderPost = async (arr,action, actionOne) => {
        let obj = arr.map(el => (
            {
                idProd: el.id,
                idBranch: UserDataJson?.idType === 2 ? 0 : parseInt(JSON.parse(el.idBranch).id),
                qty: parseInt(el.cantidad)
            }
        ))
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/order/post`, obj, config);
            toast.success(`Pedido realizado con exito`)
            action(prev => !prev);
            actionOne(prev => prev + 1);

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const GetListReposicion = async () => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            dateStart: unAñoAtrasISO,
            dateEnd: fechaActualISO,
            id: 0,
            code: "",
            product: "",
            reference: "",
            idCategory: 0,
            category: "",
            idBranch: 0,
            idVendor: 0,
            vendor: "",
            branch: ""
        }

        try {
            const { data } = await axios.post(`${urlBase}/product/replenishment/historical`, valores, config);
            setDataRposicionList(data.data);
        } catch (error) {
            setDataRposicionList([]);
        }
    }

    const GetSearchReposicion = async (desde, hasta, nameProduct, nameBranch) => {
        let fechaDesdeValid
        let fechaHastaValid
        if (desde === "") {
            fechaDesdeValid = null
        } else {
            let fechaDesde = new Date(desde);
            fechaDesdeValid = fechaDesde.toISOString()
        }
        if (hasta === "") {
            fechaHastaValid = null
        } else {
            let fechaHasta = new Date(hasta);
            fechaHastaValid = fechaHasta.toISOString()
        }
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            dateStart: fechaDesdeValid,
            dateEnd: fechaHastaValid,
            id: 0,
            code: "",
            product: nameProduct,
            reference: "",
            idCategory: 0,
            category: "",
            idBranch: 0,
            branch: nameBranch,
        }
        try {
            const { data } = await axios.post(`${urlBase}/product/replenishment/historical`, valores, config);
            setDataRposicionList(data.data);
            toast.success("Busqueda realizada con exito")
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setDataRposicionList([]);
        }
    }
    const GetListSalesDay = async (fechaActual) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            dateStart: fechaActual,
            dateEnd: fechaActual,
            saleId: 0,
            nro: "",
            type: "",
            idBranch: 0,
            codeBranch: "",
            branch: "",
            idClient: 0,
            identification: "",
            client: "",
            userName: ""
        }

        try {
            const { data } = await axios.post(`${urlBase}/sale/getlist`, valores, config);
            setDataSalesDay(data.data);
        } catch (error) {
        }
    }

    const GetAuditUser = async (valores) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/audit`, valores, config);
            setDataAudit(data.data);
            setPendingButton(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setPendingButton(false)
        }
    }

    const GetListSalesDayBranch = async (fechaActual) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            dateStart: fechaActual,
            dateEnd: fechaActual,
            nro: "", 
            type: "", 
            codeBranch: "", 
            branch: "", 
            idClient: 0, 
            identification: "",
            client: "",
       }

        try {
            const { data } = await axios.post(`${urlBase}/sale/getlistbybranch`, valores, config);
            setDataSalesDay(data.data);
        } catch (error) {
        }
    }

    const GetListSalesDayClient = async (fechaActual) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            dateStart: fechaActual,
            dateEnd: fechaActual,
            nro: "",
       }

        try {
            const { data } = await axios.post(`${urlBase}/sale/getlistbyclient`, valores, config);
            setDataSalesDay(data.data);
        } catch (error) {
        }
    }

    const enviarReposicion = async (arr) => {
        let obj = arr.map(el => (
            {
                idProd: el.id,
                idBranch: parseInt(JSON.parse(el.idBranch).id),
                idVendor: parseInt( el.idVendor ),
                qty: parseInt(el.cantidad)
            }
        ))
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/product/replenishment/post`, obj, config);
            setAgregarCompra(false)
            GetListReposicion()
            toast.success('Reposicion completada con Exito')

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const GetHome = async () => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {}
        try {
            const { data } = await axios.post(`${urlBase}/home`, valores, config);
            toast.success("Datos Actualizados con Exito")
            setDataHome(data.data)
        } catch (error) {
            toast.error(error.response.data.message)
            setDataHome({})
        }
    }

    const saleSubmit = async (clientInfo, carrito, totales, pagoTable, priceActive, sucursalActive, currencyActive, closeModalSucces) => {
        let usdConvert = currencyActive === "USD" ?  lastFactor.usd :  lastFactor.eur 

        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            idBranch: sucursalActive,
            qty: totales.unidades,
            amount: totales.monto,
            idClient: clientInfo.idClient,
            identification: clientInfo.identification,
            nameClient: clientInfo.nameClient,
            descripClient: clientInfo.descripClient,
            address: clientInfo.address,
            phone: clientInfo.phone,
            details: carrito.map((el) => ({
                idProd: el.idProd,
                code: el.code,
                name: el.name,
                price1: el.price1,
                price2: el.price2,
                typePrice: priceActive,
                amount: priceActive === 1 ? el.price1 : el.price2,
                cost: el.cost,
                qty: el.cantidad,
            })),
            paymentMethod: pagoTable.map((el) => ({
                idType: el.metodoPago.idType,
                descrip: el.metodoPago.descrip,
                amount: currencyActive === "BS" ? parseFloat(el.monto) : currencyActive === "USD" ? parseFloat((parseFloat(el.monto) / usdConvert).toFixed(2)) : parseFloat((parseFloat(el.monto) / usdConvert).toFixed(2))
            }))
        }
        try {
            const { data } = await axios.post(`${urlBase}/sale/post`, valores, config);
            toast.success('Venta Realizada con Exito')
            setOpenModalSucces(true)
            GetListSalesDay()
            GetListSalesDayBranch()
            GetListSalesDayClient()

        } catch (error) {
            toast.error(error.response.data.message);
            closeModalSucces()
        }
    }

    const conciliationClientSubmit = async ( carrito, totales, update) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            qty: totales.unidades,
            details: carrito.map((el) => ({
                idProd: el.idProd,
                code: el.code,
                name: el.name,
                qty: el.cantidad,
            })),
        }
        try {
            const { data } = await axios.post(`${urlBase}/conciliation/post`, valores, config);
            toast.success('Venta Realizada con Exito')
            setOpenModalSucces(true)
            update(prev => prev + 1)

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const GetSearchInventario = async (id, setArrData) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            code: "",
            product: "",
            reference: "",
            idCategory: 0,
            category: "",
            idBranch: id.id,
            branch: "",
        }

        try {
            const { data } = await axios.post(`${urlBase}/product/detail/getlist`, valores, config);
            setArrData(data?.data)
        } catch (error) {
        }
    }

    const GetInventarioSearch = async (nameProduct, branch, category) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {
            id: 0,
            code: "",
            product: nameProduct,
            reference: "",
            idCategory: 0,
            category: category,
            idBranch: 0,
            branch: branch,
        }

        try {
            const { data } = await axios.post(`${urlBase}/product/detail/getlist`, valores, config);
            setDataInventario(data?.data)
        } catch (error) {
        }
    }

    const orderUpdate = async (valores, setOpen, update) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/order/update`, valores, config);
            setOpen(false);
            toast.success('Orden Actualizada con Exito')
            GetListOrderAdmin()
        } catch (error) {
            toast.error(error)
        }
    }

    const factorSuggested = async (valores, setOpen) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/suggestedfactor`, valores, config);
            console.log( 'factorSuggested', data)
            setSuggestedMoney(data.data)

        } catch (error) {
            setSuggestedMoney({})
        }
    }

    const factorPost = async (valores,action) => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        try {
            const { data } = await axios.post(`${urlBase}/factor/post`, valores, config);
            toast.success('Tasas Actualizadas con exito')
            await factorPrevius()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const factorPrevius = async () => {
        let config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        };
        let valores = {};
        try {
            const { data } = await axios.post(`${urlBase}/getfactor`, valores, config);
            console.log( 'factorPrevius', data )
            setLastFactor(data.data)
        } catch (error) {
            toast.error(error.response.data.message)
            setLastFactor({})
        }
    }

    const reportSubmit = async (typeId, data) => {
        const type = [
            "branch",
            "vendor",
            "client",
            "category",
            "product",
            "audit"
        ][ typeId ]
        const config = {
            auth: {
                username: UserDataJson?.token,
                password: ''
            }
        }
        try{
            const { data:{ data:url } } = await axios.post(`${urlBase}/report/${type}`, data, config);
            return url
        } catch(error) {
            return null
        }
    }


    useEffect(() => {
        if(!localStorageReady){
            if (pathname !== '/' ) {
            if (UserDataJson === null && localStorageReady) {
                router.push('/')
                toast.error('Debe iniciar sesion')
            } else {
                return
            }
        }
    }

    }, [localStorageReady])

    useEffect(() => {
       if(UserDataJson){ 
        if (pathname === '/Configuracion' || pathname === '/Compra' ) {
            if (UserDataJson.idType !== 99) {
                router.push('/Home')
                toast.error('No puedes acceder a este modulo')
            } else {
                return
            }
        }
        if(pathname === '/Inventario'){
            if (UserDataJson.idType === 2) {
                router.push('/Home')
                toast.error('No puedes acceder a este modulo')
            } else {
                return
            }

        }
    } else {
        return
    }
    }, [pathname,UserDataJson])


    useEffect(() => {
        if ( dataUser && localStorageReady) {
            if( !dataClient ) GetListClient()
            if( !dataSucursal ) GetListSucursal()
            if( !dataVendor ) GetListVendor()
            if( !dataCategory ) GetListCategory()
            if( !dataInventario ) GetListInventario()
            if( !dataProducts ) GetListProduct()
            if( !dataUsers ) GetListUsers()
            if( !lastFactor ) factorPrevius()
            if( !suggestedMoney ) factorSuggested()
            if( dataClient &&
                dataSucursal &&
                dataVendor &&
                dataCategory &&
                dataInventario &&
                dataProducts &&
                dataUsers &&
                lastFactor &&
                suggestedMoney
            ){
                setStarted( true )
            }
        }
    }, [
        aux,
        dataClient, GetListClient,
        dataSucursal, GetListSucursal,
        dataVendor, GetListVendor,
        dataCategory, GetListCategory,
        dataInventario, GetListInventario,
        dataProducts, GetListProduct,
        dataUsers, GetListUsers,
        lastFactor, factorPrevius,
        suggestedMoney, factorSuggested,
        localStorageReady, dataUser])

    return (
        <FrontContext.Provider
            value={{
                prueba,
                setPrueba,
                mobileMenuOpen,
                setMobileMenuOpen,
                urlBase,
                dataUser,
                setDataUser,
                formikReference,
                totales,
                setTotales,
                navigation,
                login,
                totalesFront,
                setTotalesFront,
                ProductFavoriteSubmit,
                dataSucursal,
                dataVendor,
                dataCategory,
                agregarProductos,
                setAgregarProductos,
                agregarUsuario,
                setAgregarUsuario,
                agregarSucursal,
                setAgregarSucursal,
                agregarClientes,
                setAgregarClientes,
                agregarCategorias,
                setAgregarCategorias,
                agregarProveedores,
                setAgregarProveedores,
                auxListUsers,
                setAuxListUsers,
                auxListSucursal,
                setAuxListSucursal,
                CategorySubmit,
                ClientSubmit,
                VendorSubmit,
                UserSubmit,
                dataClient,
                SucursalSubmit,
                dataUsers,
                pending,
                setAuxListCliente,
                GetListSucursal,
                GetListClient,
                GetListVendor,
                auxListProveedor,
                setAuxListProveedor,
                GetListCategory,
                auxListCategoria,
                setAuxListCategoria,
                GetListUsers,
                auxListProduct,
                GetListProduct,
                ProductSubmit,
                dataInventario,
                GetListInventario,
                dataOrder,
                setDataOrder,
                auxOrderTab,
                setAuxOrderTab,
                dataRposicionList,
                setDataRposicionList,
                GetListReposicion,
                dataProducts,
                agregarCompra,
                setAgregarCompra,
                enviarReposicion,
                GetHome,
                dataHome,
                setDataHome,
                saleSubmit,
                GetSearchInventario,
                setAux,
                UserDataJson,
                orderUpdate,
                SucursalActiveSubmit,
                ClientActiveSubmit,
                VendorActiveSubmit,
                CategoryActiveSubmit,
                UserActiveSubmit,
                ProductActiveSubmit,
                dataProductsSales,
                GetProductsSales,
                setDataProductsSales,
                dataSalesDay,
                GetListSalesDay,
                screenPending,
                setScreenPending,
                pendingButton,
                setPendingButton,
                GetSearchReposicion,
                productSearchRepo,
                GetSearchListProduct,
                logout,
                openModalSucces,
                setOpenModalSucces,
                OrderPost,
                GetListOrderAdmin,
                GetListOrderBranch,
                GetSearchOrderBranch,
                GetListSalesDayBranch,
                GetInventarioSearch,
                GetListOrderClient,
                GetListConciliationClient,
                dataProductsClient,
                conciliationClientSubmit,
                suggestedMoney,
                factorPost,
                factorPrevius,
                lastFactor,
                totales2, 
                setTotales2,
                GetListSalesDayClient,
                GetHome,
                setDataProductsClient,
                GetSearchOrderAdmin,
                GetSearchOrderClient,
                GetListProduct,
                setPending,
                GetListConciliationAdmin,
                GetListConciliationSearchAdmin,
                setDataInventario,
                GetAuditUser,
                dataAudit,
                reportSubmit
            }}
        >{children}
        </FrontContext.Provider>)
}

export {
    FrontProvider
}
export default FrontContext