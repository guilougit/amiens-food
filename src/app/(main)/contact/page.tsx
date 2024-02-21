import {CornerRightDown, Instagram, Mail} from "lucide-react";
import type {Metadata} from "next";
import Link from "next/link";
import {ContactForm} from "@/src/components/v2/contact-form";

export const metadata: Metadata = {
    title: 'Amiens Food - Contactez-nous',
    description: 'Contactez Amiens food pour toutes questions',
}

const ContactPage = () => {
    return (
        <>
            {/* HERO BANNER */}
            <section className="relative">
                {/* Bg */}
                <div
                    className="absolute inset-0 rounded-bl-[100px] mb-12 md:mb-0 bg-gradient-to-r from-[#FB943C] via-[#FBBF26] to-[#FB943C] pointer-events-none -z-10"
                    aria-hidden="true"
                />
                <div className="max-w-6xl mx-auto px-4 sm:px-6" data-aos="fade-up">
                    <div className="pt-24 md:pt-40 pb-16">
                        {/* Hero content */}
                        <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">
                            {/* Content */}
                            <h1 className="text-4xl sm:text-6xl font-bold text-slate-800 mb-6 leading-[1.6] sm:leading-[1.2] text-center"
                            >
                                Contactez-nous
                            </h1>
                            <div className={"flex gap-2 md:gap-8 justify-center flex-col md:flex-row"}>
                                <Link href={"https://www.instagram.com/amiensfood"} className={"flex gap-1 bg-white rounded-2xl p-2 items-center max-w-max mx-auto md:max-w-full md:mx-0"}>
                                    <Instagram className="w-[30px] text-[#FA8419] "/>
                                    <div className="flex-1 text-left">
                                        <p className={"text-[#FA8419] font-extrabold"}>@amiensfood</p>
                                    </div>
                                </Link>

                                <Link href={"mailto:contact@amiens-food.fr"} className={"flex gap-1 bg-white rounded-2xl p-2 items-center max-w-max mx-auto md:max-w-full md:mx-0"}>
                                    <Mail className="w-[30px] text-[#FA8419] "/>
                                    <div className="flex-1 text-left">
                                        <p className={"text-[#FA8419] font-extrabold"}>contact@amiens-food.fr</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
            
            <div className={"mt-0 md:mt-12 max-w-4xl mx-auto px-12 pb-12"} data-aos="fade-up">
                <h2 className={"h3 mb-8 flex items-center gap-1.5"}>Ou envoyez-nous un message <CornerRightDown size={30} className={"mt-3"} /></h2>
                <ContactForm />
            </div>
        </>
    )
}

export default ContactPage