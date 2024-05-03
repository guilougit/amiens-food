import {forwardRef, useImperativeHandle, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader} from "@/src/components/ui/card";
import {prices} from "@/src/config/prices";
import {CheckCircle2} from "lucide-react";
import {TextCustom} from "@/src/utils/types";

export enum Price {
    Monthly = "monthly",
    Annually = "annually"
}

export interface CheckoutPriceRef {
    price: Price,
    texts: TextCustom[]
}

export const CheckoutChoicePrice = forwardRef<CheckoutPriceRef>((props: any, ref) => {
    
    const [price, setPrice] = useState<Price>(Price.Annually)

    useImperativeHandle(ref, () => ({
        price: price,
        texts: []
    }));
    
    return (
        <>
            <Card className={"mt-6 "}>
                <CardHeader className={"flex flex-col pb-2 items-start space-y-0.5"}>
                    <h4 className={"text-left"}>
                        <span className={"font-extrabold text-2xl"}>
                            {price === Price.Monthly ? prices.monthly.amount : '9.90'}
                            €
                        </span>
                        /{price === Price.Monthly ? "mois" : "an"}

                    </h4>
                    <span className={"text-muted-foreground text-xs"}>Soit 0.83€ par mois</span>
                </CardHeader>
                <CardDescription className={"text-left pl-6 pr-2 mt-2"}>
                    {props.texts.find((text: TextCustom) => text.code === "PAYMENT_PRICE_SUBTITLE")?.text as string}
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
                    <div className="flex gap-2">
                        <CheckCircle2 size={18} className="my-auto text-green-400"/>
                        <p className="pt-0.5 text-zinc-700 text-sm">Abonnement résiliable à tout moment</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
})

CheckoutChoicePrice.displayName = "CheckoutChoicePrice"
