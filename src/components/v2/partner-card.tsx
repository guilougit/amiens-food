import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

export const PartnerCard = ({item}:{item: {title:string, offers: {id: string, text: string}[], logo: string}}) => {
    return (
        <Card className={"h-full rounded-3xl"}>
            <CardHeader className={"relative"}>
                <Avatar>
                    <AvatarImage
                        className={"absolute rounded-full -top-8 left-1/2 transform -translate-x-1/2 w-[90px] h-[90px]"}
                        alt={item.title}
                        src={`${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${item.logo}`}
                        width={100}
                        height={100}/>
                </Avatar>
                <CardTitle className="text-center pt-8">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className={"list-disc mx-6"}>
                    {item.offers.map((offer, index) => (
                        <li key={index}>
                            {offer.text}
                        </li>
                    ))}
                </ul>

            </CardContent>
        </Card>
    )
}