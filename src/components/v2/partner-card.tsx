import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

export const PartnerCard = ({item}:{item: {name:string, offers: {id: string, text: string}[], logo: string}}) => {
    return (
        <Card className={"h-full rounded-3xl"}>
            <CardHeader className={"relative p-4 pb-2 md:-6"}>
                <Avatar className={"absolute rounded-full -top-8 left-1/2 transform -translate-x-1/2 w-[90px] h-[90px] border-2 bg-white overflow-hidden flex justify-center items-center"}>
                    <AvatarImage
                        className={"w-[90px]"}
                        alt={item.name}
                        src={`${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${item.logo}`}
                        width={100}
                        height={100}/>
                </Avatar>
                <CardTitle className="text-center pt-10 text-xs text-muted-foreground">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className={"p-2"}>
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