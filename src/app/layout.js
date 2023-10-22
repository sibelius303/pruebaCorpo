import './globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomHeader from '@/components/header/Index'
import { Inter } from 'next/font/google'
import CustomFooter from '@/components/CustomFooter'
import Image from 'next/image';
import logoEspiral from '../../public/logoespirales.png'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>

        <title>
          CORPOELEC INDUSTRIAL
        </title>
      </head>
      <body className={inter.className}>
        <CustomHeader />
        {children}
        <CustomFooter />
      </body>
    </html>
  )
}
