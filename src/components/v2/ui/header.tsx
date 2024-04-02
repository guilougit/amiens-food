import Link from "next/link";

import Image from "next/image";
import Logo from '@/public/img/logo/logo-no-text.png'
import MobileMenu from "@/src/components/v2/ui/mobile-menu";
import {CheckoutButton} from "@/src/components/checkout-button";
import {auth} from "@/src/auth";
import {$Enums} from "@prisma/client";
import Roles = $Enums.Roles;

export default async function Header() {

    const user = await auth()

    return (
        <header className="absolute w-full z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Site branding */}
                    <div className="shrink-0 mr-4">
                        {/* Logo */}
                        <Link className="flex items-center gap-x-2 relative" href="/">
                            <Image
                                src={Logo}
                                width={80}
                                alt="Logo Amiens food"
                                aria-hidden="true"
                                className={"z-10"}
                            />

                            {/*
                            <img src={"/img/stain.svg"} className={"absolute z-0 -left-3.5 -top-3.5 max-w-none"} width={100}  alt={""}/>
                            */}
                            <div className={"w-[200px] h-[250px] md:w-[180px] md:h-[250px] bg-white absolute rounded-full -left-24 -top-40 md:-top-44 md:-left-[52px]"}></div>
                        </Link>
                    </div>

                    <div className={"hidden md:block"}>
                        <ul className={"flex gap-x-8"}>
                            <li className={"text-lg text-slate-800 font-[500] group"}>
                                <Link href={'/'}
                                      className={"group-hover:text-[#E66E04] transition-all"}>Accueil</Link>
                                <div
                                    className="w-0 transition-all duration-300 group-hover:w-full h-1 border-b-2 border-transparent group-hover:border-[#E66E04]"></div>
                            </li>
                            <li className={"text-lg text-slate-800 font-[500] group"}>
                                <Link href={'/partenaires'}
                                      className={"group-hover:text-[#E66E04] transition-all"}>Partenaires</Link>
                                <div
                                    className="w-0 transition-all duration-300 group-hover:w-full h-1 border-b-2 border-transparent group-hover:border-[#E66E04]"></div>
                            </li>
                            <li className={"text-lg text-slate-800 font-[500] group"}>
                                <Link href={'/compte'}
                                      className={"group-hover:text-[#E66E04] transition-all"}>Mon compte</Link>
                                <div
                                    className="w-0 transition-all duration-300 group-hover:w-full h-1 border-b-2 border-transparent group-hover:border-[#E66E04]"></div>
                            </li>
                            <li className={"text-lg text-slate-800 font-[500] group"}>
                                <Link href={'/contact'}
                                      className={"group-hover:text-[#E66E04] transition-all"}>Contact</Link>
                                <div
                                    className="w-0 transition-all duration-300 group-hover:w-full h-1 border-b-2 border-transparent group-hover:border-[#E66E04]"></div>
                            </li>
                            {(user?.user && user.user.role === Roles.ADMIN) && (
                                <li className={"text-lg text-slate-800 font-[500] group"}>
                                    <Link href={'/admin'}
                                          className={"group-hover:text-[#E66E04] transition-all"}>Administration</Link>
                                    <div
                                        className="w-0 transition-all duration-300 group-hover:w-full h-1 border-b-2 border-transparent group-hover:border-[#E66E04]"></div>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Buy card */}
                    <nav className="flex grow md:grow-0">
                        {/* Desktop sign in links */}
                        <ul className="flex grow justify-end flex-wrap items-center">
                            <li className="ml-3 hidden lg:block">
                                <CheckoutButton variant={"default"}/>
                            </li>
                            <li className={"block lg:hidden"}>
                                <MobileMenu/>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </header>
    )
}
