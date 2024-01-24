"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import Image from "next/image";
import SuccessIcon from "@/public/img/icons/success.png";
import Link from "next/link";
import {Button} from "@/src/components/ui/button";
import {DownloadCloud} from "lucide-react";
import {useEffect, useState} from "react";

import LoadingGif from "@/public/img/load.gif"

const SuccessCheckoutCard = () => {
    const [card, setCard] = useState("")

    useEffect(() => {
        // Generate the image
        fetch("/api/user/card", {method: 'POST', body: JSON.stringify({afterPayment: true})})
            .then(res => res.json())
            .then(res => {
                setTimeout(() => {
                    setCard(res.card)
                }, 1500)
            })
    }, []);
    
    return (
        <Card className={"mx-6 rounded-2xl"}>
            <CardHeader>
                <CardTitle className={"text-center"}>
                    <Image src={SuccessIcon} alt={""} width={80} className={"mx-auto"}></Image>

                    <p className={"h3 mt-2"}>Paiement validé</p>
                </CardTitle>
                {card ? (
                    <CardDescription className={"max-w-xl mx-auto text-center pt-4"}>
                        Merci pour votre achat, vous avez accès à votre carte FOOD. Profitez dès maintenant des
                        réductions chez nos partenaires.
                    </CardDescription>
                ) : (
                    <>
                        <p className={"text-xl text-center pt-6"}>Carte en cours de génération</p>
                        <p className={"text-gray-500 text-sm text-center"}>Veuillez patienter, {"l'opération"} devrait durer quelques secondes</p>
                    </>
                )}


            </CardHeader>

            <CardContent>

                <div>
                    {!card ? (
                        <Image src={LoadingGif} alt={""} width={300} className={"mx-auto"} />
                    ): (
                        <>
                            <Image src={card} alt={""} width={400} className={"mx-auto rounded-2xl"} height={200}/>
                            <div className={"text-sm flex justify-center mt-2 gap-1 flex-wrap"}>
                                <p className={"text-gray-500"}>Les informations sont incorrects ?</p>
                                <Link href={"/"} className={"hover:underline"}>Je modifie mes informations</Link>
                            </div>

                            <div className={"mt-8 flex justify-center"}>
                                <Button variant={"secondary"} asChild>
                                    <Link href={"/api/user/card/download"}>
                                        <DownloadCloud/>
                                        <span className={"ml-2"}>Télécharger ma carte</span>
                                    </Link>

                                </Button>
                            </div>
                        </>
                    )}

                </div>

                

            </CardContent>
        </Card>
    )
}

export default SuccessCheckoutCard