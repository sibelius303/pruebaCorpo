import { Fragment } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sales from "@/app/Ventas/Components/Sales";



export default function page() {

    return (
        <>
             <Sales/> 
            <ToastContainer />
        </>
    )
}
