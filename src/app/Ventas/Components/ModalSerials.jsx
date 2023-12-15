import { useEffect, useState } from "react"

export default function ModalSerials({ maxItems, items = [], serialSelected = [], onAction }){
    const [ selected, setSelected] = useState(serialSelected)
    const [serials, setSerials] = useState(items)

    const handlerSelect = (serial) => () => {
        setSelected( prev => {
            if( prev.includes( serial ) ) {
                return prev.filter( item => item!==serial )
            }
            return [ ...prev, serial ]
        })
    }

    const handlerAction = () => {
        if( selected.length < maxItems ) return
        if(onAction) onAction(selected)

    }

    return <div className="w-full h-full top-0 left-0 absolute flex items-center justify-center">
        <div className="absolute bg-gray-500 opacity-50 w-full h-full z-0"></div>
        <div className="bg-white w-1/2 h-auto p-10 z-10 rounded-lg flex flex-col gap-4">
            <h2 className="text-3xl border-b border-gray-500 mb-4 font-semibold text-gray-700">Selecciona los Seriales <span className="text-sm">(Restan: {maxItems - selected.length})</span></h2>
            <div className="flex flex-col gap-2 pl-5 mt-2">
                { serials.map( serial => <button
                        key={serial}
                        disabled={ !selected.includes(serial) && selected.length===maxItems }
                        className="flex flex-row items-center gap-4 cursor-pointer hover:bg-blue-200 p-1 disabled:text-gray-400 disabled:bg-gray-200"
                        onClick={handlerSelect(serial)}
                    >
                    { selected.includes(serial) ? <CircleCheckIcon /> : <CircleIcon /> }
                    <span>{ serial }</span>
                </button>)}
            </div>
            <div className="mt-2 flex flex-row justify-end">
                <button onClick={handlerAction} className="px-5 py-3 flex items-center justify-center font-medium bg-rojo-pantone disabled:bg-gray-500 rounded-lg text-BlancoIvory shadow-2xl" disabled={maxItems!=selected.length}>Continuar</button>
            </div>
        </div>
    </div>
}

const CircleCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-600">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
</svg>

const CircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
