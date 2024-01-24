'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/public/img/logo/logo-no-text.png';
import Image from "next/image";
import {Button} from "@/src/components/ui/button";
import {CheckoutButton} from "@/src/components/checkout-button";
import {HiMenuAlt3} from "react-icons/hi";
import * as React from "react";

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  return (
    <div className="inline-flex md:hidden">

      {/* Hamburger button */}
      <Button variant={"default"} size={"icon"} ref={trigger} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
        <HiMenuAlt3 size={35} color={"#fff"} />
      </Button>

      {/* Mobile navigation */}
      <div ref={mobileNav}>
        <div  className={`fixed top-0 h-screen z-20 left-0 w-full max-w-sm -ml-16 overflow-scroll bg-gray-50 shadow-lg no-scrollbar transition duration-200 ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="py-6 pr-4 pl-20">
            {/* Logo */}
            <Link href="/" className="inline-block mb-4" aria-label="Cruip" onClick={() => setMobileNavOpen(false)}>
              <Image src={Logo} alt={"Amiens food"} width={80} height={80} />
            </Link>
            {/* Links */}
            <ul className={"space-y-2"}>
              <li>
                <Link
                    href="/about"
                    className="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2 text-xl"
                    onClick={() => setMobileNavOpen(false)}
                >
                  Nos partenaires
                </Link>
              </li>
              <li>
                <Link
                    href="/blog"
                    className="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2 text-xl"
                    onClick={() => setMobileNavOpen(false)}
                >
                  Actualités
                </Link>
              </li>
              <li className="pb-2 border-b border-gray-200 dark:border-gray-800">
                <Link
                    href="/testimonials"
                    className="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2 text-xl"
                    onClick={() => setMobileNavOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li className={"text-center pt-3"}>
                <div className={"max-w-max mx-auto"} onClick={() => setMobileNavOpen(false)}>
                  <CheckoutButton variant={"solid"} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
