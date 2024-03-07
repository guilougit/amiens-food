import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/img/logo/logo-text.png'
import {Instagram} from "lucide-react";
import {CheckoutButton} from "@/src/components/checkout-button";

export default function Footer() {
    return (
        <footer className="border-t border-primary">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-8">
                    {/* Top area */}
                    <div className="flex flex-col md:flex-row justify-center md:justify-between mb-4">
                        <div className="shrink-0 mr-4">
                            {/* Logo */}
                            <Link className="inline-flex group mb-8 md:mb-0" href="/" aria-label="Cruip">
                                <Image src={Logo} alt="Community" width={80}/>
                            </Link>
                        </div>
                        {/* Right links */}
                        <div className="text-sm font-medium grid grid-cols-2 gap-20">
                            <div>
                                <h5 className={"font-bold"}>Liens utiles</h5>
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <span className="text-slate-500 underline hover:no-underline">
                                            <CheckoutButton variant={"footer"} />
                                        </span>
         
                                    </li>
                                    <li>
                                        <Link className="text-slate-500 underline hover:no-underline"
                                              href="/a-propos">
                                            Qui suis-je ?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="text-slate-500 underline hover:no-underline"
                                              href="/partenaires">
                                            Partenaires
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="text-slate-500 underline hover:no-underline"
                                              href="/actualites">
                                            Actualités
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="text-slate-500 underline hover:no-underline" href="/contact">
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="text-slate-500 underline hover:no-underline" href="/compte">
                                            Mon compte
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h5 className={"font-bold"}>Légales</h5>

                                <ul className="flex flex-col">
                                    <li className={"mt-2"}>
                                        <Link href={"/mentions-legales"} className="text-slate-500 underline hover:no-underline">
                                            Mentions légales
                                        </Link>
                                        
                                    </li>
                                    <li className={"mt-2"}>
                                        <Link href={"/conditions"} className="text-slate-500 underline hover:no-underline">
                                            CGU / CGV
                                        </Link>
                                        
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    {/* Bottom area */}
                    <div className="text-center md:flex md:items-center md:justify-between">
                        {/* Social links */}
                        <ul className="inline-flex mb-4 md:order-1 md:ml-4 md:mb-0 space-x-2">
                            <li>
                                <Link
                                    className="flex justify-center items-center text-primary  transition duration-150 ease-in-out"
                                    href="https://www.instagram.com/amiensfood/"
                                    aria-label="Instagram"
                                    target={"_blank"}
                                >
                                    <Instagram />
                                </Link>
                            </li>
                        </ul>

                        {/* Copyright */}
                        <div className="text-sm text-slate-600">
                            <p>Copyright © Amiens Food. Tous droits réservés.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
