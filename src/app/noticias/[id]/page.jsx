import "./content.css"
import Image from "next/image"
import Link from "next/link"


export default async function Page({ params }){
    const { id } = params

    const response = await fetch(`${process.env.API_URL}/news/${id}`)
    const notice = await response.json()



    return <div className="py-5 px-10">
        <div className="flex flex-row gap-5">
            <Image src={notice?.urlImage} alt="" width={400} height={400} className="w-1/3 shadow shadow-black"/>
            <span className="flex flex-col gap items-center justify-center w-2/3">
                <h1 className="font-bold text-2xl uppercase mb-4">{notice.title}</h1>
                <p className="bg-gradient-to-b from-slate-800 to-transparent fill-transparent bg-clip-text text-opacity-0 text-transparent">{notice.descrip}</p>
            </span>

        </div>
        <div className="mt-5 flex flex-col gap-2">
            <div className="flex flex-row justify-end">
                <Link href="/" className="bg-black text-white py-1 px-5 hover:bg-opacity-60 rounded-md shadow-md">Volver</Link>
            </div>
            <div dangerouslySetInnerHTML={{__html:notice?.contentHTML}} class="content"></div>
        </div>
    </div>
}