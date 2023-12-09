'use client'

import Image from "next/image"
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function About() {

	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div className=" h-auto lg:px-20 pt-10 pb-20 rounded-md">
			<div className=" w-1/2">
				<h1 className="text-2xl pl-10 lg:text-5xl lg:pl-52 w-full font-bold bg-blue-900 text-white px-5">
					Sobre
				</h1>
			</div>
			<div className="flex justify-end pr-10 lg:pr-52">
				<h1 className=" text-2xl text-right  lg:text-5xl lg:w-[500px] font-bold lg:text-center text-red-500 px-5">
					Nosotros
				</h1>
			</div>
			<div className=" flex flex-col lg:flex-row lg:justify-between items-center gap-4 lg:gap-2 mt-14">
				<div className="  w-full  ">
					<Image width={700} height={500} className=" rounded-md" src={"/sobreLaEmpresa.jpeg"} alt="Imagen de muestra" />
				</div>
				<div style={{ backgroundColor: '#65BCE0' }} className="lg:absolute lg:right-20 lg:w-1/2  text-white lg:h-auto xl:max-h-72  p-4 rounded-md">
					<p className="lg:text-sm xl:text-lg">Corpoelec Industrial fue creada el 13 de agosto de 2013, a través del Decreto Presidencial
						N° 321, publicado en la Gaceta Oficial N° 40.227, cuando el Presidente de la República,
						Nicolás Maduro Moros, dentro de los procesos de reestructuración y consolidación del
						Sistema Eléctrico Nacional, establece la necesidad de consolidar la maquinaria industrial
						venezolana, a fin de garantizar mayor seguridad, estabilidad, eficiencia y confiabilidad en
						la prestación del servicio eléctrico del país.</p>
				</div>
			</div>
			<div className="w-full flex justify-center  mt-10">
				<h1 className="text-2xl xl:pl-10 text-center w-1/2 lg:text-5xl lg:pl-52 font-bold bg-blue-900 text-white px-5">
					Misión
				</h1>
			</div>
			<div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 lg:gap-2 mt-14">
				<div className=" w-full flex lg:hidden justify-end h-auto overflow-hidden ">
					<Image width={700} height={500} className="rounded-md" src={"/mision.jpeg"} alt="Imagen de muestra" />
				</div>
				<div style={{ backgroundColor: '#65BCE0' }} className="lg:absolute lg:w-1/2  text-white lg:max-h-56  p-4 rounded-md">
					<p className="lg:text-sm xl:text-lg">“Fortalecer un nuevo modelo productivo
						socialista a través de la producción de bienes y
						servicios para el mercado nacional e internacional
						que contribuya e impulsen el desarrollo del Sector
						Eléctrico Nacional (SEN)”</p>
				</div>
				<div className="hidden lg:flex w-full  justify-end h-auto overflow-hidden ">
					<Image width={700} height={500} className="rounded-md" src={"/mision.jpeg"} alt="Imagen de muestra" />
				</div>
			</div>
			<div className="w-full flex justify-center  mt-10">
				<h1 className="text-2xl text-center xl:pl-10 w-1/2 lg:text-5xl lg:pl-52 font-bold bg-blue-900 text-white px-5">
					Visión
				</h1>
			</div>
			<div className=" flex flex-col lg:flex-row lg:justify-between items-center gap-4 lg:gap-2 mt-14">
				<div className="overflow-hidden   w-full ">
					<Image width={700} height={500} className="rounded-md" src="/vision.JPG" alt="Imagen de muestra" />
				</div>
				<div style={{ backgroundColor: '#65BCE0' }} className="lg:absolute lg:right-0 lg:w-1/2 text-white  lg:max-h-64  p-4 rounded-md">
					<p className="lg:text-sm xl:text-lg">Posicionarnos en el mercado internacional
						como modelo de gestión pública, nuestra
						visión es ser una empresa estable con una
						dirección definida para la planificación y
						ejecución de estrategias a nivel corporativo.
						Una visión que incluya los valores, misión y
						un sentido claro de quienes somos y a dónde
						queremos llegar. </p>
				</div>
			</div>
		</div>
	)
}