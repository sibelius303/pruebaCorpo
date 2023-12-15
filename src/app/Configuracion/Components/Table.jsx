const clientes = [
    {
        nombreApellido: 'Cesar Vallenilla',
        identificacion: '25217887',       
    },
    {
        nombreApellido: 'Cesar Vallenilla',
        identificacion: '2521248',       
    },
    {
        nombreApellido: 'Cesar Vallenilla',
        identificacion: '25217924',       
    },
    
    
]



export default function TablaClientes() {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="-mx-4 mt-8 sm:-mx-0">
				<table className="min-w-full divide-y divide-gray-300">
					<thead>
						<tr className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-9">
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
							>
								Nombre y Apellido
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
							>
								Identificacion
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{clientes.map((cliente) => (
							<tr key={cliente.identificacion} className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-9">
								
								<td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
									{cliente.nombreApellido}
								</td>
								<td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
									{cliente.identificacion}
								</td>
								
								<td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
									<button href="#" className="text-indigo-600 hover:text-indigo-900">
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
