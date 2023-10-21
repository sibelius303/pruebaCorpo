"use client";
import { useState } from 'react';
import Image from "next/image"
import { Tab } from '@headlessui/react'

export default function ImageSelector({ images }) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handlerClickChangeImage = (index, step) => () => {
        if( index===0 && step<=0 ) return;
        if( index>=images.length-1 && step>=0 ) return
        setSelectedIndex(prev => index+step)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return <Tab.Group as="div" className="flex flex-col-reverse items-center" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                    {images?.map((image) => (
                        <Tab
                            key={image.id}
                            className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                            {({ selected }) => (
                                <>
                                    <span className="sr-only">{image.name}</span>
                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                                        <Image width={100} height={100} src={image.src} alt="" className="h-full w-full object-cover object-center" />
                                    </span>
                                    <span
                                        className={classNames(
                                            selected ? 'ring-indigo-500' : 'ring-transparent',
                                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2 shadow-lg'
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </Tab>
                    ))}
                </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-fit">
                {images?.map( (image) => (
                    <Tab.Panel key={image.id} className="flex flex-row items-center h-auto md:h-[500px] w-fit bg-gradient-to-b from-transparent via-slate-200 to-transparent">
                        <Image
                            width={500}
                            height={500}
                            src={image.src}
                            alt={image.alt}
                            className="h-auto max-h-[500px] w-full object-cover object-center sm:rounded-lg shadow-xl"
                        />
                    </Tab.Panel>
                ))}
            </Tab.Panels>
    </Tab.Group>
}