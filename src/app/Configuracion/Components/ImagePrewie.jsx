'use client'

import { useState } from "react"
import Image from "next/image";


export default function ImagePrewie({file}) {
    const [preVista, setPreVista] = useState({})

    if(file) {
        const reader = new FileReader
        reader.readAsDataURL(file)
        reader.onload = ()=> {
            setPreVista(reader.result)
        }
    }
    return (
        <div className=''>
            <img className="w-20 h-20" src={preVista} alt=""/>
        </div>
    )
}