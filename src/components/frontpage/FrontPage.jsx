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
import escudoArmada from '../../../public/ImagesCadeteSiempre/escudoArmada.png'
import escudoGuardia from '../../../public/ImagesCadeteSiempre/guardiaNacionalEscudo.png'
import escudoEjercito from '../../../public/ImagesCadeteSiempre/escudoEjercito.png'
import escudoMilicia from '../../../public/ImagesCadeteSiempre/escudoMilicia.png'
import escudoAviacion from '../../../public/ImagesCadeteSiempre/escudoAviacion.png'
import { useRouter } from 'next/navigation'
import AcademyComponent from './AcademyComponent'
import { ROUTER_PATH } from '@/tools/constants'
import ProductSlider from '../product/ProductSlider'
import { products } from '../../tools/mockup/products.mockup'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import Contactenos from '../Contactenos'

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

const categories = [
	{
		name: 'Fuerza Armada Bolivariana',
		href: ROUTER_PATH.PRODUCTS,
		imageSrc: escudoArmada
		,
	},
	{
		name: 'Guardia Nacional Bolivariana',
		href: ROUTER_PATH.PRODUCTS,
		imageSrc: escudoGuardia,
	},
	{
		name: 'Ejercito Bolivariano',
		href: ROUTER_PATH.PRODUCTS,
		imageSrc: escudoEjercito,
	},
	{
		name: 'Aviacion Militar Bolivariana',
		href: ROUTER_PATH.PRODUCTS,
		imageSrc: escudoAviacion,
	},
	{ name: 'Ejemplo', href: '/productos', imageSrc: escudoMilicia },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
	{ name: 'Ejemplo', href: '/productos', imageSrc: "/ImagesCadeteSiempre/imagen-de-prueba-320x240-1.jpg" },
]

