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

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logoespirales.png" sizes="any" />
        <title>
          Corpoelec Industrial
        </title>
      </head>
      <body className={inter.className}>
        <CustomHeader />
        <div data-aos="fade-up" className="relative h-96 mt-10 px-20">
				{/* Decorative image and overlay */}
				<div aria-hidden="true" className="absolute  px-20 rounded-md  inset-0 overflow-hidden">
					<Image
						src="/portadacatalogo2.jpg"
						alt=""
						className="h-full w-full object-cover object-center rounded-md"
						width={1000}
						height={1000}
					/>
				</div>
				<div aria-hidden="true" className="absolute rounded-md mx-20 bg-slate-800  inset-0  opacity-50" />
				<div className="relative mx-auto h-96 w-full flex rounded-md    flex-col items-center justify-center px-6  text-center sm:py-16 lg:px-60">
					<Image
						src="/logovolumetricoBlanco.png"
						alt=""
						className="lg:h-full lg:w-full  object-center"
						width={1000}
						height={1000}
					/>
				</div>
			</div>
        {children}
        <div data-aos="fade-up" className={`mt-5 mx-auto max-w-7xl mb-20 flex justify-center items-center bg-white px-4 transition-all duration-500 ease-in-out sm:px-6 lg:px-8`}>
					<Contactenos />
				</div>
        <CustomFooter />
        <FloatingIcon icon={<Image src="/ImagesCadeteSiempre/whatsapp.svg" width={50} height={50} alt="" />} />
      </body>
    </html>
  )
}
