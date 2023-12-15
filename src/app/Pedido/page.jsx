import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Order from "@/app/Pedido/component/Order";

export default function page() {


    
    return (
        <>
            <Order/>
            <ToastContainer/>
        </>

    )
}