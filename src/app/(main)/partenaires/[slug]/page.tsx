import {notFound} from "next/navigation";
import {ThumbnailSlider} from "@/src/components/v2/slider/thumbnail-slider";
import {Card, CardContent} from "@/src/components/ui/card";

export async function generateMetadata({ params }:{params: {slug: string}}) {
    const partner = await fetch(`${process.env.APP_URL}/api/partners/${params.slug}`).then(res => res.json())

    let title = "Partenaires amiens food"

    if(partner.success) {
        title += `- ${partner.partner.name}`
    }

    return {
        title: title,
    }
}

const PartnerDetail = async ({params}:{params: {slug: string}}) => {
    const partnerFetch = await fetch(`${process.env.APP_URL}/api/partners/${params.slug}`, { cache: 'no-store' }).then(res => res.json())

    if(!partnerFetch.success || !partnerFetch.partner) return notFound()

    const mediaPaths = partnerFetch.partner.medias.map((media: any) => `${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${media.path}`);


    return (
        <>
            <div className={"pt-24 md:pt-32 pb-20 mx-4 md:mx-24"} data-aos={"fade-up"}>
                <h1 className={"h3 text-[#FA8419]"}>{partnerFetch.partner.name}</h1>

                <div className={"grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12"}>
                    <div className={"mt-5 flex md:block gap-4 md:gap-0"}>
                        <ThumbnailSlider images={mediaPaths}/>
                        <div className={"block md:hidden"}>
                            <h3 className={"text-lg font-semibold"}>À propos de {partnerFetch.partner.name}</h3>
                            <p className={"mt-3 text-xs"}>{partnerFetch.partner.description}</p>

                            {/*
                            <div className={"space-y-2 mt-2"}>
                                {partnerFetch.partner.offers.map((offer: any) => (
                                    <div
                                        key={offer.id}
                                        className={"shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-slate-300 hover:-translate-y-1.5 transition duration-300 rounded-xl"}>
                                        <Card className={" border-none min-h-[60px] flex justify-center items-center bg-primary"}>
                                            <CardContent className={"p-0"}>
                                                <p className={"font-extrabold text-white text-center"}>
                                                    {offer.text}
                                                </p>

                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                            */}
                        </div>

                    </div>
                    <div className={"space-y-2 mt-2 block md:hidden"}>
                        {partnerFetch.partner.offers.map((offer: any) => (
                            <div
                                key={offer.id}
                                className={"shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-slate-300 hover:-translate-y-1.5 transition duration-300 rounded-xl"}>
                                <Card
                                    className={" border-none min-h-[60px] flex justify-center items-center bg-primary"}>
                                    <CardContent className={"p-0"}>
                                        <p className={"font-extrabold text-white text-center"}>
                                            {offer.text}
                                        </p>

                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <div className=' hidden md:flex flex-col'>
                        <div>
                            <h3 className={"text-xl mt-3 font-semibold "}>Profitez des offres de ce restaurant</h3>

                            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"}>
                                {partnerFetch.partner.offers.map((offer: any) => (
                                    <div
                                        key={offer.id}
                                        className={"shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-slate-300 hover:-translate-y-1.5 transition duration-300 rounded-xl"}>
                                        <Card
                                            className={" border-none min-h-[120px] flex justify-center items-center bg-primary"}>
                                            <CardContent className={"p-0"}>
                                                <p className={"font-extrabold text-2xl text-white text-center"}>
                                                    {offer.text}
                                                </p>

                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {partnerFetch.partner.description && (
                            <div>
                                <h3 className={"text-2xl mt-8 font-semibold"}>À propos
                                    de {partnerFetch.partner.name}</h3>

                                <p className={"mt-3"}>{partnerFetch.partner.description}</p>
                            </div>
                        )}
                    </div>
                </div>
                {partnerFetch.partner.iframe && (
                    <div>
                        <h3 className={"text-2xl mt-8 font-semibold"}>Où trouver cet établissement ?</h3>

                        <iframe
                            src={partnerFetch.partner.iframe} width={"100%"}
                            height="450" allowFullScreen={true} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className={"mt-4 rounded-3xl"}
                        ></iframe>

                    </div>
                )}
            </div>


        </>
    )
}

export default PartnerDetail