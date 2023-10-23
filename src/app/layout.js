import './globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomHeader from '@/components/header/Index'
import { Inter } from 'next/font/google'
import CustomFooter from '@/components/CustomFooter'
import Image from 'next/image';
import FloatingIcon from '@/components/FloatingIcon';
import WhatsappIcon from '@/components/WhatsappIcon';



const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logoespirales.png" sizes="any" />
        <title>
          Corpoelec Industrial
        </title>
      </head>
      <body className={inter.className}>
        <CustomHeader />
        {children}
        <CustomFooter />
        <FloatingIcon icon={<Image src="/ImagesCadeteSiempre/whatsapp.svg" width={50} height={50} alt="" />} />
      </body>
    </html>
  )
}
