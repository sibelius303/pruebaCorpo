import Login from '@/components/login/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  return (
    <div className=''>
      <Login />
      <ToastContainer/>
    </div>

  )
}
