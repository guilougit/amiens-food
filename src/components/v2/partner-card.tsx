import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

export const PartnerCard = ({item}:{item: {title:string, offers: string[], image: string}}) => {
    return (
        <Card className={"h-full rounded-3xl"}>
            <CardHeader className={"relative"}>
                <Avatar>
                    <AvatarImage className={"absolute rounded-full -top-8 left-1/2 transform -translate-x-1/2 h-[80px]"} alt={'NOM_PARTENAIRE'} src={item.image ?? ''} width={80} height={80}/>
                </Avatar>
                <CardTitle className="text-center pt-8">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className={"list-disc mx-6"}>
                    {item.offers.map((offer, index) => (
                        <li key={index}>
                            {offer}
                        </li>
                    ))}
                </ul>

            </CardContent>
        </Card>
    )
}