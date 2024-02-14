import type { Metadata } from 'next'
import './styles/globals.css'
import localFont from 'next/font/local'
import {SessionProvider} from "next-auth/react";

export const metadata: Metadata = {
  title: 'Amiens Food',
  description: 'Site Internet d\'Amiens Food',
}

const aspekta = localFont({
    src: [
        {
            path: '../../public/fonts/Aspekta-350.woff2',
            weight: '350',
        },
        {
            path: '../../public/fonts/Aspekta-400.woff2',
            weight: '400',
        },
        {
            path: '../../public/fonts/Aspekta-450.woff2',
            weight: '450',
        },
        {
            path: '../../public/fonts/Aspekta-500.woff2',
            weight: '500',
        },
        {
            path: '../../public/fonts/Aspekta-550.woff2',
            weight: '550',
        },
        {
            path: '../../public/fonts/Aspekta-700.woff2',
            weight: '700',
        },
    ],
    variable: '--font-aspekta',
    display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={`${aspekta.variable} font-aspekta antialiased bg-white text-slate-800 font-[350]`}>
            <div vaul-drawer-wrapper={""}>
                <div className="flex flex-col min-h-screen overflow-hidden">
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </div>
            </div>
        </body>
    </html>
  )
}
