'use client'
import Image from 'next/image';
import ItemProduct from './ItemProduct';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react';


export default function ProductList({ products }) {
	const [product, setProduct] = useState(0);

	useEffect(() => {
		AOS.init({
			once: true,
			easing: 'ease',
			delay: 700
		});
	}, []);

	return (
		<div className=" h-auto pt-10">
			<div style={{ backgroundColor: '#172168' }} className='h-96 w-full mt-10 relative '>
				<div onClick={() => setProduct(1)} className='absolute h-80 w-64 top-24 left-10 flex flex-col rounded-lg miDiv hover:miDivHover'>
					<div className='h-1/2 w-full flex justify-end px-5 py-5'>
						<Image
							src={"/corpoImagenes/reflectorsinfondo.png"}
							alt="imagen de muestra"
							className=" h-[75px] w-[75px] object-cover object-center"
							width={100}
							height={100}
						/>
					</div>
					<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
						<h1 className='text-2xl font-bold'>LED</h1>
						<p>Descubre mas</p>
					</div>
				</div>
				<div onClick={() => setProduct(0)} style={{ backgroundColor: '#65BCE0' }} className='absolute h-80 w-64 top-24 left-96 rounded-lg miDiv4 hover:miDivHover4'>
					<div className='h-1/2 w-full flex justify-end px-5 py-5'>
						<Image
							src={"/corpoImagenes/alumbradosinfondo.png"}
							alt="imagen de muestra"
							className=" h-[125px] w-[75px] object-cover object-center"
							width={100}
							height={100}
						/>
					</div>
					<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
						<h1 className='text-2xl font-bold'>Alumbrado publico</h1>
						<p>Descubre mas</p>
					</div>
				</div>
				<div onClick={() => setProduct(3)} style={{ backgroundColor: '#65BCE0' }} className='absolute h-80 w-64 top-24 right-96 rounded-lg miDiv2  hover:miDivHover2'>
					<div className='h-1/2 w-full flex justify-end px-5 py-5'>
						<Image
							src={"/corpoImagenes/transformadorsinfondo.png"}
							alt="imagen de muestra"
							className=" h-[125px] w-[75px] object-cover object-center"
							width={100}
							height={100}
						/>
					</div>
					<div className='h-1/2 w-full text-white flex flex-col gap-5 justify-end p-5'>
						<div>
							<h1 className='text-2xl font-bold'>Transformadores</h1>
						</div>
						<p>Descubre mas</p>
					</div>
				</div>
				<div onClick={() => setProduct(2)} style={{ backgroundColor: '#65BCE0' }} className='absolute h-80 miDiv3 hover:miDivHover3 w-64 top-24 right-10 rounded-lg'>
					<div className='h-1/2 w-full flex justify-end px-5 py-5'>
						<Image
							src={"/corpoImagenes/panelsinfondo.png"}
							alt="imagen de muestra"
							className=" h-[125px] w-[75px] object-cover object-center"
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
			<div className="mt-20">
				{
					product === 0 && <div className="w-full">
						<div className=" w-1/2">
							<h1 className="text-5xl pl-52 w-full font-bold bg-blue-900 text-white px-5">
								Iluminacion
							</h1>
						</div>
						<div className="flex justify-end pr-52">
							<h1 className="text-5xl w-[500px] font-bold text-red-500 px-5">
								Alumbrado Publico
							</h1>
						</div>
						<div className='w-full flex'>
							<div className="w-1/2 py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-2xl font-bold'>Luminaria Tipo Splash</h1>
								</div>
								<div>
									<p className='font-bold text-xl '>AC100-265V</p>
									<p className='font-bold text-xl '>100W</p>
									<p className='font-bold text-xl '>150W</p>
									<p className='font-bold text-xl '>200W</p>
									<p className='font-bold text-xl '>300W</p>
								</div>
								<div>
									<p className='font-bold text-2xl '>Garantía de 3 años</p>
								</div>
							</div>
							<div className="w-1/2 py-10 flex flex-col items-center justify-center">
								<div className='flex'>
									<Image src={'/corpoImagenes/liminariasplashsinfondo.png'}
										width={300}
										height={300}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>
							</div>
						</div>
						<div className=" w-1/2">
							<h1 className="text-5xl pl-52 w-full font-bold bg-blue-900 text-white px-5">
								Luminarias
							</h1>
						</div>
						<div className="flex justify-end pr-52">
							<h1 className="text-5xl w-[500px] font-bold text-red-500 px-5">
								LED Solares
							</h1>
						</div>
						<div className='w-full flex'>
							<div className="w-1/2 py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-2xl font-bold'>LED Solar Street Light</h1>
								</div>
								<div>
									<p className='font-bold text-xl '>250W</p>
									<p className='font-bold text-xl '>6500k</p>
								</div>
								<div>
									<p className='font-bold text-2xl '>Garantía de 2 años</p>
								</div>
							</div>
							<div className="w-1/2 py-10 flex flex-col items-center justify-center">
								<div className='flex h-[300px]'>
									<Image src={'/corpoImagenes/alumbradosinfondo.png'}
										width={300}
										height={200}
										className='rounded-md'
										alt='imagen no disponible'
									/>
									<Image src={'/corpoImagenes/ledsolarsinfondoposterior.png'}
										width={300}
										height={200}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>

							</div>
						</div>
						<div className='w-full flex'>
							<div className="w-1/2 py-10 flex flex-col items-center justify-center">
								<div className='flex h-[300px]'>
									<Image src={'/corpoImagenes/ledsolarredondasinfondo.png'}
										width={300}
										height={200}
										className='rounded-md'
										alt='imagen no disponible'
									/>
									<Image src={'/corpoImagenes/ledsolarredondasinfondoposterior.png'}
										width={300}
										height={200}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>
							</div>
							<div className="w-1/2 py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-2xl font-bold'>LED Solar Light Redonda</h1>
								</div>
								<div>
									<p className='font-bold text-xl '>250W</p>
									<p className='font-bold text-xl '>6500k</p>
								</div>
								<div>
									<p className='font-bold text-2xl '>Garantía de 2 años</p>
									<p className='font-bold text-2xl '>¡No incluye base!</p>
								</div>
							</div>
						</div>
						<div style={{ backgroundColor: '#172168' }} className='h-96 w-full mt-10 relative '>
							<div className='w-full h-full flex flex-col justify-center items-center text-white py-10'>
								<h1 className='text-2xl mb-10'>Contiene:</h1>
								<div className='grid grid-cols-2 gap-4'>
									<p className="text-xl">Mini panel solar</p>
									<p className="text-xl">Reflector con tecnología LED</p>
									<p className="text-xl">Control Remoto</p>
									<p className="text-xl">Baterías AAA</p>
									<p className="text-xl">Tornillos para las bases</p>
								</div>
							</div>
						</div>
					</div>
				}
				{
					product === 1 && <div>
						<div className=" w-1/2">
							<h1 className="text-5xl pl-52 w-full font-bold bg-blue-900 text-white px-5">
								Luminarias
							</h1>
						</div>
						<div className="flex justify-end pr-52">
							<h1 className="text-5xl w-[500px] font-bold text-red-500 px-5">
								LED
							</h1>
						</div>
						<div className='  p-5 mt-20'>
							<div className='flex h-1/2'>
								<div className='flex w-1/2'>
									<div className='w-1/2 p-2 h-[300px]'>
										<Image src={'/corpoImagenes/bombilloaltatension.jpg'} className='w-full h-full' width={400} height={70} />
									</div>
									<div className='w-1/2 h-[300px] flex flex-col justify-between p-5 bg-white text-black rounded-lg '>
										<h1 className='text-lg font-bold'>Bombillo Alta Tension</h1>
										<h1 className='text-xl'> Capacidad</h1>
										<div className='text-xl'>
											<p>100W</p>
											<p>150W</p>
											<p>200W</p>
										</div>
										<h1 className='text-lg font-bold'>3 años de Garantia</h1>
									</div>
								</div>
								<div className='flex w-1/2'>
									<div className='w-1/2 p-2 h-[300px]'>
										<Image src={'/ImagesCadeteSiempre/lum003.jpg'} className='w-full h-full' width={400} height={70} />
									</div>
									<div className='w-1/2 h-[300px] p-10 flex flex-col justify-between items-center bg-white text-black rounded-lg '>
										<h1 className='font-bold'>Bulbo LED 12w</h1>
										<h1 className='text-lg font-bold'>3 años de Garantia</h1>
									</div>
								</div>
							</div>
							<div className='flex justify-center h-1/2'>
								<div className='flex w-1/2'>
									<div className='w-1/2 p-2 h-[300px]'>
										<Image src={'/ImagesCadeteSiempre/lum004.jpg'} className='w-full h-full' width={400} height={70} />
									</div>
									<div className='w-1/2 h-[300px] p-10 h-full flex flex-col justify-between items-center bg-white text-black rounded-lg '>
										<h1 className='font-bold'>Panel superficial
											18w LED</h1>
										<h1 className='text-lg font-bold'>3 años de Garantia</h1>
									</div>
								</div>
							</div>
							<div className='w-full flex'>
								<div className="w-1/2 py-10 flex flex-col items-center justify-between">
									<div>
										<h1 className='text-center text-2xl font-bold'>Reflectores</h1>
									</div>
									<div>
										<p className='font-bold text-xl '>250W</p>
										<p className='font-bold text-xl '>6500k</p>
									</div>
									<div>
										<p className='font-bold text-2xl '>Garantía de 2 años</p>
									</div>
								</div>
								<div className="w-1/2 py-10 flex flex-col items-center justify-center">
									<div className='flex h-[300px]'>
										<Image src={'/corpoImagenes/reflectorled.jpeg'}
											width={300}
											height={200}
											className='rounded-md'
											alt='imagen no disponible'
										/>
									</div>

								</div>
							</div>
						</div>
						<div className='w-full flex'>
							<div className="w-1/2 py-10 flex flex-col items-center justify-center">
								<div className='flex h-[300px]'>
									<Image src={'/corpoImagenes/tuboled.JPG'}
										width={300}
										height={200}
										className='rounded-md'
										alt='imagen no disponible'
									/>
								</div>

							</div>
							<div className="w-1/2 py-10 flex flex-col items-center justify-between">
								<div>
									<h1 className='text-center text-2xl font-bold'>Tubo LED T8</h1>
								</div>
								<div>
									<p className='font-bold text-xl '>250W</p>
									<p className='font-bold text-xl '>6500k</p>
								</div>
								<div>
									<p className='font-bold text-2xl '>Garantía de 2 años</p>
									<p className='font-bold text-2xl '>¡No incluye base!</p>
								</div>
							</div>
						</div>
					</div>
				}
				{
					product === 3 && <div className="w-full">
						<div className=" w-1/2">
							<h1 className="text-5xl pl-52 w-full font-bold bg-blue-900 text-white px-5">
								Transformadores
							</h1>
						</div>
						<div className="flex justify-end pr-52">
							<h1 className="text-5xl w-[500px] font-bold text-red-500 px-5">
								Monofasico
							</h1>
						</div>

						<div className='flex h-96 mt-10 p-2'>
							<div className='flex flex-col'>
								<div className=' h-1/2'>
									<Image src={'/ImagesCadeteSiempre/transf003.jpeg'} className='w-full h-auto' width={400} height={150} />
								</div>
							</div>
							<div className='w-1/2  text-black rounded-r-lg h-full '>
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
						<div className=" w-1/2">
							<h1 className="text-5xl pl-52 w-full font-bold bg-blue-900 text-white px-5">
								Monofasico
							</h1>
						</div>
						<div className="flex justify-end pr-52">
							<h1 className="text-5xl w-[500px] font-bold text-red-500 px-5">
								Sumergible
							</h1>
						</div>
						<div className='flex h-96 w-full mt-10 p-2'>
							<div className='w-1/2 flex justify-center'>
								<div className=' h-1/2'>
									<Image src={'/corpoImagenes/transformadorsinfondo.png'} className='w-[400px] h-[400px]' width={400} height={150} />
								</div>
							</div>
							<div className='w-1/2  text-black rounded-r-lg h-full '>
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
						</div>
						<div className=" w-1/2">
							<h1 className="text-5xl pl-52 w-full font-bold bg-blue-900 text-white px-5">
								Trifasico
							</h1>
						</div>
						<div className="flex justify-end pr-52">
							<h1 className="text-5xl w-[500px] font-bold text-red-500 px-5">
								Sumergible
							</h1>
						</div>
						<div className='flex h-96 w-full p-2'>
							<div className='w-1/2 flex justify-center'>
								<div className=' h-1/2'>
									<Image src={'/corpoImagenes/trifasicosumergiblesinfondo.png'} className='w-[400px] h-[350px]' width={400} height={150} />
								</div>
							</div>
							<div className='w-1/2  text-black rounded-r-lg h-full '>
								<div className=' p-5'>
									<h1 className="text-xl font-bold mb-4 text-center  ">Transformadores Trifasicos Sumergible</h1>
									<p className='px-4'>
										Los transformadores de distribución
										monofásico sumergible son un tipo de
										transformador diseñado para uso en sótanos
										y casillas.
									</p>
								</div>
								<div className=' p-5'>
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
						</div>
					</div>
				}
				{
					product === 2 && <div className="w-full">
						<h1 className='text-center text-4xl font-bold'>Energias Renovables</h1>
						<div className='flex w-fit h-auto rounded-lg shadow-2xl overflow-hidden justify-center'>
							<div className='w-fit h-fit flex flex-col gap-2'>
								<Image src={'/ImagesCadeteSiempre/panelessolares.jpeg'} alt='' width={400} height={150} />
							</div>
							<div className='w-1/2 mx-0 px-0 h-auto flex flex-col items-center bg-white text-black rounded-r-lg '>
								<h1 className="text-2xl font-bold mb-10 mt-20 text-center   ">Paneles Solares</h1>
								<p className='px-4 text-xl font-bold '>
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

						<div className='flex w-fit h-auto rounded-lg shadow-2xl overflow-hidden justify-center'>
							<div className='w-fit h-[300px] flex flex-col gap-2'>
								<Image src={'/ImagesCadeteSiempre/vetorgenerador.jpeg'} alt='' width={400} height={150} />
							</div>
							<div className='w-1/2 mx-0 px-0 h-auto flex flex-col items-center bg-white text-black rounded-r-lg '>
								<h1 className="text-2xl font-bold mb-10 mt-20 text-center">Aerogeneradores</h1>
								<p className='px-4 text-xl font-bold '>
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
					</div>
				}

			</div>
			{/* <h1  className="text-4xl font-bold mb-10 mt-10 text-center text-white  ">Transformadores</h1>
			<div  className='flex h-96 rounded-2xl shadow-2xl p-2'>
				<div className='flex flex-col'>
					<div className=' h-1/2'>
						<Image src={'/ImagesCadeteSiempre/transf003.jpeg'} className='w-full h-auto' width={400} height={150} />
					</div>
					<div className='flex h-1/2'>
						<Image src={'/ImagesCadeteSiempre/transf002.jpeg'} className='w-1/2 h-auto' width={200} height={200} />
						<Image src={'/ImagesCadeteSiempre/transf001.jpeg'} className='w-1/2 h-auto' width={200} height={200} />
					</div>
				</div>
				<div className='w-1/2 bg-white text-black rounded-r-lg h-full '>
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
			<div   className='flex justify-center h-96 mt-20 rounded-2xl shadow-2xl'>
				<div className='flex w-5/6 h-fit md:h-full flex-row justify-center gap-0'>
					<div className='w-1/2 h-full bg-white text-black rounded-l-lg p-5'>
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
					<div className='w-1/4 h-auto bg-white flex justify-end gap-2 rounded-r-lg overflow-hidden'>
						<Image src={'/ImagesCadeteSiempre/transf004.jpg'} className='w-auto h-full' alt='' width={400} height={150} />
					</div>
				</div>
			</div>
			<div  className='flex justify-center items-center  p-5 mt-20 rounded-2xl shadow-2xl'>
				<div className='h-auto w-5/6'>
					<div className='flex h-auto w-full bg-white text-black rounded-t-lg '>
						<div className='w-1/2 p-5'>
							<h1 className="text-xl font-bold mb-4 text-center  ">Transformadores Trifasicos Sumergible</h1>
							<p className='px-4'>
								Los transformadores de distribución
								monofásico sumergible son un tipo de
								transformador diseñado para uso en sótanos
								y casillas.
							</p>
						</div>
						<div className='w-1/2 p-5'>
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
					<div className=' w-full flex justify-center h-1/2 rounded-b-lg overflow-hidden'>
						<div className='w-1/2'>
							<Image src={'/ImagesCadeteSiempre/transf005.jpeg'} className='w-full h-full' width={400} height={70} />
						</div>
						<div className='w-1/2'>
							<Image src={'/ImagesCadeteSiempre/transf006.jpeg'} className='w-full h-full' width={400} height={70} />
						</div>
					</div>
				</div>
			</div>
			<h1  className="text-4xl font-bold mb-10 mt-10 text-center text-white  ">Luminarias</h1>
			<div  className='  p-5 mt-20 rounded-2xl shadow-2xl'>
				<div className='flex h-1/2'>
					<div className='flex w-1/2'>
						<div  className='w-1/2 p-2'>
							<Image src={'/ImagesCadeteSiempre/lum001.jpg'} className='w-full h-full' width={400} height={70} />
						</div>
						<div  className='w-1/2 flex flex-col justify-between p-5 bg-white text-black rounded-lg '>
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
					<div  className='flex w-1/2'>
						<div className='w-1/2 p-2'>
							<Image src={'/ImagesCadeteSiempre/lum003.jpg'} className='w-full h-full' width={400} height={70} />
						</div>
						<div className='w-1/2 p-10 flex flex-col justify-between items-center bg-white text-black rounded-lg '>
							<h1 className='font-bold'>Bulbo LED 12w</h1>
							<h1 className='text-lg font-bold'>3 años de Garantia</h1>
						</div>
					</div>
				</div>
				<div className='flex justify-center h-1/2'>
					<div  className='flex w-1/2'>
						<div className='w-1/2 p-2'>
							<Image src={'/ImagesCadeteSiempre/lum004.jpg'} className='w-full h-full' width={400} height={70} />
						</div>
						<div className='w-1/2 p-10 h-full flex flex-col justify-between items-center bg-white text-black rounded-lg '>
							<h1 className='font-bold'>Panel superficial
								18w LED</h1>
							<h1 className='text-lg font-bold'>3 años de Garantia</h1>
						</div>
					</div>
				</div>
			</div>
			<h1  className="text-4xl font-bold mb-20 mt-20 text-center text-white">Paneles Solares</h1>
			<div  className='flex  h-auto rounded-2xl shadow-2xl'>
				<div className='w-1/2 h-full flex flex-col gap-2'>
					<div className=' h-full'>
						<Image src={'/ImagesCadeteSiempre/panelessolares.jpeg'} className='w-full' width={400} height={150} />
					</div>
				</div>
				<div className='w-1/2 flex items-center bg-white text-black rounded-lg '>
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
			<h1  className="text-4xl font-bold mb-20 mt-20 text-center text-white  ">Aerogeneradores</h1>
			<div  className='flex w-fit h-auto rounded-lg shadow-2xl overflow-hidden justify-center'>
				<div className='w-fit h-fit flex flex-col gap-2'>
					<Image src={'/ImagesCadeteSiempre/vetorgenerador.jpeg'} alt='' width={400} height={150} />
				</div>
				<div className='w-1/2 mx-0 px-0 h-auto flex items-center bg-white text-black rounded-r-lg '>
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
			</div> */}

		</div>
	)
}
