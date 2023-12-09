"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { execAction } from "../../tools/actions"

export default function MenuNav({ navigation, movil, onClick }) {
    const router = useRouter()


    return navigation.map((item) => (movil ?
        <div key={item.name} className="flow-root text-center">
            <Link
                //className={"hidden text-sm font-bold  text-black lg:block"}
                className={ item?.className ?? "-m-2 block p-5 font-medium  bg-black opacity-75 text-white rounded-md"}
                href={item.href ? item.href : '#'}
                onClick={ item.action ? ()=>execAction( item.action ) : null}
            >{item.name}</Link>
        </div>:
        <Link
            key={item.name}
            //className={"hidden text-sm font-bold  text-black lg:block"}
            className={ item?.className ?? "flex items-center text-sm font-medium text-black"}
            href={item.href ? item.href : '#'}
            onClick={ item.action ? ()=>execAction( item.action ) : null}
        >{item.name}
        </Link>
    ))
}