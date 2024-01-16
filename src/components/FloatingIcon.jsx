import Link from "next/link"

export default function FloatingIcon({ icon }) {

    return <Link target="_blank" href={process.env?.LINK_WHATSAPP ?? ""} className="fixed bottom-5 right-5 text-green-400">
        {icon}
    </Link>


}