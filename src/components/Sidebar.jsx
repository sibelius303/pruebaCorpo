'use client'

import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import {

    XMarkIcon,
} from '@heroicons/react/24/outline'

import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import Link from 'next/link'
import useFront from '@/hooks/useFront'
import logoTipo from '../../public/LOGO_COBRE.png'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Sidebar() {
    const pathname = usePathname()

    const {
        mobileMenuOpen,
        setMobileMenuOpen,
        navigation,
        setScreenPending
    } = useFront()

    return (
        <>
            {pathname !== '/' && <div className="hidden w-28 h-screen overflow-y-hidden bg-rojo-pantone text-BlancoIvory lg:block">
                <div className="flex w-full h-full flex-col items-center py-6">
                    {/* <div className="flex flex-shrink-0 items-center">
                        <Image
                            className="h-8 w-auto"
                            src={logoTipo}
                            alt="Your Company"
                        />
                    </div> */}
                    <div className="mt-6 w-full h-full flex flex-col justify-around flex-1 space-y-1 px-2">
                        {navigation?.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.href === pathname ? 'bg-Gris bg-opacity-20 text-BlancoIvory' : 'text-BlancoIvory hover:bg-Gris hover:bg-opacity-20 ',
                                    'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                <button onClick={()=>setScreenPending(true)} className='flex flex-col justify-center items-center'>
                                    <item.icon
                                        className={classNames(
                                            item.current ? 'text-white' : 'text-white group-hover:text-white',
                                            'h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    <span className="mt-2">{item.name}</span>
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>}

            {/* Mobile menu */}
            {pathname !== '/' && <Transition.Root show={mobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-negro md:w-60 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-md flex-1 flex-col bg-negro text-BlancoIvory pb-4 pt-5">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute right-0 top-1 -mr-14 p-1">
                                        <button
                                            type="button"
                                            className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            <span className="sr-only">Close sidebar</span>
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex flex-shrink-0 items-center px-4">
                                    <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 w-full md:text-center">
                                        CORPOELEC INDUSTRIAL
                                    </h2>
                                </div>
                                <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                                    <nav className="flex h-full flex-col">
                                        <div className="space-y-1 flex h-full flex-col justify-evenly">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => {setMobileMenuOpen(false);setScreenPending(true)}}
                                                    className={classNames(
                                                        item.href === pathname ? 'bg-Gris bg-opacity-20 text-BlancoIvory' : 'text-BlancoIvory hover:bg-Gris hover:bg-opacity-20 ',
                                                        'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-white' : 'text-white group-hover:text-white',
                                                            'h-6 w-6 md:h-16 md:w-16'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="mt-2 md:text-xl">{item.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>}
        </>
    )
}