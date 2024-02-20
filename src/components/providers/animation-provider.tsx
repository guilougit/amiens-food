"use client"

import {ReactNode, useEffect} from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AnimationProvider({children}:{children: ReactNode}) {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 700,
            easing: 'ease-out-cubic',
        })
    })
    
    return (
        <>
            {children}
        </>
    )
}