'use client'
import Image from 'next/image';
import ItemProduct from './ItemProduct';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';


export default function ProductList({ products }) {

	useEffect(() => {
		AOS.init({
			once: true,      
			easing: 'ease',  
			delay: 700   
		  });
	}, []);

	return (
		<div
			className=" h-auto lg:px-20 pt-10 pb-20  bg-slate-100 "
		//className="px-5 md:px-28 py-10 bg-gradient-to-b from-slate-100 grid grid-cols-1 gap-x-6 gap-y-5 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8"
		>
			{/* {products.map((product) => <ItemProduct key={product.id} product={product} />)} */}
			<h1 data-aos="fade-up" className="text-4xl font-bold mb-10 mt-10 text-center  ">Transformadores</h1>
			<div data-aos="fade-up" className='flex bg-white h-96 rounded-2xl shadow-2xl p-2'>
				<div className='w-1/2 h-full flex flex-col gap-2'>
					<div className=' h-1/2'>
						<Image src={'/ImagesCadeteSiempre/transf003.jpeg'} className='w-full' width={400} height={150} />
					</div>
					<div className='flex h-1/2'>
						<Image src={'/ImagesCadeteSiempre/transf002.jpeg'} className='w-1/2 h-full' width={200} height={200} />
						<Image src={'/ImagesCadeteSiempre/transf001.jpeg'} className='w-1/2 h-full' width={200} height={200} />
					</div>
				</div>
				<div className='w-1/2 bg-gradient-to-r from-azulPantone to-rojoPantone text-white rounded-lg  '>
					<h1 className="text-xl font-bold mb-4 text-center  ">Transformadores Monofasicos </h1>
					<p className='px-4'>
						Son Transformadores monofásicos de
						distribución tipo Intemperie sumergido en
						Aceite liquido dieléctrico, con una
						Potencia Nominal desde 10 KVA hasta
						100 KVA; para ser instalados en el
						Sistema Eléctrico Nacional (SEN), en
						redes de distribución.
					</p>
					<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades</h1>
					<div className='grid grid-cols-2 gap-4 p-4'>
						<p className='text-center'>10 KVA</p>
						<p className='text-center'>15 KVA</p>
						<p className='text-center'>25 KVA</p>
						<p className='text-center'>37.5 KVA</p>
						<p className='text-center'>50 KVA</p>
						<p className='text-center'>75 KVA</p>
						<p className='text-center'>100 KVA</p>
					</div>

				</div>
			</div>
			<div data-aos="fade-up"  className='flex justify-center bg-white h-96 mt-20 rounded-2xl shadow-2xl '>
				<div className='flex w-5/6'>
					<div className='w-1/2 bg-gradient-to-r from-azulPantone to-rojoPantone text-white rounded-lg '>
						<h1 className="text-xl font-bold mb-4 text-center  ">Transformadores Monofasicos Sumergible</h1>
						<p className='px-4'>
							Los transformadores de distribución
							monofásico sumergible son un tipo de
							transformador diseñado para uso en sótanos
							y casillas.
						</p>
						<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades</h1>
						<div className='grid grid-cols-2 gap-4 p-4'>
							<p className='text-center'>550 KVA</p>
							<p className='text-center'>333 KVA</p>
							<p className='text-center'>250 KVA</p>
							<p className='text-center'>167.5 KVA</p>
							<p className='text-center'>100 KVA</p>
						</div>
					</div>
					<div className='w-1/2 h-full flex justify-center gap-2'>
						<div className=' h-full'>
							<Image src={'/ImagesCadeteSiempre/transf004.jpg'} className='w-full h-full' width={400} height={150} />
						</div>
					</div>
				</div>
			</div>
			<div data-aos="fade-up" className='flex justify-center items-center bg-white p-5 mt-20 rounded-2xl shadow-2xl'>
				<div className='h-auto  w-5/6'>
					<div className='flex h-auto w-full bg-gradient-to-r from-azulPantone to-rojoPantone text-white rounded-lg '>
						<div className='w-1/2'>
							<h1 className="text-xl font-bold mb-4 text-center  ">Transformadores Trifasicos Sumergible</h1>
							<p className='px-4'>
								Los transformadores de distribución
								monofásico sumergible son un tipo de
								transformador diseñado para uso en sótanos
								y casillas.
							</p>
						</div>
						<div className='w-1/2'>
							<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades</h1>
							<div className='grid grid-cols-2 gap-4 p-4'>
								<p className='text-center'>550 KVA</p>
								<p className='text-center'>333 KVA</p>
								<p className='text-center'>250 KVA</p>
								<p className='text-center'>167.5 KVA</p>
								<p className='text-center'>100 KVA</p>
							</div>
						</div>
					</div>
					<div className=' w-full flex justify-center gap-2 h-1/2'>
						<div className='w-1/2'>
							<Image src={'/ImagesCadeteSiempre/transf005.jpeg'} className='w-full h-full' width={400} height={70} />
						</div>
						<div className='w-1/2'>
							<Image src={'/ImagesCadeteSiempre/transf006.jpeg'} className='w-full h-full' width={400} height={70} />
						</div>
					</div>
				</div>
			</div>
			<h1 data-aos="fade-up" className="text-4xl font-bold mb-10 mt-10 text-center  ">Luminarias</h1>
			<div data-aos="fade-up" className=' bg-white p-5 mt-20 rounded-2xl shadow-2xl'>
				<div className='flex h-1/2'>
					<div className='flex w-1/2'>
						<div data-aos="fade-up" className='w-1/2 p-2'>
							<Image src={'/ImagesCadeteSiempre/lum001.jpg'} className='w-full h-full' width={400} height={70} />
						</div>
						<div data-aos="fade-up" className='w-1/2 flex flex-col justify-between p-5 bg-gradient-to-r from-azulPantone to-rojoPantone text-white rounded-lg '>
							<h1 className='text-lg font-bold'>Lámpara alumbrado público
								Tipo splash 100w</h1>
							<h1 className='text-xl'> Capacidad</h1>
							<div className='text-xl'>
								<p>100W</p>
								<p>150W</p>
								<p>200W</p>
							</div>
							<h1 className='text-lg font-bold'>3 años de Garantia</h1>
						</div>
					</div>
					<div data-aos="fade-up" className='flex w-1/2'>
						<div className='w-1/2 p-2'>
							<Image src={'/ImagesCadeteSiempre/lum003.jpg'} className='w-full h-full' width={400} height={70} />
						</div>
						<div className='w-1/2 p-10 flex flex-col justify-between items-center bg-gradient-to-r from-azulPantone to-rojoPantone text-white rounded-lg '>
							<h1 className='font-bold'>Bulbo LED 12w</h1>
							<h1 className='text-lg font-bold'>3 años de Garantia</h1>
						</div>
					</div>
				</div>
				<div className='flex justify-center h-1/2'>
					<div data-aos="fade-up" className='flex w-1/2'>
						<div className='w-1/2 p-2'>
							<Image src={'/ImagesCadeteSiempre/lum004.jpg'} className='w-full h-full' width={400} height={70} />
						</div>
						<div className='w-1/2 p-10 h-full flex flex-col justify-between items-center bg-gradient-to-r from-azulPantone to-rojoPantone text-white rounded-lg '>
							<h1 className='font-bold'>Panel superficial
								18w LED</h1>
							<h1 className='text-lg font-bold'>3 años de Garantia</h1>
						</div>
					</div>
				</div>
			</div>
			<h1 data-aos="fade-up" className="text-4xl font-bold mb-20 mt-20 text-center ">Paneles Solares</h1>
			<div data-aos="fade-up" className='flex bg-white h-auto rounded-2xl shadow-2xl'>
				<div className='w-1/2 h-full flex flex-col gap-2'>
					<div className=' h-full'>
						<Image src={'/ImagesCadeteSiempre/panelessolares.jpeg'} className='w-full' width={400} height={150} />
					</div>
				</div>
				<div className='w-1/2 flex items-center bg-gradient-to-r from-azulPantone to-rojoPantone text-white rounded-lg '>
					<p className='px-4 text-2xl font-bold'>
						Los paneles solares son módulos fotovoltaicos
						individuales que captan la energía que
						proporciona el sol convirtiéndola en electricidad.
						Están formados por celdas solares que a su vez
						contienen células solares individuales hechas de
						materiales semiconductores como el silicio, que
						transforman la luz en energía eléctrica.
					</p>
				</div>
			</div>
			<h1 data-aos="fade-up" className="text-4xl font-bold mb-20 mt-20 text-center  ">Aerogeneradores</h1>
			<div data-aos="fade-up" className='flex bg-white h-auto rounded-2xl shadow-2xl'>
				<div className='w-1/2 h-1/2 flex flex-col gap-2'>
					<div className=' h-1/2'>
						<Image src={'/ImagesCadeteSiempre/vetorgenerador.jpeg'} className='w-full h-1/2' width={400} height={150} />
					</div>
				</div>
				<div className='w-1/2 flex items-center bg-gradient-to-r from-azulPantone to-rojoPantone text-white rounded-lg '>
					<p className='px-4 text-2xl font-bold '>
						Los aerogeneradores son una forma de energía
						sostenible capaces de convertir la energía del
						viento en electricidad. La principal materia prima
						de un aerogenerador es el uso del viento, que
						moverá las palas del mismo, hasta llegar a la
						producción sostenida de electricidad con ayuda de
						otros componentes.
					</p>
				</div>
			</div>
			{/* <h1 data-aos="fade-up" className="text-4xl font-bold mb-10 mt-10 text-center  ">Fabrica de Uniformes</h1>
			<div data-aos="fade-up" className='flex bg-white h-auto'>
				<div className='w-1/2 h-full flex flex-col gap-2'>
					<div className=' h-1/2'>
						<Image src={'/Uniformes2.jpeg'} className='w-full' width={400} height={150} />
					</div>
					<div className='flex h-1/2'>
						<Image src={'/Uniformes1.jpeg'} className='w-1/2 h-full' width={200} height={200} />
					</div>
				</div>
				<div className='w-1/2'>
					<p className='px-4'>
						Producción de franelas, chemises,
						pantalones y bragas para el
						personal del sector y entes
						gubernamentales.
					</p>
				</div>
			</div> */}
		</div>
	)
}
