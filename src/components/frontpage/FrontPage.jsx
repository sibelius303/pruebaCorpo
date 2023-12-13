/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
	// ...
	plugins: [
	  // ...
	  require('@tailwindcss/forms'),
	  require('@tailwindcss/aspect-ratio'),
	],
  }
  ```
*/
'use client'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	QuestionMarkCircleIcon,
	ShoppingBagIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ROUTER_PATH } from '@/tools/constants'
import ProductSlider from '../product/ProductSlider'
import { products } from '../../tools/mockup/products.mockup'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import Contactenos from '../Contactenos'
import NewsSlider from '../NewsSlider'

const currencies = ['BS', 'USD']
const navigation = {
	categories: [
		{
			name: 'Fuerza Armada Bolivariana',
			featured: [
				{
					name: 'Call Of Duty Mobile',
					href: '#',
					imageSrc: '/images/CODM.webp',
					imageAlt: 'Call Of Duty Mobile.',
					description: '¡Recarga tus COD Points!'
				},
				{
					name: 'Wild Rift',
					href: '#',
					imageSrc: '/images/WR.webp',
					imageAlt: 'Riot Games Wild Rift.',
					description: '¡Recarga tus Wild Cores!'
				},
				{
					name: 'Clash of Clans',
					href: '#',
					imageSrc: '/images/COC.webp',
					imageAlt: 'Clash of Clans.',
					description: '¡Recarga tus Gemas!'
				},
				{
					name: 'Free Fire',
					href: '#',
					imageSrc: '/images/FF.webp',
					imageAlt: 'Clash Royale.',
					description: '¡Recarga tus Diamantes!'
				},
			],
		},
		{
			name: 'Juegos',
			featured: [
				{
					name: 'New Arrivals',
					href: '#',
					imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
					imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
				},
				{
					name: 'Basic Tees',
					href: '#',
					imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
					imageAlt: 'Model wearing light heather gray t-shirt.',
				},
				{
					name: 'Accessories',
					href: '#',
					imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
					imageAlt:
						'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
				},
				{
					name: 'Carry',
					href: '#',
					imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
					imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
				},
			],
		},
	],
	pages: [
		{ name: 'Company', href: '#' },
		{ name: 'Stores', href: '#' },
	],
}

const footerNavigation = {
	shop: [
		{ name: 'Bags', href: '#' },
		{ name: 'Tees', href: '#' },
		{ name: 'Objects', href: '#' },
		{ name: 'Home Goods', href: '#' },
		{ name: 'Accessories', href: '#' },
	],
	company: [
		{ name: 'Who we are', href: '#' },
		{ name: 'Sustainability', href: '#' },
		{ name: 'Press', href: '#' },
		{ name: 'Careers', href: '#' },
		{ name: 'Terms & Conditions', href: '#' },
		{ name: 'Privacy', href: '#' },
	],
	account: [
		{ name: 'Manage Account', href: '#' },
		{ name: 'Returns & Exchanges', href: '#' },
		{ name: 'Redeem a Gift Card', href: '#' },
	],
	connect: [
		{ name: 'Contact Us', href: '#' },
		{ name: 'Twitter', href: '#' },
		{ name: 'Instagram', href: '#' },
		{ name: 'Pinterest', href: '#' },
	],
}

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function FrontPage() {
	const router = useRouter()
	const [showAll, setShowAll] = useState(false);

	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div className="text-black">
			<main>
				<NewsSlider />
				<div className='h-96 hidden lg:flex w-fullpl-4'>
					<div className='w-1/2 flex flex-col items-center justify-center gap-y-5'>
						<h1 className="text-xl font-bold">Recuerda que puedes pagar tu servicio eléctrico de tu medidor</h1>
						<button className='block w-full rounded-md border border-transparent bg-azulPantone px-8 py-3 text-base font-medium text-white bg-opacity-80 hover:bg-opacity-100 sm:w-auto'>
							¡Aquí!
						</button>
					</div>
					<div className='w-1/2'>
						<Image src={'/corpoImagenes/medidor.jpg'} width={700} height={450} alt='imagen no disponible' />
					</div>
				</div>
				<div className='h-96 lg:hidden w-full flex flex-col '>
					<div className='w-full  h-full flex flex-col'>
						<h1 className=" text-xl text-center order-2 mt-5 font-bold">Recuerda que puedes pagar tu servicio eléctrico de tu medidor</h1>
						<div className='w-full order-1'>
							<Image src={'/corpoImagenes/medidor.jpg'} width={700} height={450} alt='imagen no disponible' />
						</div>
					</div>
					<button className='block w-full rounded-md border border-transparent bg-azulPantone px-8 py-3 text-base font-medium text-white bg-opacity-80 hover:bg-opacity-100 sm:w-auto'>
						¡Aquí!
					</button>
				</div>
				<div className='h-96 w-full mt-10 relative'>
					<div aria-hidden="true" className="absolute w-full  inset-0 overflow-hidden">
						<Image
							src="/bannercaracasiluminada.png"
							alt=""
							className="h-full w-full object-cover object-center "
							width={1000}
							height={1000}
						/>
					</div>
					<div aria-hidden="true" className="absolute w-full  bg-slate-800  inset-0  opacity-50" />
					<div aria-hidden="true" className="absolute w-full inset-0 flex flex-col items-center justify-center">
						<div className="w-full px-5 lg:px-0 lg:w-1/2 flex flex-col items-center gap-4">
							<p className='text-white text-justify text-md lg:text-xl'>
								Brindamos productos de máxima calidad y ecológicos,
								especializados en materiales y equipos de iluminación en general para el hogar,
								alumbrado público, iluminación industrial y comercial
							</p>
							<button className="block w-full rounded-3xl border border-transparent bg-azulPantone px-8 py-3 text-base font-medium text-white bg-opacity-80 hover:bg-opacity-100 sm:w-auto">
								{'Conoce Nuestro Catalogo >'}
							</button>
						</div>
					</div>
				</div>
				<div className='h-96 w-full text-black flex justify-center items-center'>
					<div className="w-full p-4 lg:p-0 lg:w-1/2 flex flex-col items-center gap-6">
						<h3 className="text-lg lg:text-xl xl:text-3xl font bold">¿Quieres ser nuestro Aliado Comercial?</h3>
						<p className=' text-md lg:text-lg xl:text-xl text-justify'>
							Fabricamos productos de calidad, innovadores y eficientes
							brindando soluciones, unificando fuerzas para conducir por el
							camino de la superación económica e industrial.
							Somos una empresa encargada de la comercialización de equipos
							para su red eléctrica o sus proyectos con energías alternativas.
						</p>
						<button className="block w-full rounded-3xl border border-transparent bg-azulPantone px-8 py-3 text-base font-medium text-white bg-opacity-80 hover:bg-opacity-100 sm:w-auto">
							{'Registrarse >'}
						</button>
					</div>
				</div>
				<div style={{ backgroundColor: '#172168' }} className='h-96 hidden w-full mt-10 lg:block lg:relative '>
					<div onClick={()=>router.push('/productos/LED')} className='absolute h-80 lg:w-52 xl:w-52 top-24 lg:left-10  flex flex-col rounded-lg miDiv hover:miDivHover'>
						<div className='h-1/2 w-full flex justify-end px-5 py-5'>
							<Image
								src={"/corpoImagenes/lamparaledsinfondo.png"}
								alt="imagen de muestra"
								className=" h-[150px] w-[150px] object-cover object-center"
								width={200}
								height={200}
							/>
						</div>
						<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
							<h1 className='text-2xl font-bold'>LED</h1>
							<p>Descubre mas</p>
						</div>
					</div>
					<div onClick={()=>router.push('/productos/AlumbradoPublico')} style={{ backgroundColor: '#65BCE0' }} className='absolute h-80 lg:w-52 xl:w-64 top-24 lg:left-72 xl:left-96 rounded-lg miDiv4 hover:miDivHover4'>
						<div className='h-1/2 w-full flex justify-end px-5 py-5'>
							<Image
								src={"/corpoImagenes/alumbradosinfondo.png"}
								alt="imagen de muestra"
								className=" h-[175px] w-[100px] object-cover object-center"
								width={100}
								height={50}
							/>
						</div>
						<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
							<h1 className='text-2xl font-bold'>Alumbrado publico</h1>
							<p>Descubre mas</p>
						</div>
					</div>
					<div onClick={()=>router.push('/productos/Transformadores')} style={{ backgroundColor: '#65BCE0' }} className='absolute h-80 lg:w-52 xl:w-64 top-24 lg:right-72 xl:right-96 rounded-lg miDiv2  hover:miDivHover2'>
						<div className='h-1/2 w-full flex justify-end px-5 py-5'>
							<Image
								src={"/corpoImagenes/transformadorsinfondo.png"}
								alt="imagen de muestra"
								className=" h-[175px] w-[150px] object-cover object-center"
								width={100}
								height={100}
							/>
						</div>
						<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
							<div>
								<h1 className=' lg:text-xl xl:text-2xl font-bold'>Transformadores</h1>
							</div>
							<p>Descubre mas</p>
						</div>
					</div>
					<div onClick={()=>router.push('/productos/EnergiasRenovables')} style={{ backgroundColor: '#65BCE0' }} className='absolute h-80 miDiv3 hover:miDivHover3 lg:w-52 xl:w-64 top-24 lg:right-10 rounded-lg'>
						<div className='h-1/2 w-full flex justify-end px-5 py-5'>
							<Image
								src={"/corpoImagenes/panelsinfondo.png"}
								alt="imagen de muestra"
								className=" h-[150px] w-[150px] object-cover object-center"
								width={100}
								height={100}
							/>
						</div>
						<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
							<h1 className='text-2xl font-bold'>Energias Renovables</h1>
							<p>Descubre mas</p>
						</div>
					</div>
				</div>
				<div style={{ backgroundColor: '#172168' }} className=' h-auto lg:h-96 w-full mt-10 lg:hidden lg:relative '>
					<div onClick={()=>router.push('/productos/LED')} style={{ backgroundColor: '#65BCE0' }} className=''>
						<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
							<h1 className='text-2xl font-bold'>LED</h1>
							<p className='text-end'>Descubre mas</p>
						</div>
					</div>
					<div onClick={()=>router.push('/productos/AlumbradoPublico')} style={{ backgroundColor: '#65BCE0' }} className=''>
						<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
							<h1 className='text-2xl font-bold'>Alumbrado publico</h1>
							<p className='text-end'>Descubre mas</p>
						</div>
					</div>
					<div onClick={()=>router.push('/productos/Transformadores')} style={{ backgroundColor: '#65BCE0' }} className=''>
						<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
							<div>
								<h1 className='text-2xl font-bold'>Transformadores</h1>
							</div>
							<p className='text-end'>Descubre mas</p>
						</div>
					</div>
					<div onClick={()=>router.push('/productos/EnergiasRenovables')} style={{ backgroundColor: '#65BCE0' }} className=''>
						<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
							<h1 className='text-2xl font-bold'>Energias Renovables</h1>
							<p className='text-end'>Descubre mas</p>
						</div>
					</div>
				</div>
				<section
					aria-labelledby="social-impact-heading"
					className={`mt-20 mx-auto max-w-7xl mb-10  shadow-md px-4 transition-all duration-500 ease-in-out sm:px-6 lg:px-8 ${showAll ? 'pt-96' : 'pt-5'}`}
				>
					<div className="relative overflow-hidden rounded-lg">
						<div className="absolute inset-0">
							<Image
								src={"/sobreLaEmpresa.jpeg"}
								alt="imagen de muestra"
								className="h-full w-full object-cover object-center"
								width={300}
								height={300}
							/>
						</div>
						<div className=" relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
							<div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
								<h2 id="social-impact-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
									<span className="block sm:inline">Conoce mas acerca de nosotros, nuestra Misión y Visión</span>
								</h2>
								<button
									onClick={() => { router.push(ROUTER_PATH.ABOUT) }}
									className="mt-8 block w-full rounded-md border border-transparent bg-azulPantone px-8 py-3 text-base font-medium text-white bg-opacity-80 hover:bg-opacity-100 sm:w-auto"
								>
									Sobre Nosotros
								</button>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}