const collections = [
	{
		name: 'Tarjetas',
		href: '#',
		imageSrc: "/tarjeta.jpeg",
		imageAlt: 'PayPal Logo.',
		description: 'Tarjeta de Credito/Debito.',
	},
	{
		name: 'Transferencia',
		href: '#',
		imageSrc: "/transferencia.jpeg",
		imageAlt: 'Binance.',
		description: 'Transferencia Bancaria.',
	},
	{
		name: 'Efectivo',
		href: '#',
		imageSrc: "/efectivo.png",
		imageAlt: 'Skrill.',
		description: 'Paga en nuestras oficinas al buscar tus productos',
	},
]
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
			{/* Mobile menu */}


			{/* Hero section */}

			<main>
				{/* Category section */}
				{/* <section  className="hidden  shadow-md rounded-t-md  mt-10 pt-24 sm:pt-32 lg:block xl:mx-auto xl:h-auto xl:max-w-7xl xl:px-8">
					<div className="px-4 text-center w-full sm:flex sm:items-center sm:justify-center sm:px-6 lg:px-8 xl:px-0">
						<h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
							Academias
						</h2>

					</div>
					<div className="mt-4 flow-root">
						<div className="-my-2">
							<div className="block box-content h-80 overflow-y-auto py-2 xl:overflow-visible">
								<div className=" space-x-4 px-4  lg:px-8 lg:grid  lg:grid-cols-6 xl:gap-8 xl:space-x-0 xl:px-0 xl:my-10">
									{showAll ? categories.map((category, index) => (
										<button
											key={index}
											onClick={() => router.push(category.href)}
											className="relative flex h-40 w-auto flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
										>
											<span aria-hidden="true" className="absolute inset-0">
												<Image width={500} height={500} src={category.imageSrc} alt="" className="aspect-h-1 aspect-w-1 h-full w-full object-cover object-center" />
											</span>
											<span
												aria-hidden="true"
												className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
											/>
											<span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
										</button>
									)) : categories.slice(0, 6).map((category, index) => (
										<button
											key={index}
											onClick={() => router.push( ROUTER_PATH.PRODUCTS_BY_CATEGORY(category.name) ) }
											className="relative flex h-40 w-full flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
										>
											<span aria-hidden="true" className="absolute inset-0">
												<Image width={500} height={500} src={category.imageSrc} alt="" className="aspect-h-1 aspect-w-1 h-full w-full object-cover object-center" />
											</span>
											<span
												aria-hidden="true"
												className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
											/>
											<span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
										</button>
									))}
									
								</div>
								<div className=' hidden lg:flex w-full justify-center'>
									<button className='text-blue-700 hover:text-blue-400 mt-5 inline-block rounded-md border border-transparent  px-8 py-3 text-base font-medium  hover:bg-gray-100' onClick={() => setShowAll(prev => !prev)}>{showAll ? 'Cerrar' : 'Ver todas las Academias'}</button>
								</div>
							</div>
						</div>
					</div>
				</section> */}
				{/* <section  className="  shadow-md rounded-t-md  mt-10 pt-24 sm:pt-32 lg:hidden ">
					<div className="px-4 text-center w-full sm:flex sm:items-center sm:justify-center sm:px-6 lg:px-8 xl:px-0">
						<h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
							Academias
						</h2>

					</div>

					<div className="mt-4 flow-root">
						<div className="-my-2">
							<div className="block box-content h-80 overflow-y-auto py-2 xl:overflow-visible">
								<div className=" space-x-4 px-4 flex flex-col items-center sm:px-6 lg:px-8  xl:grid-cols-6 xl:gap-8 xl:space-x-0 xl:px-0 xl:my-10">
									{categories.map((category, index) => (
										<button
											key={index}
											onClick={() => router.push(category.href)}
											className="relative flex h-40 w-full flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
										>
											<span aria-hidden="true" className="absolute inset-0">
												<Image width={500} height={500} src={category.imageSrc} alt="" className="aspect-h-1 aspect-w-1 h-full w-full object-cover object-center" />
											</span>
											<span
												aria-hidden="true"
												className="absolute inset-x-0 bottom-0 w-full h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
											/>
											<span className="relative mt-auto text-center w-full text-xl font-bold text-white">{category.name}</span>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</section> */}

				{/* Featured section */}
				<div className='h-48 flex items-center justify-around'>
					<Image src={'/MPPEE.png'} width={200} height={200} alt='imagen no disponible' />
					<Image src={'/logounerven.png'} width={200} height={200} alt='imagen no disponible' />
					<Image src={'/vietverdetransparente.png'} width={200} height={200} alt='imagen no disponible' />
					<Image src={'/logosinfondo.png'} width={250} height={250} alt='imagen no disponible' />
				</div>
				<div className='h-96 w-full flex pl-4'>
					<div className='w-1/2 flex flex-col items-center justify-center gap-y-5'>
						<h1 className="text-xl font-bold">Pague su medidor</h1>
						{/* <p>
							Registrate para pagar tu medidor o hacerte aliado, Lorem ipsum dolor sit amet consectetur adipisicing elit. A error impedit magnam recusandae! Culpa in deleniti cumque incidunt nobis? Blanditiis ex laboriosam nemo illum eveniet. Cumque modi rem officia harum.
						</p> */}
						<button className='block w-full rounded-md border border-transparent bg-azulPantone px-8 py-3 text-base font-medium text-white bg-opacity-80 hover:bg-opacity-100 sm:w-auto'>
							Pague su Medidor
						</button>

					</div>
					<div className='w-1/2'>
						<Image src={'/imagenmedidorPage.jpg'} width={700} height={450} alt='imagen no disponible' />
					</div>
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
						<div className="w-1/2 flex flex-col items-center gap-4">
							<p className='text-white text-justify'>
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
					<div className="w-1/2 flex flex-col items-center gap-6">
						<h3 className="text-3xl font bold">Si quieres ser aliado Registrate</h3>
						<p className=' text-xl text-justify'>
							Registrate para ser aliado y poder acceder a nuestros productos a precio mayorista y muchas cosas mas
						</p>
						<button className="block w-full rounded-3xl border border-transparent bg-azulPantone px-8 py-3 text-base font-medium text-white bg-opacity-80 hover:bg-opacity-100 sm:w-auto">
							{'Registrarse >'}
						</button>
					</div>
				</div>
				<div style={{ backgroundColor: '#172168' }} className='h-96 w-full mt-10 relative '>
					<div className='absolute h-80 w-64 top-24 left-10 flex flex-col rounded-lg miDiv hover:miDivHover'>
						<div className='h-1/2 w-full'>

						</div>
						<div className='h-1/2 w-full text-white flex-auto items-end'>
							<h1 className='text-xl font-bold'>LED</h1>
							<p>Descubre mas</p>
						</div>
					</div>
					<div style={{ backgroundColor: '#65BCE0' }} className='absolute h-80 w-64 top-24 left-96 rounded-lg miDiv4 hover:miDivHover4'>
						<div className='h-1/2 w-full'>

						</div>
						<div className='h-1/2 w-full'>

						</div>
					</div>
					<div style={{ backgroundColor: '#65BCE0' }} className='absolute h-80 w-64 top-24 right-96 rounded-lg miDiv3 hover:miDivHover3'>
						<div className='h-1/2 w-full'>

						</div>
						<div className='h-1/2 w-full'>

						</div>
					</div>
					<div style={{ backgroundColor: '#65BCE0' }} className='absolute h-80 w-64 top-24 right-10 rounded-lg'>
						<div className='h-1/2 w-full'>

						</div>
						<div className='h-1/2 w-full'>

						</div>
					</div>
				</div>
				{/* <h2 className="text-3xl font-bold text-center tracking-tight sm:text-4xl">
					<span className="block sm:inline">Noticias</span>
				</h2>
				<div className='my-10 h-72 p-10 '>
					
					<ProductSlider products={products} />
					
				</div>
				<div data-aos="fade-up" className='w-full flex justify-center'>
					<button
						onClick={() => { router.push(ROUTER_PATH.PRODUCTS) }}
						className="block w-full rounded-md border border-transparent bg-azulPantone px-8 py-3 text-base font-medium text-white bg-opacity-80 hover:bg-opacity-100 sm:w-auto"
					>
						Ver Productos
					</button>
				</div> */}
				<section
					data-aos="fade-up"
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



				{/* Collection section */}
				{/* <section
					aria-labelledby="collection-heading"
					className=" shadow-md mx-auto rounded-b-md max-w-xl px-4 pt-24 mb-10 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
				>
					<h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
						¡Paga con tus medios de pagos favoritos!
					</h2>
					<p className="mt-4 text-base text-gray-500">
						Efectivo, Tarjeta de Debito/Credito, Transferencia Bancaria
					</p>

					<div className="mt-10 space-y-12 pb-24  lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
						{collections.map((collection) => (
							<a key={collection.name} href={collection.href} className="flex flex-col justify-between group ">
								<div
									aria-hidden="true"
									className="h-[400px] w-full overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-6 group-hover:opacity-75"
								>
									<Image
										src={collection.imageSrc}
										alt={collection.imageAlt}
										className="h-full w-full object-cover object-center"
										width={300}
										height={300}
									/>
								</div>
								<div>
									<h3 className="mt-4 text-base font-semibold text-gray-900">{collection.name}</h3>
									<p className="mt-2 text-sm text-gray-500">{collection.description}</p>
								</div>
							</a>
						))}
					</div>
				</section> */}

				{/* Featured section */}
				{/* <section aria-labelledby="comfort-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
					<div className="relative overflow-hidden rounded-lg">
						<div className="absolute inset-0">
							<img
								src="https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg"
								alt=""
								className="h-full w-full object-cover object-center"
							/>
						</div>
					</div>
				</section> */}
			</main>
		</div>
	)
}
