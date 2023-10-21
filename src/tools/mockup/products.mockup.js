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
    },
    {
        id: 2,
        name: 'Transformadores Monofasicos Sumergibles',
        href: '#',
        images: [{
            id:1,
            name:'Transformador 004',
            src: '/ImagesCadeteSiempre/transf004.jpg',
            alt: '',
        }],
        description: `Los transformadores de distribución monofásico sumergible son un tipo de transformador diseñado para uso en sótanos y casillas.`,
        details: [
            {
                name: 'Caracteristicas',
                items: [
                     <span className="font-semibold mb-2" key={0}>Capacidad: </span>,
                     <span className="ml-4 italic m-2" key={100}>100 KVA</span>,
                     <span className="ml-4 italic m-2" key={167.5}>167.5 KVA</span>,
                     <span className="ml-4 italic m-2" key={250}>250 KVA</span>,
                     <span className="ml-4 italic m-2" key={333}>333 KVA</span>,
                     <span className="ml-4 italic m-2" key={500}>500 KVA</span>
                ],
            },
        ],
    },
    {
        id: 3,
        name: 'Transformadores Trifasicos Sumergibles',
        href: '#',
        images: [{
            id:1,
            name:'Transformador 001',
            src: '/ImagesCadeteSiempre/transf005.jpeg',
            alt: '',
        },{
            id:2,
            name:'Transformador 002',
            src: '/ImagesCadeteSiempre/transf006.jpeg',
            alt: '',
        }],
        description: `Los transformadores de distribución sumergibles trifásicos están especialmente diseñados para funcionar bajo el agua y pueden sumergirse durante un tiempo sin sufrir daños.`,
        details: [
            {
                name: 'Caracteristicas',
                items: [
                     <span className="font-semibold mb-2" key={0}>Capacidad: </span>,
                     <span className="ml-4 italic m-2" key={150}>150 KVA</span>,
                     <span className="ml-4 italic m-2" key={300}>300 KVA</span>,
                     <span className="ml-4 italic m-2" key={500}>500 KVA</span>,
                     <span className="ml-4 italic m-2" key={750}>750 KVA</span>,
                     <span className="ml-4 italic m-2" key={1000}>1000 KVA</span>,
                     <span className="ml-4 italic m-2" key={1500}>1500 KVA</span>
                ],
            },
        ],
    },
    {
        id: 4,
        name: 'Lampara para alumbrado publico Tipo Splash',
        href: '#',
        images: [{
            id:1,
            name:'Luminaria 001',
            src: '/ImagesCadeteSiempre/lum001.jpg',
            alt: '',
        },{
            id:2,
            name:'Luminaria 002',
            src: '/ImagesCadeteSiempre/lum002.jpg',
            alt: '',
        }],
        description: ``,
        details: [
            {
                name: 'Caracteristicas',
                items: [
                     <span className="m-2" key="power">
                        <span className="font-semibold">Tipo:</span>
                        <span className="ml-2 italic">Splash</span>
                    </span>,
                     <span className="italic m-2 font-semibold" key="power">Potencia</span>,
                     <span className="ml-4 italic m-2" key="power-100w">100w</span>,
                     <span className="ml-4 italic m-2" key="power-150w">150w</span>,
                     <span className="ml-4 italic m-2" key="power-200w">200w</span>
                ],
            },
        ],
    },
    {
        id: 5,
        name: 'Bulbo LED',
        href: '#',
        images: [{
            id:1,
            name:'Luminaria 003',
            src: '/ImagesCadeteSiempre/lum003.jpg',
            alt: '',
        }],
        description: ``,
        details: [
            {
                name: 'Caracteristicas',
                items: [
                     <span className="italic m-2 font-semibold" key="power">Potencia</span>,
                     <span className="ml-4 italic m-2" key="power-9w">9w</span>,
                     <span className="ml-4 italic m-2" key="power-12w">12w</span>
                ],
            },
        ],
    },
    {
        id: 6,
        name: 'Panel Superficial LED',
        href: '#',
        images: [{
            id:1,
            name:'Luminaria 004',
            src: '/ImagesCadeteSiempre/lum004.jpg',
            alt: '',
        }],
        description: ``,
        details: [
            {
                name: 'Caracteristicas',
                items: [
                     <span className="italic m-2 font-semibold" key="power">Potencia</span>,
                     <span className="ml-4 italic m-2" key="power-18w">18w</span>
                ],
            },
        ],
    },
    {
        id: 7,
        name: 'Reflectores LED Blancos',
        href: '#',
        images: [{
            id:1,
            name:'Luminaria 005',
            src: '/ImagesCadeteSiempre/lum005.png',
            alt: '',
        }],
        description: ``,
        details: [
            {
                name: 'Caracteristicas',
                items: [
                     <span className="italic m-2 font-semibold" key="power">Potencia</span>,
                     <span className="ml-4 italic m-2" key="power-150w">150w</span>,
                     <span className="ml-4 italic m-2" key="power-200w">200w</span>,
                     <span className="ml-4 italic m-2" key="power-300w">300w</span>,
                     <span className="ml-4 italic m-2" key="power-400w">400w</span>
                ],
            },
        ],
    },
    {
        id: 8,
        name: 'Bombillos de Alta Potencia',
        href: '#',
        images: [{
            id:1,
            name:'Luminaria 006',
            src: '/ImagesCadeteSiempre/lum006.png',
            alt: '',
        }],
        description: ``,
        details: [
            {
                name: 'Caracteristicas',
                items: [
                     <span className="italic m-2 font-semibold" key="power">Potencia</span>,
                     <span className="ml-4 italic m-2" key="power-20w">20w</span>,
                     <span className="ml-4 italic m-2" key="power-30w">30w</span>,
                     <span className="ml-4 italic m-2" key="power-40w">40w</span>,
                     <span className="ml-4 italic m-2" key="power-50w">50w</span>,
                     <span className="ml-4 italic m-2" key="power-70w">70w</span>,
                     <span className="ml-4 italic m-2" key="power-100w">100w</span>
                ],
            },
        ],
    },
    {
        id: 9,
        name: 'Luminarias Solares',
        href: '#',
        images: [{
            id:1,
            name:'Luminaria 007',
            src: '/ImagesCadeteSiempre/lum007.png',
            alt: '',
        },{
            id:2,
            name:'Luminaria 008',
            src: '/ImagesCadeteSiempre/lum008.png',
            alt: '',
        }],
        description: ``,
        details: [
            {
                name: 'Caracteristicas',
                items: [
                    <span className="italic m-2 font-semibold" key="power">Potencia</span>,
                    <span className="ml-4 italic m-2" key="power-250w">250w</span>,
                    <span className="italic m-2 font-semibold" key="size">Tamaño</span>,
                    <span className="ml-4 italic m-2" key="size-1">808 x 240 x 70</span>,
                    <span className="italic m-2 font-semibold" key="charge">Bateria</span>,
                    <span className="ml-4 italic m-2" key="charge-1">3.2V/20000mAh</span>,
                    <span className="italic m-2 font-semibold" key="size">Panel Solar</span>,
                    <span className="ml-4 italic m-2" key="size-1">5V/200W Poly crystalline board</span>,
                    <span className="italic m-2 font-semibold" key="size">Tiempo de Carga</span>,
                    <span className="ml-4 italic m-2" key="size-1">6-8hrs</span>,
                ],
            },
        ],
    }
]