import {Card, CardContent} from "@/src/components/ui/card";
import { Offer } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface PartnerCardProps {
    logo: string,
    name: string,
    slug: string,
    offers: Offer[]
} 



export const PartnerCard = ({props}:{props: PartnerCardProps }) => {
    
    return (
        <Link href={`/partenaires/${props.slug}`} className={"shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-[180px] sm:min-w-[220px] hover:-translate-y-1.5 transition duration-300 rounded-xl"}>
            <Card className={" border-none h-full"}>
                <CardContent className={"p-4"}>
                    <Image src={`${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${props.logo}`} alt={props.name} width={200} height={100} className={"mx-auto rounded-full w-[120px] h-[100px]"} />

                    <div className={"mt-4"}>
                        <p className={"text-center text-primary font-extrabold"}>{props.name}</p>

                        <ul className={"list-disc text-center list-inside mt-2 mx-auto"}>
                            {props.offers && props.offers.map((offer, index) => (
                                <li key={index}>
                                    {offer.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                </CardContent>
            </Card>
        </Link>

    )
}