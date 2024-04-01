import type {Metadata} from "next";
import {ListPartner} from "@/src/components/v2/partner/list-partner";
import {TextCustom} from "@/src/utils/types";
export const metadata: Metadata = {
    title: 'Amiens food - partenaires',
    description: 'Liste des restaurants partenaires avec amiens food',
}

const PartnerPage = async () => {
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
                    <div className="pt-24 md:pt-40 pb-20">
                        {/* Hero content */}
                        <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">
                            {/* Content */}
                            <h1 className="text-4xl sm:text-6xl font-bold text-slate-800 mb-6 leading-[1.6] sm:leading-[1.2] text-center"
                            >
                                {texts.find(text => text.code === "PARTNER_LIST_TITLE")?.text}
                            </h1>
                            <p className="text-lg text-slate-700 mb-8 text-center">
                                {texts.find(text => text.code === "PARTNER_LIST_SUBTITLE")?.text}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className={"min-h-[500px]"}>
                <ListPartner/>
            </div>
        </>
    )
}

export default PartnerPage