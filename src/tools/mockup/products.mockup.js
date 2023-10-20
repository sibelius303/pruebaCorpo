export const products = [
    {
        id: 1,
        name: 'Transformadores Monofasicos',
        href: '#',
        images: [{
            id:1,
            name:'Transformador 001',
            src: '/ImagesCadeteSiempre/transf001.jpeg',
            alt: '',
        },{
            id:2,
            name:'Transformador 002',
            src: '/ImagesCadeteSiempre/transf002.jpeg',
            alt: '',
        },{
            id:3,
            name:'Transformador 003',
            src: '/ImagesCadeteSiempre/transf003.jpeg',
            alt: '',
        }],
        description: `Son Transformadores monofásicos de distribución tipo Intemperie sumergido en Aceite liquido dieléctrico, con una Potencia Nominal desde 10 KVA hasta 100 KVA; para ser instalados en el Sistema Eléctrico Nacional (SEN), en redes de distribución.`,
        price: '$USD 10.00',
        realPrice: 10,
        regularPrice: '$USD 12.00',
        details: [
            {
                name: 'Caracteristicas',
                items: [
                     <span className="font-semibold mb-2" key={0}>Capacidad: </span>,
                     <span className="ml-4 italic m-2" key={10}>10 KVA</span>,
                     <span className="ml-4 italic m-2" key={15}>15 KVA</span>,
                     <span className="ml-4 italic m-2" key={25}>25 KVA</span>,
                     <span className="ml-4 italic m-2" key={37.5}>37.5 KVA</span>,
                     <span className="ml-4 italic m-2" key={50}>50 KVA</span>,
                     <span className="ml-4 italic m-2" key={75}>75 KVA</span>,
                     <span className="ml-4 italic m-2" key={100}>100 KVA</span>
                ],
            },
        ],
    }
]