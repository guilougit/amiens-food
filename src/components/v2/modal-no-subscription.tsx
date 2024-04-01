'use client'

import {User} from "@prisma/client";
import {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/src/components/ui/dialog";
import {Button} from "@/src/components/ui/button";
import {AlertCircle, Images} from "lucide-react";
import Image from "next/image";
import {DialogFooter, DialogHeader} from "@/components/ui/dialog";
import {CheckoutButton} from "@/src/components/checkout-button";
import * as React from "react";
import {Price} from "@/src/components/v2/forms/checkout-choice-price";
import {prices} from "@/src/config/prices";

export const ModalNoSubscription = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [user, setUser] = useState<User>()

    const [isSubmitting, setIsSubmitting] = useState(false)


    useEffect(() => {
        fetch("/api/user/me")
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    setUser(res.user)
                    
                    console.log(res.user)
                    if(!res.user.StripeAccount.start) {
                        setIsModalOpen(true)
                    }
                }
            })
    }, []);
    
    const onSubmit = () => {
        setIsSubmitting(true)
        fetch("/api/payment/checkout_sessions", {
            method: 'POST',
            body: JSON.stringify({priceId: prices.annually.stripe_id})
        })
            .then(res => res.json())
            .then(res => {
                window.location.assign(res.url)
            })
    }
    
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className={"min-w-max lg:min-w-[800px]"}>
                <DialogHeader>
                    <div className={"flex items-center gap-1"}>
                        <AlertCircle className={"text-orange-500"} size={32} strokeWidth={3} />
                        <h1 className={"text-3xl font-semibold"}>{"Ton compte ne possède pas d'abonnement"}</h1>
                    </div>

                </DialogHeader>
                <p className={"text-lg"}>Veux-tu souscrire à Amiens Food ?</p>

                <Button onClick={onSubmit} color={"primary"}
                        className={"max-w-max mx-auto"}
                        isLoading={isSubmitting}>
                    {!isSubmitting ? "J'achète ma carte" : "Redirection vers la page de paiement"}
                </Button>

            </DialogContent>
        </Dialog>
    )
}