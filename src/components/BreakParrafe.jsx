"use client"
import { useEffect, useRef } from "react"

export default function BreakParrafe(props) {
    const { name, content="", size=16, inch=15, children  } = props
    const ref = useRef(null)

    useEffect(()=>{
        if( ref ) {
            const parrafes = ref.current.querySelectorAll("p[data-break='"+name+"']")
            let parrafeText = content
            for( const parrafe of parrafes ) {
                const containerArea = parrafe.clientHeight * parrafe.clientWidth
                const characters = Math.floor(containerArea / (inch * parseInt( size ) ));
                const insertText = parrafeText.replaceAll("\n","").replaceAll("\t","").replaceAll("  "," ").substring(0, characters)
                const restText = parrafeText.replaceAll("\n","").replaceAll("\t","").replaceAll("  "," ").substring(characters)
                parrafe.textContent = insertText
                parrafeText = restText
            }

        }
    },[size, inch, content, name, children])

    return <span ref={ref}>{children}</span>
}