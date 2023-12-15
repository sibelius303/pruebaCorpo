import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "@/app/Home/component/Home";

//Actualizacion 9/08/2023
export default function page() {
    return (
    <>
        <Home/>
        <ToastContainer />
    </>
    )
}
