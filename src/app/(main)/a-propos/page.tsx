import type {Metadata} from "next";
import Image from "next/image";
import {TextCustom} from "@/src/utils/types";

export const metadata: Metadata = {
    title: "À propos d'amiens food",
    description: 'Site Internet d\'Amiens Food',
}


const AboutPage = async () => {
    const texts: TextCustom[] = await fetch(`${process.env.APP_URL}/api/texts`, {cache: 'no-store'}).then(res => res.json())
    
    return (
        <>
            {/* HERO BANNER */}
            <section className="relative">
                {/* Bg */}
                <div
                    className="absolute inset-0 rounded-bl-[100px] mb-12 md:mb-0 bg-gradient-to-r from-[#FB943C] via-[#FBBF26] to-[#FB943C] pointer-events-none -z-10"
                    aria-hidden="true"
                />
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-24 md:pt-40 pb-16">
                        {/* Hero content */}
                        <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">
                            {/* Content */}
                            <h1 className="text-4xl sm:text-6xl font-bold text-slate-800 mb-6 leading-[1.6] sm:leading-[1.2] text-center"
                            >
                                Qui suis-je ?
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className={"max-w-6xl mx-auto my-16"}>
                <Image
                    className={"rounded-lg block mx-auto"}
                    src={"/img/baptiste-picture.jpeg"}
                    alt={"Baptiste Arias - Amiens food"}
                    width={200}
                    height={100}
                />
                
                <p
                    className={"mt-12 text-justify mx-12"}
                    dangerouslySetInnerHTML={{
                        __html: texts.find((text) => text.code === "ABOUT_PAGE")?.text as string
                    }}
                >
                </p>
            </div>
        </>
    )
}

export default AboutPage