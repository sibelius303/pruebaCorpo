 import './globals.css'
import { Montserrat } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { FrontProvider } from '@/contex/FrontProvider'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import "react-toastify/dist/ReactToastify.css";
import Head from 'next/head'
// Version 15/12/2023 Qa
// Deploy 15/12/2023 PROD

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} overflow-y-hidden`}> 
          <FrontProvider>
            <div className="flex h-screen overflow-y-hidden">
              {<Sidebar />}
              <div className="flex flex-1 flex-col overflow-y-hidden">
                {<Header />}
                <main className="flex-1 overflow-y-auto bg-GrisFondo">
                  {children}
                </main>
              </div>
            </div>
          </FrontProvider>
      </body>
    </html>
  )
}
