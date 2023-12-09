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
                <div className="w-full hidden lg:block h-auto p-4">
                    <Image className="w-full h-[118px] rounded-md" src={"/cintillosuperior.jpg"} width={1000} height={100} alt={'no image'} />
                </div>
                <div className="w-full h-auto lg:hidden p-4">
                    <Image className="h-[118px] rounded-md" src={"/cintillosuperior.jpg"} width={500} height={100} alt={'no image'} />
                </div>
                <div className="mx-auto flex items-start justify-between w-full h-full ">
                    <div style={
                        estiloComponente
                    } className="flex h-36 lg:h-16 w-full items-center justify-between">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center pl-4">
                            <Link className='flex items-center px-4 py-1 gap-2' href="/">
                                <Image
                                    src={'/logosinfondo.png'}
                                    width={150}
                                    height={100}
                                    alt=''
                                />
                            </Link>
                        </div>
                        <div className="flex flex-1 items-center lg:hidden">
                            <MovilMenu/>
                        </div>
                        <div className="flex flex-1 items-center justify-center gap-3  text-black pr-4">
                            <MenuNav navigation={secondaryNavigation} />
                            {/* <div className="ml-4 flow-root lg:ml-8">
                                    <ButtonCart />
                                </div> */}
                        </div>
                        <div className="hidden lg:flex flex-1 items-center justify-end gap-3  text-black pr-4">
                            <Contactenos/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
}