import './globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomHeader from '@/components/header/Index'
import { Inter } from 'next/font/google'
import CustomFooter from '@/components/CustomFooter'
import Image from 'next/image';
import FloatingIcon from '@/components/FloatingIcon';
import Contactenos from '@/components/Contactenos';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
	const estiloComponente = {
		backgroundImage: 'url("/fondo2.jpg")',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'repeat',
		width: '100%',
		height: '100vh',
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
				<div className="relative h-96  px-4">
					{/* Decorative image and overlay */}
					<div aria-hidden="true" className="absolute px-4 inset-0 overflow-hidden">
						<Image
							src="/corpoImagenes/bannerpagweg.jpg"
							alt=""
							className="h-full w-full object-cover object-center "
							width={1000}
							height={1000}
						/>
					</div>
					<div aria-hidden="true" className="absolute  mx-4 bg-slate-800  inset-0  opacity-50" />
					<div className="relative mx-auto h-96 w-full flex flex-col items-center justify-center px-6  text-center sm:py-16 lg:px-60">
						<Image
							src="/logovolumetricoBlanco.png"
							alt=""
							className="lg:h-full lg:w-full  object-center"
							width={1000}
							height={1000}
						/>
					</div>
				</div>
				<div className='h-48 hidden lg:flex items-center justify-around'>
					<Image src={'/MPPEE.png'} width={200} height={200} alt='imagen no disponible' />
					<Image src={'/logosinfondo.png'} width={250} height={250} alt='imagen no disponible' />
					<Image src={'/logounerven.png'} width={200} height={200} alt='imagen no disponible' />
					<Image src={'/vietverdetransparente.png'} width={200} height={200} alt='imagen no disponible' />
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
