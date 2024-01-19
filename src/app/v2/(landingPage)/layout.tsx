'use client'

import {useEffect} from "react";

import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from "@/src/components/v2/ui/header";

export default function HomeLayout({children}:{children: React.ReactNode}) {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 700,
            easing: 'ease-out-cubic',
        })
    })

    return (
        <>
            <Header />
            <main className="grow">
                {children}
            </main>
        </>
    )
}