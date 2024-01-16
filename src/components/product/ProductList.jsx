'use client'
import Image from 'next/image';
import ItemProduct from './ItemProduct';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function ProductList({ producto }) {
	const [product, setProduct] = useState(producto);
	const router = useRouter()

	useEffect(() => {
		AOS.init({
			once: true,
			easing: 'ease',
			delay: 700
		});
	}, []);

	return (
		<div className=" h-auto">
			<div style={{ backgroundColor: '#172168' }} className='h-auto hidden py-4 lg:h-96 w-full mt-10 lg:block lg:py-0 lg:relative '>
				<div className='lg:absolute lg:top-24 w-full '>
					<div className='flex flex-col items-center gap-4 lg:flex-row lg:justify-between w-full px-4 lg:px-10'>
						<div onClick={() => router.push('/productos/LED')} style={{ backgroundColor: '#65BCE0' }} className='h-80 w-full lg:w-52 xl:w-64  flex flex-col rounded-lg miDiv hover:miDivHover'>
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
								<p>Descubre más</p>
							</div>
						</div>
						<div onClick={() => router.push('/productos/AlumbradoPublico')} style={{ backgroundColor: '#65BCE0' }} className='h-80 w-full lg:w-52 xl:w-64   rounded-lg miDiv4 hover:miDivHover4'>
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
								<h1 className='text-2xl font-bold'>Alumbrado Público</h1>
								<p>Descubre más</p>
							</div>
						</div>
						<div onClick={() => router.push('/productos/Transformadores')} style={{ backgroundColor: '#65BCE0' }} className=' h-80 w-full lg:w-52 xl:w-64    rounded-lg miDiv2 hover:miDivHover2'>
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
								<p>Descubre más</p>
							</div>
						</div>
						<div onClick={() => router.push('/productos/EnergiasRenovables')} style={{ backgroundColor: '#65BCE0' }} className='h-80 w-full miDiv3 xl:w-64  hover:miDivHover3 lg:w-52  rounded-lg'>
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
								<h1 className='text-2xl font-bold'>Energías Renovables</h1>
								<p>Descubre más</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style={{ backgroundColor: '#172168' }} className='h-auto  py-4 lg:h-96 w-full mt-10 lg:hidden lg:py-0 lg:relative '>
				<div className='lg:absolute lg:top-24 w-full '>
					<div className='flex flex-col items-center gap-4 lg:flex-row lg:justify-between w-full px-4 lg:px-10'>
						<div onClick={() => router.push('/productos/LED')} style={{ backgroundColor: '#65BCE0' }} className='h-80 w-full lg:w-52 xl:w-64 miDivCatTelefono  flex flex-col rounded-lg '>
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
								<p>Descubre más</p>
							</div>
						</div>
						<div onClick={() => router.push('/productos/AlumbradoPublico')} style={{ backgroundColor: '#65BCE0' }} className='h-80 w-full miDivCatTelefono4 lg:w-52 xl:w-64 rounded-lg '>
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
								<h1 className='text-2xl font-bold'>Alumbrado Público</h1>
								<p>Descubre más</p>
							</div>
						</div>
						<div onClick={() => router.push('/productos/Transformadores')} style={{ backgroundColor: '#65BCE0' }} className=' h-80 w-full miDivCatTelefono2 lg:w-52 xl:w-64 rounded-lg '>
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
								<p>Descubre más</p>
							</div>
						</div>
						<div onClick={() => router.push('/productos/EnergiasRenovables')} style={{ backgroundColor: '#65BCE0' }} className='h-80 w-full miDivCatTelefono3 xl:w-64 lg:w-52 rounded-lg'>
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
								<h1 className='text-2xl font-bold'>Energías Renovables</h1>
								<p>Descubre más</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-20">
				{
					product === 'AlumbradoPublico' && <div className="w-full">
						<div className=" flex justify-center w-full ">
							<h1 className="text-2xl px-10 uppercase lg:text-4xl  w-auto font-bold bg-blue-900 text-white text-center">
								Alumbrado Público
							</h1>
						</div>
						<div className='w-full flex flex-col lg:flex-row'>
							<div className="w-full lg:w-1/2 gap-5  py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-lg lg:text-2xl font-bold'>Luminaria Tipo Splash</h1>
								</div>
								<div>
									<p className=' lg:text-xl '>AC100-265V</p>
									<p className=' text-md lg:text-xl '>100W</p>
									<p className=' text-md lg:text-xl '>150W</p>
									<p className=' text-md lg:text-xl '>200W</p>
									<p className=' text-md lg:text-xl '>300W</p>
								</div>
								<div>
									<p className='font-bold text-md lg:text-2xl '>Garantía de 3 años</p>
								</div>
							</div>
							<div className="w-full lg:w-1/2 py-10 flex flex-col items-center justify-center">
								<div className='flex'>
									<Image src={'/corpoImagenes/LuminariasdeAlumbradoPúblicoSinFondo.png'}
										width={300}
										height={400}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>
							</div>
						</div>
						<div className=" w-full flex justify-center">
							<h1 className="text-xl px-10 uppercase lg:text-4xl w-auto font-bold bg-blue-900 text-white">
								Luminarias LED Solares
							</h1>
						</div>
						<div className='w-full flex flex-col lg:flex-row'>
							<div className="w-full gap-5 lg:w-1/2 pt-5 lg:py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-lg lg:text-2xl font-bold'>LED Solar Street Light</h1>
								</div>
								<div>
									<p className=' text-md lg:text-xl '>250W</p>
									<p className=' text-md lg:text-xl '>6500k</p>
								</div>
								<div>
									<p className='font-bold text-lg lg:text-2xl '>Garantía de 2 años</p>
								</div>
							</div>
							<div className="w-full lg:w-1/2 pb-5 lg:py-10 flex flex-col items-center justify-center">
								<div className='flex h-[300px]'>
									<Image src={'/corpoImagenes/LEDSolarStreetLightSinFondo.png'}
										width={300}
										height={400}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>
							</div>
						</div>
						<div className='w-full flex flex-col lg:flex-row'>
							<div className="w-full order-2 lg:order-1 lg:w-1/2 pb-5 lg:py-10 flex flex-col items-center justify-center">
								<div className='flex flex-col lg:flex-row lg:h-[300px]'>
									<Image src={'/corpoImagenes/LedSolarStreetLight150wSinFondo.png'}
										width={300}
										height={200}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>
							</div>
							<div className="w-full gap-5 order-1 lg:order-2 lg:w-1/2 pt-5 lg:py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-lg lg:text-2xl font-bold'>Led Solar Street Light 150W</h1>
								</div>
								<div>
									<p className='text-md lg:text-xl '>150W</p>
									<p className='text-md lg:text-xl '>6500k</p>
								</div>
								<div>
									<p className='font-bold text-lg lg:text-2xl '>Garantía de 2 años</p>
								</div>
							</div>
						</div>
						<div className='w-full flex flex-col lg:flex-row'>
							<div className="w-full gap-5 lg:w-1/2 pt-5 lg:py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-lg lg:text-2xl font-bold'>LED Solar Flood Light</h1>
								</div>
								<div>
									<p className=' text-md lg:text-xl '>200W</p>
									<p className=' text-md lg:text-xl '>300W</p>
									<p className=' text-md lg:text-xl '>6500k</p>
								</div>
								<div>
									<p className='font-bold text-lg lg:text-2xl '>Garantía de 2 años</p>
								</div>
							</div>
							<div className="w-full lg:w-1/2 pb-5 lg:py-10 flex flex-col items-center justify-center">
								<div className='flex h-[300px]'>
									<Image src={'/corpoImagenes/LEDSolarFloodLightSinFondo.png'}
										width={300}
										height={400}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>
							</div>
						</div>
						<div className='w-full flex flex-col lg:flex-row'>
							<div className="w-full order-2 lg:order-1 lg:w-1/2 pb-5 lg:py-10 flex flex-col items-center justify-center">
								<div className='flex flex-col lg:flex-row lg:h-[300px]'>
									<Image src={'/corpoImagenes/LEDSolarLightRedondaSinFondo.png'}
										width={300}
										height={200}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>
							</div>
							<div className="w-full gap-5 order-1 lg:order-2 lg:w-1/2 pt-5 lg:py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-lg lg:text-2xl font-bold'>LED Solar Light Redonda</h1>
								</div>
								<div>
									<p className='text-md lg:text-xl '>250W</p>
									<p className='text-md lg:text-xl '>6500k</p>
								</div>
								<div>
									<p className='font-bold text-lg lg:text-2xl '>Garantía de 2 años</p>
								</div>
							</div>
						</div>
						<div style={{ backgroundColor: '#172168' }} className='h-96 w-full mt-10 relative '>
							<div className='w-full h-full flex flex-col justify-center items-center text-white py-10'>
								<h1 className='text-lg lg:text-2xl mb-10'>Contiene:</h1>
								<div className='grid grid-cols-2 gap-4 text-center'>
									<p className="text-md lg:text-xl">Mini panel solar</p>
									<p className="text-md lg:text-xl">Reflector con tecnología LED</p>
									<p className="text-md lg:text-xl">Control Remoto</p>
									<p className="text-md lg:text-xl">Baterías AAA</p>
									<p className="text-md lg:text-xl">Tornillos para las bases</p>
								</div>
							</div>
						</div>
					</div>
				}
				{
					product === 'LED' && <div>
						<div className="w-full flex justify-center ">
							<h1 className="text-2xl pl-10 uppercase lg:text-4xl w-auto text-center font-bold bg-blue-900 text-white px-5">
								Luminarias LED
							</h1>
						</div>
						<div className='  p-5 lg:mt-20'>
							<div className='flex flex-col lg:flex-row h-1/2'>
								<div className='w-full lg:w-1/2'>
									<h1 className='text-2xl p-5  text-black text-center font-bold'>Bombillo Alta Tensión</h1>
									<div className='flex flex-col lg:flex-row w-full '>
										<div className=' w-full order-2 lg:order-1 lg:w-1/2 p-2 h-[300px]'>
											<Image src={'/corpoImagenes/BombilloAltaTensiónSinFondo.png'} className='w-full h-full' width={400} height={70} alt="imagen no disponible" />
										</div>
										<div className='w-full order-1 lg:order-2 lg:w-1/2 h-[300px] flex flex-col justify-between p-5 text-black rounded-lg '>
											<h1 className=' text-lg font-bold text-center lg:text-xl'> Capacidad</h1>
											<div className=' text-md grid grid-cols-2  text-center lg:text-xl'>
												<p>20W</p>
												<p>30W</p>
												<p>40W</p>
												<p>50W</p>
												<p>70W</p>
												<p>100W</p>
											</div>
											<h1 className='text-lg text-center font-bold'>3 años de Garantía</h1>
										</div>
									</div>

								</div>
								<div className='w-full lg:w-1/2'>
									<h1 className='text-2xl p-5  text-black text-center font-bold'>Bulbo LED</h1>
									<div className='flex flex-col lg:flex-row w-full'>
										<div className=' w-full order-2 lg:order-1 lg:w-1/2 p-2 h-[300px]'>
											<Image src={'/corpoImagenes/BombilloLedSinFondo.png'} className='w-full h-full' width={400} height={70} alt="imagen no disponible" />
										</div>
										<div className=' w-full order-1 lg:order-2 lg:w-1/2 h-[100px] lg:h-[300px] p-5 lg:p-10 flex flex-col justify-between items-center text-black rounded-lg '>
											<h1 className='text-lg font-bold lg:text-xl'> Capacidad</h1>
											<div className='text-md lg:text-xl'>
												<p>9W</p>
												<p>12W</p>
											</div>
											<h1 className='text-lg font-bold'></h1>
										</div>
									</div>
								</div>

							</div>
							<div className='flex justify-center h-1/2'>
								<div className='w-full lg:w-1/2'>
									<h1 className='text-2xl p-5  text-black text-center font-bold'>Lámpara Led</h1>
									<div className='flex flex-col lg:flex-row w-full'>
										<div className='w-full lg:w-1/2 order-2 lg:order-1 p-2 h-[300px]'>
											<Image src={'/corpoImagenes/lamparaledsinfondo.png'} className='w-full h-full' width={400} height={70} alt="imagen no disponible" />
										</div>
										<div className='w-full lg:w-1/2 order-1 lg:order-2 h-[100px] lg:h-[300px] p-5 lg:p-10  flex flex-col justify-between items-center text-black rounded-lg '>
											<h1 className='text-lg font-bold lg:text-xl'> Capacidad</h1>
											<div className='text-md lg:text-xl'>
												<p>10W</p>
											</div>
											<h1 className='text-lg font-bold'></h1>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full flex justify-center ">
								<h1 className="text-2xl pl-4 uppercase lg:text-4xl text-center  w-auto font-bold bg-blue-900 text-white px-5">
									Reflectores
								</h1>
							</div>
							<div className='w-full flex flex-col lg:flex-row'>

								<div className="w-full lg:w-1/2 pt-5 gap-5 lg:py-10 flex flex-col items-center justify-between">
									<div>
										<h1 className='text-center text-lg lg:text-2xl font-bold'>Capacidad</h1>
									</div>
									<div className=' text-md grid grid-cols-2 gap-2 text-center lg:text-xl'>
										<p className='text-md lg:text-xl '>150W</p>
										<p className='text-md lg:text-xl '>200W</p>
										<p className='text-md lg:text-xl '>300W</p>
										<p className='text-md lg:text-xl '>400W</p>
										<p className='text-md lg:text-xl '>600W</p>
										<p className='text-md lg:text-xl '>800W</p>
										<p className='text-md lg:text-xl '>1000W</p>
									</div>
									<div>
										<p className='font-bold text-lg lg:text-2xl '>Garantía de 5 años</p>
									</div>
								</div>
								<div className="w-full lg:w-1/2 pb-5 lg:py-10 flex flex-col items-center justify-center">
									<div className='flex h-[400px]'>
										<Image src={'/corpoImagenes/ReflectoresLedSinFondo.png'}
											width={400}
											height={200}
											className='rounded-md'
											alt='imagen no disponible'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full flex justify-center ">
							<h1 className="text-2xl px-10 uppercase lg:text-4xl text-center w-auto font-bold bg-blue-900 text-white">
								Tubo LED T8
							</h1>
						</div>
						<div className='w-full flex flex-col lg:flex-row'>
							<div className="w-full lg:w-1/2 order-2 lg:order-1 pb-5 lg:py-10 flex flex-col items-center justify-center">
								<div className='flex h-[300px]'>
									<Image src={'/corpoImagenes/TuboLEDSinFondo.png'}
										width={300}
										height={200}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>
							</div>
							<div className="w-full lg:w-1/2 order-1 lg:order-2 pt-5 gap-5 lg:py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-lg lg:text-2xl font-bold'>Capacidad</h1>
								</div>
								<div>
									<p className=' text-md lg:text-xl '>9W</p>
									<p className=' text-md lg:text-xl '>18w</p>
								</div>
								<div>
									<p className='font-bold text-lg lg:text-2xl '></p>
								</div>
							</div>
						</div>
					</div>
				}
				{
					product === 'Transformadores' && <div className="w-full">
						<div className="w-full flex justify-center mb-10 px-4">
							<h1 className="text-xl px-10 uppercase lg:text-4xl w-auto text-center font-bold bg-blue-900 text-white">
								Transformadores Monofásico
							</h1>
						</div>
						<div className='flex flex-col mb-10 lg:flex-row w-fit h-auto  overflow-hidden justify-center px-5'>
							<div className='w-full order-2 lg:order-1 lg:w-1/2 h-fit flex flex-col  items-center gap-2'>
								<div className=' h-1/2'>
									<Image src={'/corpoImagenes/TransformadorMonofasicoSinFondo.png'} className='' width={400} height={150} alt='Imagen No Disponible' />
								</div>
							</div>
							<div className='w-full order-1 lg:order-2 lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center justify-center  text-black '>
								<h1 className="text-xl font-bold mb-4 text-center  ">Transformadores Monofásicos </h1>
								<p className='px-4 text-justify'>
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
									<p className='px-4 text-md lg:text-lg '>TX&#39;S Monofásico 10 KVA Distribución</p>
									<p className='px-4 text-md lg:text-lg '>TX&#39;S Monofásico 15 KVA Distribución</p>
									<p className='px-4 text-md lg:text-lg '>TX&#39;S Monofásico 25 KVA Distribución</p>
									<p className='px-4 text-md lg:text-lg '>TX&#39;S Monofásico 37.5 KVA Distribución</p>
									<p className='px-4 text-md lg:text-lg '>TX&#39;S Monofásico 50 KVA Distribución</p>
									<p className='px-4 text-md lg:text-lg '>TX&#39;S Monofásico 75 KVA Distribución</p>
									<p className='px-4 text-md lg:text-lg '>TX&#39;S Monofásico 100 KVA Distribución</p>
								</div>

							</div>
						</div>
						<div className=" w-full flex justify-center text-center px-4">
							<h1 className="text-xl px-10 uppercase lg:text-4xl w-auto font-bold bg-blue-900 text-white">
								Monofásico Sumergible
							</h1>
						</div>
						<div className='flex flex-col lg:flex-row w-fit h-auto  overflow-hidden justify-center px-5'>
							<div className='w-full order-2 lg:order-1 lg:w-1/2 h-fit flex flex-col  items-center gap-2'>
								<div className=' h-1/2'>
									<Image src={'/corpoImagenes/TansformadorMonofasicoSumergibleSinFondo.png'} className='w-[400px] h-[400px]' width={400} height={150} alt="imagen no disponible" />
								</div>
							</div>
							<div className='w-full order-1 lg:order-2 lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center justify-center  text-black '>
								<h1 className="text-xl font-bold mb-4 text-center  ">Transformadores Monofásicos Sumergible</h1>
								<p className='px-4 text-justify'>
									Los transformadores de distribución
									monofásico sumergible son un tipo de
									transformador diseñado para uso en sótanos
									y casillas.
								</p>
								<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades</h1>
								<div className='grid grid-cols-2 gap-4 p-4'>
									<p className='text-center lg:text-lg'>TX&#39;S 1F Sumergible 167.5 KVA Distribución</p>
									<p className='text-center lg:text-lg'>TX&#39;S 1F Sumergible 250 KVA Distribución</p>
									<p className='text-center lg:text-lg'>TX&#39;S 1F Sumergible 333 KVA Distribución</p>
									<p className='text-center lg:text-lg'>TX&#39;S 1F Sumergible 500 KVA Distribución</p>
								</div>
							</div>
						</div>
						<div className=" w-full flex justify-center">
							<h1 className="text-xl px-10 uppercase  lg:text-4xl text-center  w-auto font-bold bg-blue-900 text-white">
								Trifásicos Sumergible
							</h1>
						</div>
						<div className='flex flex-col lg:flex-row w-fit h-auto  overflow-hidden justify-center px-5'>
							<div className='w-full order-2 lg:order-1 lg:w-1/2 h-fit flex flex-col  items-center gap-2'>
								<div className=' h-1/2'>
									<Image src={'/corpoImagenes/TransformadorTrifasicoSinFondo.png'} className='w-[400px] h-[350px]' width={400} height={150} alt="imagen no disponible" />
								</div>
							</div>
							<div className='w-full order-1 lg:order-2 lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center justify-center  text-black '>
								<div className=' p-5'>
									<h1 className="text-xl font-bold mb-4 text-center  ">Transformadores Trifásicos Sumergible</h1>
									<p className='px-4 text-justify'>
										Los transformadores de distribución
										monofásico sumergible son un tipo de
										transformador diseñado para uso en sótanos
										y casillas.
									</p>
								</div>
								<div className=' p-5'>
									<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades</h1>
									<div className='grid grid-cols-2 gap-4 p-4'>
										<p className='text-center'>TX&#39;S 3F Sumergible 150 KVA Distribución</p>
										<p className='text-center'>TX&#39;S 3F Sumergible 300 KVA Distribución</p>
										<p className='text-center'>TX&#39;S 3F Sumergible 500 KVA Distribución</p>
										<p className='text-center'>TX&#39;S 3F Sumergible 750 KVA Distribución</p>
										<p className='text-center'>TX&#39;S 3F Sumergible 1000 KVA Distribución</p>
										<p className='text-center'>TX&#39;S 3F Sumergible 1500 KVA Distribución</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
				{
					product === 'EnergiasRenovables' && <div className="w-full">
						<div className=" w-full flex justify-center lg:my-10">
							<h1 className="text-2xl  px-10 uppercase lg:text-4xl w-auto font-bold bg-blue-900 text-white">
								Paneles Solares
							</h1>
						</div>
						<div className='flex flex-col lg:flex-row w-fit h-auto  overflow-hidden justify-center'>
							<div className='w-full order-2 lg:order-1 lg:w-1/2 h-full flex flex-col  items-center justify-center gap-2'>
								<Image src={'/corpoImagenes/PanelesSolaresSinFondo.png'} alt='' width={400} height={150} />
							</div>
							<div className='w-full order-1 lg:order-2 lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center text-black '>
								<p className='px-4 text-md lg:text-lg text-justify '>
									Los paneles solares son módulos fotovoltaicos
									individuales que captan la energía que
									proporciona el sol convirtiéndola en electricidad.
									Están formados por celdas solares que a su vez
									contienen células solares individuales hechas de
									materiales semiconductores como el silicio, que
									transforman la luz en energía eléctrica.
								</p>
								<div className=' p-5'>
									<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades</h1>
									<div className='grid grid-cols-2 gap-4'>
										<p className=''>POLY - MONOCRISTALINO -150 Wp ± 5 %</p>
										<p className=''>43.2v 72 celdas -180 Wp ± 5 %</p>
										<p className=''>44.68v 72 celdas -195 Wp ± 5 %</p>
										<p className=''>30.46v 48 celdas</p>
									</div>
								</div>
							</div>

						</div>
						<div className=" w-full flex justify-center lg:my-10">
							<h1 className="text-2xl px-10 uppercase lg:text-4xl w-auto font-bold bg-blue-900 text-white">
								Aerogeneradores
							</h1>
						</div>
						<div className='flex flex-col px-10 lg:flex-row w-fit h-auto  overflow-hidden justify-center'>
							<div className='w-full p-5  lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center justify-center  text-black '>
								<p className='px-4 text-md lg:text-lg text-justify'>
									Los aerogeneradores son una forma de energía
									sostenible capaces de convertir la energía del
									viento en electricidad. La principal materia prima
									de un aerogenerador es el uso del viento, que
									moverá las palas del mismo, hasta llegar a la
									producción sostenida de electricidad con ayuda de
									otros componentes.
								</p>
								<div className='py-5'>
									<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades</h1>
									<div className='grid grid-cols-2 gap-4'>
										<p className='text-center'>ABP-1500W/24V – 2 Helices</p>
										<p className='text-center'>ABP-3000W/24V – 2 Helices</p>
										<p className='text-center'>ABP-6000W/24V – 3 Helices</p>
									</div>
								</div>
							</div>
							<div className='w-full h-1/2 lg:w-1/2 lg:h-fit flex flex-col  items-end justify-center gap-2'>
								<Image src={'/corpoImagenes/Aereogenerador.png'} alt='' width={400} height={150} />
							</div>
						</div>
						<div className=" w-full flex justify-center lg:my-10">
							<h1 className="text-2xl px-10 uppercase lg:text-4xl font-bold bg-blue-900 text-white">
								Power Core
							</h1>
						</div>
						<div className='flex w-full flex-col lg:flex-row  h-auto  overflow-hidden justify-center'>
							<div className='w-full  order-2 lg:order-1 lg:w-1/2 h-fit flex flex-col  items-center gap-2'>
								<Image src={'/corpoImagenes/PowerCoreSinFondo.png'} alt='' width={400} height={150} />
							</div>
							<div className='w-full  order-1 lg:order-2 lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center justify-center  text-black '>
								<div className=' p-5'>
									<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades</h1>
									<div className='grid grid-cols-2 gap-4 p-4'>
										<p className='text-center'>700W</p>
										<p className='text-center'>1000W</p>
										<p className='text-center'>2000W</p>
									</div>
								</div>
							</div>

						</div>
						<div className=" w-full flex justify-center lg:my-10">
							<h1 className="text-2xl px-10 uppercase lg:text-4xl w-auto font-bold bg-blue-900 text-white">
								INVERSORES
							</h1>
						</div>
						<div className='flex flex-col lg:flex-row w-full h-auto  overflow-hidden justify-center'>
							<div className='w-full p-5  lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center text-black '>
								<h1 className="text-lg lg:text-xl font-bold lg:mb-5 lg:mt-10 text-center">Inversores Cargadores</h1>
								<p className='px-4 text-md lg:text-lg '> Potencias Disponibles desde 3kw hasta 60kw en 24V/48V
								</p>
								<p className='px-4 text-md lg:text-lg '>Carga de Bateria de Acido, Gel y Litio</p>
							</div>
							<div className='w-full h-1/2 lg:w-1/2 lg:h-fit flex flex-col  items-center gap-2'>
								<Image src={'/corpoImagenes/InversorCargadorSinFondo.png'} alt='' width={400} height={150} />
							</div>
						</div>
						<div className='flex flex-col lg:flex-row w-full h-auto  overflow-hidden justify-center'>
							<div className='w-full order-2 lg:order-1 h-1/2 lg:w-1/2 lg:h-fit flex flex-col  items-center gap-2'>
								<Image className="h-[400px]" src={'/corpoImagenes/InversorHibridoSinFondo.png'} alt='' width={400} height={75} />
							</div>
							<div className='w-full p-5 order-1 lg:order-2 lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center text-black '>
								<h1 className="text-lg lg:text-xl font-bold lg:my-5 text-center">Inversores Hibridos</h1>
								<p className='px-4 text-md lg:text-lg '> Potencias Disponibles desde 3kw hasta 60kw en 24V/48V
								</p>
								<p className='px-4 text-md lg:text-lg '>Carga de Bateria de Acido, Gel y Litio</p>
							</div>
						</div>
						<div className=" w-full flex justify-center lg:mt-5">
							<h1 className="text-2xl px-10 uppercase lg:text-4xl w-auto font-bold bg-blue-900 text-white">
								Baterias
							</h1>
						</div>
						<div className='flex flex-col lg:flex-row w-full h-auto  overflow-hidden justify-center'>
							<div className='w-full p-5  lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center justify-center  text-black '>
								<h1 className="text-lg my-10 lg:text-xl font-bold lg:mb-10 lg:mt-20 text-center">BATERÍA DE FERROFOSFATO DE LITIO (lifepo4)</h1>
								<div className=' p-5'>
									<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades de Almacenamiento</h1>
									<div className='grid grid-cols-2 gap-4 p-4'>
										<p className='text-center'>12V: 50Ah HASTA 100 Ah</p>
										<p className='text-center'>48V: 50 Ah HASTA 450Ah</p>
										<p className='text-center'><b>Ciclos:</b> 3000 HASTA 8000 (20 AÑOS)</p>
										<p className='text-center'><b>ESCALABILIDAD:</b>HASTA 18 EN PARALELO</p>
									</div>
								</div>
							</div>
							<div className='w-full h-1/2 lg:w-1/2 lg:h-fit flex flex-col  items-center gap-2'>
								<Image src={'/corpoImagenes/ferrofosfatodelitioSinFondo.png'} alt='' width={400} height={150} />
							</div>
						</div>
						<div className='flex flex-col lg:flex-row w-full h-auto  overflow-hidden justify-center'>
							<div className='w-full order-2 lg:order-1 lg:w-1/2 h-fit flex flex-col  items-center gap-2'>
								<Image src={'/corpoImagenes/BateriaDeGelSinFondo.png'} alt='' width={400} height={150} />
							</div>
							<div className='w-full order-1 lg:order-2 lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center text-black '>
								<h1 className="text-lg my-10 lg:text-xl font-bold lg:mb-5 lg:mt-10 text-center">BATERIAS GEL 12V</h1>
								<div className=' p-5'>
									<h1 className="text-xl font-bold mb-4 text-center mt-2 ">Capacidades de Almacenamiento</h1>
									<div className='grid grid-cols-2 gap-4 p-4'>
										<p className='text-center'>50Ah HASTA 200Ah</p>
									</div>
								</div>
							</div>

						</div>
						<div className=" w-full flex justify-center lg:my-10">
							<h1 className="text-2xl px-10 uppercase lg:text-4xl w-auto font-bold bg-blue-900 text-white">
								Bomba Solar de Agua
							</h1>
						</div>
						<div className='flex flex-col lg:flex-row w-fit h-auto  overflow-hidden justify-center px-5'>
							<div className='w-full p-5  lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center  text-black '>
								<h1 className="text-lg lg:text-xl font-bold lg:mb-5 lg:mt-10 text-center">Bomba Solar de Agua</h1>
								<p className='px-4 text-md lg:text-lg text-justify'>
									El modelo S1-200 de LORENTZ, es totalmente portátil, lo que
									permite su uso en diferentes aplicaciones. La bomba sumergible de
									rotor helicoidal puede ser utilizada en un pozo de 4, puede bombear
									agua de un tanque, estanque o arrollo. El mini controlador de la
									bomba tiene todas las entradas necesarias para cumplir con
									cualquier aplicación. Puede bombear más de 26m³ por día
									manejando arreglos fotovoltaicos de hasta 400Wp, o bombear hasta
									40m verticalmente.
								</p>
							</div>
							<div className='w-full h-1/2 lg:w-1/2 lg:h-fit flex flex-col  items-center gap-2'>
								<Image src={'/corpoImagenes/BombaSolarSinFondo.png'} alt='' width={400} height={150} />
							</div>
						</div>
						<div className=" w-full flex justify-center lg:my-10">
							<h1 className="text-2xl px-10 uppercase lg:text-4xl w-auto font-bold bg-blue-900 text-white">
								PLANTA DESALINIZADORA
							</h1>
						</div>
						<div className='flex flex-col lg:flex-row w-fit h-auto  overflow-hidden justify-center lg:px-5'>
							<div className='w-full order-2 lg:order-1 lg:w-1/2 h-fit flex flex-col  items-center gap-2'>
								<Image src={'/corpoImagenes/PlantaDesalinizadoraSinFondo.png'} alt='' width={400} height={150} />
							</div>
							<div className='w-full order-1 lg:order-2 lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center text-black '>
								<h1 className="text-lg lg:text-xl font-bold lg:mb-10 lg:mt-10 text-center   ">Planta Desalinizadora</h1>
								<p className='px-4 text-md lg:text-lg text-justify '>
									Sistemas de potabilización de agua salada y salobre, auto
									sustentada con energía solar. Diversidad de configuraciones que
									garantizan generación de agua potable desde 300L/día así como
									300.000L/día según sea la necesidad del usuario. Operación
									autónoma que puede ser supervisada a distancia mediante
									interconexión con sistemas vía web. Solución de ósmosis inversa
									con mención especial en los mejores inventos de 2020 de la revista
									TIME y calidad de agua aprobada por la OMS
								</p>
							</div>
						</div>
						<div className=" w-full flex justify-center lg:my-10">
							<h1 className="text-2xl px-10 uppercase lg:text-4xl w-auto font-bold bg-blue-900 text-white">
								CALENTADOR DE AGUA SOLAR
							</h1>
						</div>
						<div className='flex flex-col lg:flex-row w-fit h-auto  overflow-hidden justify-center px-5'>
							<div className='w-full lg:w-1/2 mx-0 px-0 h-auto flex flex-col items-center justify-center  text-black '>
								<h1 className="text-lg lg:text-xl font-bold lg:mb-10 lg:mt-10 text-center">Calentador de Agua Solar</h1>
								<p className='px-4 text-md lg:text-lg text-justify'>
									Dispositivo que utiliza la energía solar que llega a la superficie
									terrestre en forma de radiación, para calentar agua. Disminuye el
									consumo energético hasta un 50% lo que lo hace una opción de
									ahorro eléctrico absolutamente rentable. Su eficiencia alcance
									importantes porcentajes, tales como que sus tubos de vacío solares
									conviertan un 80% de radiación en energía térmica, lo que se
									convierte en agua caliente gratis gracias al astro rey, el sol.
								</p>
							</div>
							<div className='w-full h-1/2 lg:w-1/2 lg:h-fit flex flex-col  items-center gap-2'>
								<Image src={'/corpoImagenes/CalentadorSolarSinFondo.png'} alt='' width={400} height={150} />
							</div>

						</div>
					</div>
				}

			</div>
		</div >
	)
}
