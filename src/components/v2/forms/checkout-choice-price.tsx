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
    
    const [price, setPrice] = useState<Price>(Price.Annually)

    useImperativeHandle(ref, () => ({
        price: price
    }));
    
    return (
        <>
            <Card className={"mt-6 "}>
                <CardHeader className={"flex flex-col pb-2 items-start space-y-0.5"}>
                    <h4 className={"text-left"}>
                        <span className={"font-extrabold text-2xl"}>
                            {price === Price.Monthly ? prices.monthly.amount : prices.annually.amount}
                            €
                        </span>
                        /{price === Price.Monthly ? "mois" : "an"}

                    </h4>
                </CardHeader>
                <CardDescription className={"text-left pl-6 pr-2"}>
                    Profite de réductions instantanées sur {"l'ensemble"} de nos commerces partenaires
                </CardDescription>
                
                <CardContent className={"flex flex-col gap-2 mt-6"}>
                    <div className="flex gap-2">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                        <p className="pt-0.5 text-zinc-700 text-sm">Carte dématérialisée</p>
                    </div>
                    <div className="flex gap-2">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                        <p className="pt-0.5 text-zinc-700 text-sm">Toutes nos réductions disponibles</p>
                    </div>
                    <div className="flex gap-2">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                        <p className="pt-0.5 text-zinc-700 text-sm">Assistance</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
})

CheckoutChoicePrice.displayName = "CheckoutChoicePrice"