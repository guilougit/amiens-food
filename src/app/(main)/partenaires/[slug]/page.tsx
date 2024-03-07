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
            {/* WITH BG ORANGE*/}
            
            <section className="relative">
                <div
                    className="absolute inset-0 rounded-bl-[100px] bg-gradient-to-r from-[#FB943C] via-[#FBBF26] to-[#FB943C] pointer-events-none -z-10"
                    aria-hidden="true"
                />
                <div className={"pt-24 md:pt-32 pb-20 mx-8 md:mx-24"} data-aos={"fade-up"}>
                    <h1 className={"h3"}>{partnerFetch.partner.name}</h1>

                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-12"}>
                        <div className={"mt-5"}>
                            <ThumbnailSlider images={mediaPaths}/>
                        </div>

                        <div className={"flex flex-col"}>
                            <div>
                                <h3 className={"text-xl mt-3 font-semibold "}>Profitez des offres de ce restaurant</h3>

                                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8"}>
                                    {partnerFetch.partner.offers.map((offer: any) => (
                                        <div
                                            key={offer.id}
                                            className={"shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:-translate-y-1.5 transition duration-300 rounded-xl"}>
                                            <Card
                                                className={" border-none min-h-[120px] flex justify-center items-center"}>
                                                <CardContent className={"p-0"}>
                                                    <p className={"text-[#FA8419] font-extrabold text-xl"}>
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
                                    <h3 className={"text-2xl mt-8 font-semibold"}>À propos de {partnerFetch.partner.name}</h3>

                                    <p className={"mt-3"}>{partnerFetch.partner.description}</p>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </section>
            {partnerFetch.partner.iframe && (
                <div className={"mx-8 md:mx-24 pb-8"}>
                    <h3 className={"text-2xl mt-8 font-semibold"}>Où trouver ce restaurant ?</h3>

                    <iframe
                        src={partnerFetch.partner.iframe} width={"100%"}
                        height="450" allowFullScreen={true} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className={"mt-4 rounded-3xl"}
                    ></iframe>

                </div>
            )}
            
            
            {/* WITHOUT BG WHITE CARD ORANGE*/}
            {/*
            <div className={"pt-24 md:pt-32 pb-20 mx-8 md:mx-24"} data-aos={"fade-up"}>
                <h1 className={"h3 text-[#FA8419]"}>{partnerFetch.partner.name}</h1>

                <div className={"grid grid-cols-1 md:grid-cols-2 gap-12"}>
                    <div className={"mt-5"}>
                        <ThumbnailSlider images={mediaPaths}/>
                    </div>

                    <div className='flex flex-col'>
                        <div>
                            <h3 className={"text-xl mt-3 font-semibold "}>Profitez des offres de ce restaurant</h3>
    
                            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8"}>
                                {partnerFetch.partner.offers.map((offer: any) => (
                                    <div
                                        key={offer.id}
                                        className={"shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:-translate-y-1.5 transition duration-300 rounded-xl"}>
                                        <Card className={" border-none min-h-[120px] flex justify-center items-center bg-primary"}>
                                            <CardContent className={"p-0"}>
                                                <p className={"font-extrabold text-xl text-white"}>
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
                                <h3 className={"text-2xl mt-8 font-semibold"}>À propos de {partnerFetch.partner.name}</h3>

                                <p className={"mt-3"}>{partnerFetch.partner.description}</p>
                            </div>
                        )}
                    </div>
                </div>
                {partnerFetch.partner.iframe && (
                    <div>
                        <h3 className={"text-2xl mt-8 font-semibold"}>Où trouver ce restaurant ?</h3>

                        <iframe
                            src={partnerFetch.partner.iframe} width={"100%"}
                            height="450" allowFullScreen={true} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className={"mt-4 rounded-3xl"}
                        ></iframe>

                    </div>
                )}
            </div>  
            */}
            
            
        </>
    )
}

export default PartnerDetail