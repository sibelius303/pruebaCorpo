import './globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomHeader from '@/components/header/Index'
import { Inter } from 'next/font/google'
import CustomFooter from '@/components/CustomFooter'
import Image from 'next/image';
import FloatingIcon from '@/components/FloatingIcon';
import Contactenos from '@/components/Contactenos';
// DEPLOY 8/01/2024 17:45:00
// QA 18/12/2023 18:35:00

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

	const estiloCintilloGris = {
		backgroundImage: 'url("/cintillogris.jpg")',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'noRepeat',
		width: '100%',
		height: '50%',
	};

	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/logoespirales.png" sizes="any" />
				<title>
					Corpoelec Industrial
				</title>
			</head>
			<body
				style={
					{ backgroundColor: '#e3e4e5' }
					//estiloComponente
				}
				className={inter.className}>
				<CustomHeader />
				<div className="hidden lg:flex h-96">
					{/* Decorative image and overlay */}
					<div aria-hidden="true" className="">
						<Image
							src="/corpoImagenes/bannerpagweg.jpg"
							alt=""
							className='h-full w-[100vw]'
							width={2000}
							height={1200}
						/>
					</div>
				</div>
				<div className="relative lg:hidden h-96  px-4">
					{/* Decorative image and overlay */}
					<div aria-hidden="true" className="absolute px-4 inset-0 overflow-hidden">
						<Image
							src="/corpoImagenes/Bannerpaginawebcelular.jpg"
							alt=""
							className='h-[55vh] w-[100vw] lg:h-full'
							width={1300}
							height={1200}
						/>
					</div>
				</div>
				<div className="mx-auto flex items-start justify-between w-full h-full ">
					<div style={
						estiloCintilloGris
					} className="flex w-full items-center justify-between">
						<div className='w-full py-5 hidden lg:flex items-center justify-around'>
							<Image src={'/MPPEE.png'} width={200} height={50} alt='imagen no disponible' />
							<Image src={'/logosinfondo.png'} width={250} height={250} alt='imagen no disponible' />
							<Image src={'/corpoImagenes/unervensinfondorecortada.png'} width={200} height={50} alt='imagen no disponible' />
							<Image src={'/corpoImagenes/vietvensinfondorecortada.png'} width={200} height={50} alt='imagen no disponible' />
						</div>
					</div>
				</div>

				<div className='h-48 grid grid-cols-2 lg:hidden items-center justify-around'>
					<div className='flex items-center justify-center'>
						<Image src={'/MPPEE.png'} width={100} height={100} alt='imagen no disponible' />
					</div>
					<div className='flex items-center justify-center'>
						<Image src={'/logosinfondo.png'} width={125} height={125} alt='imagen no disponible' />
					</div>
					<div className='flex items-center justify-center'>
						<Image src={'/logounerven.png'} width={100} height={100} alt='imagen no disponible' />
					</div>
					<div className='flex items-center justify-center'>
						<Image src={'/vietverdetransparente.png'} width={100} height={100} alt='imagen no disponible' />
					</div>
				</div>
				{children}
				{/* <div data-aos="fade-up" className={`mt-5 mx-auto max-w-7xl mb-20 flex justify-center items-center px-4 transition-all duration-500 ease-in-out sm:px-6 lg:px-8`}>
					<Contactenos />
				</div> */}
				<CustomFooter />
				<FloatingIcon icon={<Image src="/ImagesCadeteSiempre/whatsapp.svg" width={50} height={50} alt="" />} />
			</body>
		</html>
	)
}
