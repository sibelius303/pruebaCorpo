const steps = [
	{ id: 'Paso 1', name: 'Selecionar Productos', href: 0, status: 0 },
	{ id: 'Paso 2', name: 'Informacion de Compra', href: 1, status: 1 },
	{ id: 'Paso 3', name: 'Pago', href: 2, status: 2 },
]

export default function Stepper({Step}) {
	return (
		<nav>
			<ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
				{steps.map((step) => (
					<li key={step.name} className="md:flex-1">
						{step.status <= Step  ? (
							<div
								//ref={step.href}
								className="group flex flex-col border-l-4 border-azul-pantone  py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
							>
								<span className="text-sm font-medium text-azul-pantone ">{step.id}</span>
								<span className="text-sm font-medium text-slate-400">{step.name}</span>
							</div>
						) :  (
							<div
								//ref={step.href}
								className="group flex flex-col border-l-4 border-Gris  py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
							>
								<span className="text-sm font-medium text-gray-400 ">{step.id}</span>
								<span className="text-sm font-medium text-slate-400">{step.name}</span>
							</div>
						)}
					</li>
				))}
			</ol>
		</nav>
	)
}
