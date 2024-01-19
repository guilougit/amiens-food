import Link from "next/link";

import Image from "next/image";
import Logo from '@/public/img/logo/logo-no-text.png'
import {FaUserCircle} from "react-icons/fa";
import * as React from "react";

export default function Header() {
    return (
        <header className="absolute w-full z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Site branding */}
                    <div className="shrink-0 mr-4">
                        {/* Logo */}
                        <Link className="flex items-center gap-x-2" href="/">
                            <Image
                                src={Logo}
                                width={80}
                                alt="Logo Amiens food"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                    
                    <div className={"hidden md:block"}>
                        <ul className={"flex gap-x-8"}>
                            <li className={"text-lg text-slate-800 font-[500]"}>
                                <Link href={'/'}>Partenaires</Link>
                            </li>
                            <li className={"text-lg text-slate-800 font-[500]"}>
                                <Link href={'/'}>Actualités</Link>
                            </li>
                            <li className={"text-lg text-slate-800 font-[500]"}>
                                <Link href={'/'}>Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Buy card */}
                    <nav className="flex grow md:grow-0">
                        {/* Desktop sign in links */}
                        <ul className="flex grow justify-end flex-wrap items-center">
                            <li className="ml-3">
                                <Link
                                    className="btn-sm inline-flex items-center text-slate-800 bg-gray-50 hover:bg-gray-100 group shadow-sm"
                                    href="/apply">
                                    {"J'achète ma carte"}
                                    <span
                                        className="tracking-normal text-sky-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                                        <svg className="fill-primary" width="12" height="10"
                                             xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z"/>
                                        </svg>
                                  </span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </header>
    )
}
