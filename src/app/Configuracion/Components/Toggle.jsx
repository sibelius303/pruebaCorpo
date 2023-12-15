
import { Switch } from '@headlessui/react'
import { useState } from 'react'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Toggle({defaultActive, onChange}) {
	const [active, setActive] = useState(defaultActive)

	const handlerChange = () => {
		setActive( prev => !prev )
		if( onChange ) onChange( !active )
	}

	return (
		<Switch
			checked={active}
			onChange={handlerChange}
			className={classNames(
				active ? 'bg-rojo-pantone' : 'bg-negro',
				'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
			)}
		>
			<span className="sr-only">Use setting</span>
			<span
				aria-hidden="true"
				className={classNames(
					active ? 'translate-x-5' : 'translate-x-0',
					'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-BlancoIvory shadow ring-0 transition duration-200 ease-in-out'
				)}
			/>
		</Switch>
	)
}
