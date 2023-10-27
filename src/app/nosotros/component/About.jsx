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
		<div  className=" h-auto lg:px-20 pt-10 pb-20 rounded-md bg-slate-100">
			<div  className=" flex flex-col lg:flex-row lg:justify-between items-center gap-4 lg:gap-2 mt-14">
				<div className="shadow-lg bg-white w-full rounded-md  ">
					<Image width={700} height={500} className=" rounded-md" src={"/sobreLaEmpresa.jpeg"} alt="Imagen de muestra" />
				</div>
				<div className="lg:absolute lg:right-20 lg:w-1/2 bg-gradient-to-r from-azulPantone to-rojoPantone text-white  lg:max-h-72  p-4 rounded-md">
					<h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>
					<p className="text-lg">Corpoelec Industrial fue creada el 13 de agosto de 2013, a través del Decreto Presidencial
						N° 321, publicado en la Gaceta Oficial N° 40.227, cuando el Presidente de la República,
						Nicolás Maduro Moros, dentro de los procesos de reestructuración y consolidación del
						Sistema Eléctrico Nacional, establece la necesidad de consolidar la maquinaria industrial
						venezolana, a fin de garantizar mayor seguridad, estabilidad, eficiencia y confiabilidad en
						la prestación del servicio eléctrico del país.</p>
				</div>
			</div>
			<div data-aos="fade-up" className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 lg:gap-2 mt-14">
				<div className=" w-full flex lg:hidden justify-end h-auto overflow-hidden shadow-lg bg-white rounded-md">
					<Image width={700} height={500} className="rounded-md" src={"/mision.jpeg"} alt="Imagen de muestra" />
				</div>
				<div className="lg:absolute lg:w-1/2 bg-gradient-to-r from-azulPantone to-rojoPantone lg:max-h-56 text-white p-4 rounded-md">
					<h1 className="text-4xl font-bold mb-4 text-center">Misión</h1>
					<p className="text-lg">“Fortalecer un nuevo modelo productivo
						socialista a través de la producción de bienes y
						servicios para el mercado nacional e internacional
						que contribuya e impulsen el desarrollo del Sector
						Eléctrico Nacional (SEN)”</p>
				</div>
				<div className="hidden lg:flex w-full  justify-end h-auto overflow-hidden shadow-lg bg-white rounded-md">
					<Image width={700} height={500} className="rounded-md" src={"/mision.jpeg"} alt="Imagen de muestra" />
				</div>
			</div>

			<div data-aos="fade-up" className=" flex flex-col lg:flex-row lg:justify-between items-center gap-4 lg:gap-2 mt-14">
				<div className="overflow-hidden shadow-lg bg-white w-full rounded-md">
					<Image width={700} height={500} className="rounded-md" src="/vision.JPG" alt="Imagen de muestra" />
				</div>
				<div className="lg:absolute lg:right-0 lg:w-1/2 bg-gradient-to-r from-azulPantone to-rojoPantone text-white  lg:max-h-64  p-4 rounded-md">
					<h1 className="text-4xl font-bold mb-4 text-center  ">Visión</h1>
					<p className="text-lg">Posicionarnos en el mercado internacional
						como modelo de gestión pública, nuestra
						visión es ser una empresa estable con una
						dirección definida para la planificación y
						ejecución de estrategias a nivel corporativo.
						Una visión que incluya los valores, misión y
						un sentido claro de quienes somos y a dónde
						queremos llegar. </p>
				</div>
			</div>
			{/* <h1 className=" text-2xl lg:text-4xl font-bold mb-4 px-4 lg:px-48 mt-14">Nuestros Productos</h1>
			<div className="flex px-6 flex-col justify-between gap-4 lg:px-48 mt-14">
				<div>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nihil temporibus delectus a, sapiente omnis, earum unde ducimus optio explicabo molestias ipsum blanditiis! Rerum expedita eligendi illo, quaerat eius molestiae.</p>
				</div>
				<div className="flex gap-4 flex-col lg:flex-row rounded overflow-hidden shadow-lg bg-white">
					<div>
						<img className="w-full" src="https://via.placeholder.com/600x300" alt="Imagen de muestra" />
						<div className="px-6 py-4">
							<p className="text-gray-700 text-base">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut interdum dolor.
							</p>
						</div>

					</div>
					<div>
						<img className="w-full" src="https://via.placeholder.com/600x300" alt="Imagen de muestra" />
						<div className="px-6 py-4">
							<p className="text-gray-700 text-base">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut interdum dolor.
							</p>
						</div>

					</div>
					<div>
						<img className="w-full" src="https://via.placeholder.com/600x300" alt="Imagen de muestra" />
						<div className="px-6 py-4">
							<p className="text-gray-700 text-base">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut interdum dolor.
							</p>
						</div>

					</div>


				</div>
			</div> */}

		</div>
	)
}