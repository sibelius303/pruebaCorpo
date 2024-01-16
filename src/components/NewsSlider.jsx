"use client"
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";


import BreakParrafe from "./BreakParrafe";
import Link from "next/link";

export default function NewsSlider({height = 300}) {
    const [notices, setNotices] = useState(null)
    useEffect(()=>{
        if( !notices ) {
            (async ()=>{
                const response = await fetch(`${process.env.API_URL}/news`)
                const data = await response.json()
                console.log(data)
                if( (data) instanceof Array ) {
                    setNotices( data )
                }
            })()
        }
    },[notices])

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    const settingsResponsive = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    }

    return (
        <div className="news-slider" style={{ overflowAnchor: "none" }}>
            <div className="slider hidden lg:block">
                <Slider {...settings} >
                    {notices && notices?.map((item, index) => (
                        <BreakParrafe key={item._id} name={`noti-${index}`} content={item.descrip} size={9}>
                            <Link href={`/noticias/${item._id}`}  className="block px-2 overflow-hidden bg-white m-2 rounded-lg" style={{ height:`${height}px` }}>
                                <h3 className="font-medium mb-4 text-lg h-12">{item.title}</h3>
                                <span className="flex flex-row justify-center relative h-0" style={{ top:`${2*height/3}px` }}>
                                    <span className="bg-black text-white py-2 px-10 text-lg rounded-md shadow-md absolute bg-opacity-70 hover:bg-opacity-100 -top-8">Leer mas</span>
                                </span>
                                <span className="flex flex-row gap-4 z-20 w-full h-1/3 overflow-hidden" >
                                    <Image src={item.urlImage} alt="" width={200} height={200} className="w-1/3 h-full"/>
                                    <p data-break={`noti-${index}`} className="w-2/3 h-full italic text-sm text-slate-500"></p>
                                </span>
                                <p data-break={`noti-${index}`} className="w-full p-2 h-full italic text-sm text-slate-500"></p>
                            </Link>
                        </BreakParrafe>
                    ))}
                </Slider>
            </div>
            <div className="slider lg:hidden">
                <Slider {...settingsResponsive} >
                    {notices && notices?.map((item, index) => (
                        <BreakParrafe key={item._id} name={`noti-${index}`} content={item.descrip} size={9}>
                            <Link href={`/noticias/${item._id}`}  className="block px-2 overflow-hidden bg-white m-2 rounded-lg" style={{ height:`${height}px` }}>
                                <h3 className="font-medium mb-4 text-lg h-12">{item.title}</h3>
                                <span className="flex flex-row justify-center relative h-0" style={{ top:`${2*height/3}px` }}>
                                    <span className="bg-black text-white py-2 px-10 text-lg rounded-md shadow-md absolute bg-opacity-70 hover:bg-opacity-100 -top-8">Leer mas</span>
                                </span>
                                <span className="flex flex-row gap-4 z-20 w-full h-1/3 overflow-hidden" >
                                    <Image src={item.urlImage} alt="" width={200} height={200} className="w-1/3 h-full"/>
                                    <p data-break={`noti-${index}`} className="w-2/3 h-full italic text-sm text-slate-500"></p>
                                </span>
                                <p data-break={`noti-${index}`} className="w-full p-2 h-full italic text-sm text-slate-500"></p>
                            </Link>
                        </BreakParrafe>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

