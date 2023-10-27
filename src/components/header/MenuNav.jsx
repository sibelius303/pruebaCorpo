"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { execAction } from "../../tools/actions"

export default function MenuNav({ navigation, movil, onClick }) {
    const router = useRouter()


    return navigation.map((item) => (movil ?
        <div key={item.name} className="flow-root bg-slate-500">
            <Link
                className={"hidden text-sm font-bold rounded-md  shadow-xl bg-black bg-opacity-20 px-4 py-2 text-white lg:block"}
                //className={ item?.className ?? "-m-2 block p-2 font-medium text-black"}
                href={item.href ? item.href : '#'}
                onClick={ item.action ? ()=>execAction( item.action ) : null}
            >{item.name}</Link>
        </div>:
        <Link
            key={item.name}
            className={"hidden text-sm font-bold rounded-md  shadow-xl bg-black bg-opacity-20 px-4 py-2 text-white lg:block"}
            //className={ item?.className ?? "flex items-center text-sm font-medium text-black"}
            href={item.href ? item.href : '#'}
            onClick={ item.action ? ()=>execAction( item.action ) : null}
        >{item.name}
        </Link>
    ))
}