import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {BadgeInfo} from "lucide-react";
import * as React from "react";
import Image from "next/image";
import ImageStep1 from "@/public/img/help_map_step_1.png"
import ImageStep2 from "@/public/img/help_map_step_2.png"

export const HelpMapEmbedDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <BadgeInfo size={20}/>
            </DialogTrigger>
            <DialogContent className={"max-w-[80%] overflow-y-scroll mt-2 mb-2 max-h-[90%]"}>
                <DialogHeader>
                    <DialogTitle className={"text-3xl underline"}>Comment intégrer une carte ?</DialogTitle>
                    <DialogDescription className={"text-black  pt-2 grid grid-cols-1 lg:grid-cols-2"}>
                        <div className={"space-y-4"}>
                            <h3 className={"text-xl font-semibold"}>Étape 1. Chercher le restaurant sur google maps</h3>

                            <h3 className={"text-xl font-semibold"}>Étape 2. Cliquer sur {"Partager"}</h3>
                            <Image src={ImageStep1} alt={""} width={600} height={200} className={"w-[400px] mx-auto mt-4"}/>

                        </div>
                        <div>

                            <h3 className={"text-xl font-semibold"}>Étape 3. Cliquer sur {"\"Intégrer une carte\""} puis copier
                                le
                                lien contenu dans {"\"src\""}</h3>
                            <Image src={ImageStep2} alt={""} width={600} height={200} className={"w-[500px]"}/>

                        </div>

                        <div className={"mt-4 lg:mt-0"}>
                            <p className={"font-bold"}>Exemple pour la cabane à poutine :</p>
                            <p className={"break-all w-full"}>
                                https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.1566240946163!2d2.300250112948398!3d49.89586277137263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e7843834e084ef%3A0x5a397d7c5dc01b06!2sLa%20Cabane%20%C3%A0%20Poutines!5e0!3m2!1sfr!2sfr!4v1711017217720!5m2!1sfr!2sfr                            </p>
                        </div>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}