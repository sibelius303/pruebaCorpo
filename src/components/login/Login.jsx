'use client'
import useFront from '@/hooks/useFront';
import { Field, Formik } from 'formik';
import logoCobre from '../../../public/LOGO_COBRE.png'
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoaderScreen from '../LoaderScreen';
import logoTipo from '../../../public/logoespirales.png'
import { redirect } from 'next/navigation';



export default function Login() {

	const { login, dataUser, screenPending, setScreenPending } = useFront();
	if( dataUser ) {
		redirect('/Home')
	}

	return (
		<>
			{
				screenPending ? <div className='w-screen h-screen flex justify-center items-center px-5 pb-10 pt-10 bg-GrisFondo overflow-y-hidden'><LoaderScreen /></div> : <div className='w-screen h-screen flex justify-center items-center px-5 pb-10 pt-10 bg-GrisFondo overflow-y-hidden'>
					<div className="flex min-h-full flex-1 w-1/2 shadow-2xl">
						<div className="flex flex-1 flex-col justify-center px-4 py-12 bg-gradient-to-br to-rojo-pantone via-azul-pantone from-azul-pantone rounded-l-md sm:px-6 lg:flex-none lg:px-20 xl:px-24">
							<div className="mx-auto w-full max-w-sm text-BlancoIvory  lg:w-96">
								<div>
									<div className='flex gap-2 items-center'>
										<Image
											className="h-8 w-auto"
											src={logoTipo}
											alt="Your Company"
										/>
										<h1 className='text-white uppercase font-extrabold'>
											Corpoelec Industrial
										</h1>
									</div>
									<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">
										Inicia sesion con tu Usuario y Contraseña
									</h2>
								</div>
								<div className="mt-10">
									<div>
										<Formik
											initialValues={{ user: '', passW: '' }}
											onSubmit={(values) => {
												login(values);
											}}
										>{({
											handleSubmit,
										}) => (<form onSubmit={handleSubmit} className="space-y-6">
											<div>
												<label htmlFor="user" className="block text-sm font-medium leading-6 text-white">
													Usuario
												</label>
												<div className="mt-2">
													<Field
														id="user"
														name="user"
														type="text"
														autoComplete="Usuario"
														required
														className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 text-negro ring-inset ring-gray-300 placeholder:text-negro focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div>
												<label htmlFor="passW" className="block text-sm font-medium leading-6 text-white">
													Contraseña
												</label>
												<div className="mt-2">
													<Field
														id="passW"
														name="passW"
														type="password"
														className="block w-full rounded-md border-0 text-negro py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div>
												<button
													type="submit"
													className="flex w-full justify-center rounded-md bg-rojo-pantone px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												>
													Iniciar Sesion
												</button>
											</div>
										</form>)}
										</Formik>
									</div>
								</div>
							</div>
						</div>
						<div className="relative hidden w-0 flex-1 rounded-r-md bg-BlancoIvory  lg:flex lg:justify-center lg:items-center">
							<Image
								className="relative inset-0 h-auto w-auto object-cover px-10"
								src={logoCobre}
								alt=""
								priority
							/>
						</div>
					</div>
				</div>
			}

		</>

	)
}