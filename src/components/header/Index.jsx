import Link from 'next/link';
import ButtonCart from '../cart/ButtonCart';
import MenuNav from './MenuNav';
import Script from 'next/script';

import { mainNavigation, secondaryNavigation } from '@/tools/navigation';
import MovilMenu from './MovilMenu';
import { getUser, isAuthenticated } from '@/tools/actions';
import { ROUTER_ID, ROUTER_PATH } from '@/tools/constants';
import Image from 'next/image';
import logoEspiral from '../../../public/logoespirales.png'
import Contactenos from '../Contactenos';

export default async function CustomHeader() {

    const isAuthenticatedBool = await isAuthenticated()
    const user = await getUser()


    const mainNav = mainNavigation.filter(item => {
        if (isAuthenticatedBool) { // Si esta autenticado
            return item.id !== ROUTER_ID.LOGIN
        } else { // Si no esta autenticado
            return item.id !== ROUTER_ID.PROFILE && item.id !== ROUTER_ID.LOGOUT
        }
    }).map(item => {
        if (user && item.id === ROUTER_ID.PRODUCTS) {
            return {
                ...item,
                href: '/' + user.academic + ROUTER_PATH.PRODUCTS
            }
        }
        return item
    })

    const estiloComponente = {
        backgroundImage: 'url("/cintillogris.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'noRepeat',
        width: '100%',
        height: '100%',
    };

    return <header className="relative z-10 ">

        <nav aria-label="Top">
            <div className=" h-auto bg-white">
                <div className="w-full h-auto p-4">
                    <Image className="w-full h-[218px] rounded-md" src={"/cintillosuperior.jpg"} width={1000} height={100} alt={'no image'} />
                </div>
                <div className="mx-auto flex items-start justify-between w-full h-full ">
                    {/* <div> */}
                    <div style={
                        //{ backgroundColor: '#e3e4e5' }
                        estiloComponente
                    } className="flex h-16 w-full items-center justify-between">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center pl-4">
                            <Link className='flex items-center px-4 py-1 gap-2' href="/">
                                <Image
                                    src={logoEspiral}
                                    width={50}
                                    height={50}
                                    alt=''
                                />
                                <span className="text-lg font-bold  text-black uppercase">Corpoelec Industrial</span>
                            </Link>
                        </div>

                        {/* <div className="hidden h-full lg:flex">
                                <div className="inset-x-0 bottom-0 px-4">
                                    <div className="flex h-full justify-center space-x-8">
                                        <MenuNav navigation={mainNav} />
                                    </div>
                                </div>
                            </div> */}

                        <div className="flex flex-1 items-center lg:hidden">
                            <MovilMenu />
                        </div>

                        <div className="flex flex-1 items-center justify-center gap-3  text-black pr-4">
                            <Link href="/consulta" className="text-black block lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </Link>
                            <MenuNav navigation={secondaryNavigation} />
                            {/* <div className="ml-4 flow-root lg:ml-8">
                                    <ButtonCart />
                                </div> */}
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-3  text-black pr-4">
                            <Contactenos/>
                            {/* <div className="ml-4 flow-root lg:ml-8">
                                    <ButtonCart />
                                </div> */}
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </nav>
    </header>
}