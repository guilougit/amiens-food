import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Badge } from "@/src/components/ui/badge"
import {forwardRef, useImperativeHandle, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader} from "@/src/components/ui/card";
import {prices} from "@/src/config/prices";
import {CheckCircle2} from "lucide-react";

export enum Price {
    Monthly = "monthly",
    Annually = "annually"
}

export interface CheckoutPriceRef {
    price: Price
}

export const CheckoutChoicePrice = forwardRef<CheckoutPriceRef>((props: any, ref) => {
    
    const [price, setPrice] = useState<Price>(Price.Monthly)

    useImperativeHandle(ref, () => ({
        price: price
    }));
    
    return (
        <>
            <h3 className={"text-lg font-semibold"}>Choisi {"l'offre"} qui te convient</h3>

            <Tabs defaultValue={price} className="mx-auto mt-5" onValueChange={(value: string) => setPrice(value as Price)}>
                <TabsList className="py-6 px-2 w-full">
                    <TabsTrigger value={Price.Monthly} className="text-base w-1/2">
                        Mensuel
                    </TabsTrigger>
                    <TabsTrigger value={Price.Annually} className="text-base w-1/2">
                        Annuel
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <Card className={"mt-6 "}>
                <CardHeader className={"flex justify-between flex-row pb-2 items-center space-y-0"}>
                    <h4>
                        <span className={"font-extrabold text-2xl"}>
                            {price === Price.Monthly ? prices.monthly.amount : prices.annually.amount}
                            €
                        </span>
                        /{price === Price.Monthly ? "mois" : "an"}
                    </h4>
                    {price === Price.Annually && <Badge variant={"secondary"} className={"mt-0"}>Économise 20€</Badge>}
                </CardHeader>
                <CardDescription className={"text-left pl-6 pr-2"}>
                    Profite de réductions instantanées sur {"l'ensemble"} de nos restaurants partenaires
                </CardDescription>
                
                <CardContent className={"flex flex-col gap-2 mt-6"}>
                    <div className="flex gap-2">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                        <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">Carte dématérialisée</p>
                    </div>
                    <div className="flex gap-2">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                        <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">Toutes nos réductions disponibles</p>
                    </div>
                    <div className="flex gap-2">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                        <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">Assistance</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
})

CheckoutChoicePrice.displayName = "CheckoutChoicePrice"