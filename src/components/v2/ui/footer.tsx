import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/img/logo/logo-text.png'

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
                                    <li className={"mt-2"}>
                                        <a className="text-slate-500 underline hover:no-underline" href="#0">
                                            {"J'achète ma carte"}
                                        </a>
                                    </li>
                                    <li>
                                        <a className="text-slate-500 underline hover:no-underline" href="#0">
                                            Partenaires
                                        </a>
                                    </li>
                                    <li>
                                        <a className="text-slate-500 underline hover:no-underline" href="#0">
                                            Actualités
                                        </a>
                                    </li>
                                    <li>
                                        <a className="text-slate-500 underline hover:no-underline" href="#0">
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a className="text-slate-500 underline hover:no-underline" href="#0">
                                            Mon compte
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h5 className={"font-bold"}>Légales</h5>

                                <ul className="flex flex-col">
                                    <li className={"mt-2"}>
                                        <a className="text-slate-500 underline hover:no-underline" href="#0">
                                            Mentions légales
                                        </a>
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
                                <a
                                    className="flex justify-center items-center text-indigo-500 hover:text-indigo-400 transition duration-150 ease-in-out"
                                    href="#0"
                                    aria-label="Telegram"
                                >
                                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.968 10.276a.338.338 0 0 0-.232-.253 1.192 1.192 0 0 0-.63.045s-14.019 5.038-14.82 5.596c-.172.121-.23.19-.259.272-.138.4.293.573.293.573l3.613 1.177a.388.388 0 0 0 .183-.011c.822-.519 8.27-5.222 8.7-5.38.068-.02.118 0 .1.049-.172.6-6.606 6.319-6.64 6.354a.138.138 0 0 0-.05.118l-.337 3.528s-.142 1.1.956 0a30.66 30.66 0 0 1 1.9-1.738c1.242.858 2.58 1.806 3.156 2.3a1 1 0 0 0 .732.283.825.825 0 0 0 .7-.622s2.561-10.275 2.646-11.658c.008-.135.021-.217.021-.317a1.177 1.177 0 0 0-.032-.316Z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>

                        {/* Copyright */}
                        <div className="text-sm text-slate-600">Copyright © Amiens Food. Tous droits réservés.</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
