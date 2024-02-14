"use client"

import {useEffect, useState} from "react";
import Image from "next/image";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger
} from "@/src/components/ui/drawer";
import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton"

export const UserCard = () => {
    const [openFullscreen, setOpenFullscreen] = useState(false)
    const [card, setCard] = useState("")

    useEffect(() => {
        // Generate the image
        fetch("/api/user/card", {method: 'POST', body: JSON.stringify({afterPayment: true})})
            .then(res => res.json())
            .then(res => {
                setCard(res.card)
            })
    }, []);

    return (
        <>
            {card ? (
                <Drawer shouldScaleBackground={true} onClose={() => {
                    document.body.style.background = '';

                }}>
                    <DrawerTrigger asChild>
                        <div className={"mx-auto max-w-max min-h-[250px]"}>
                            <Image src={card} alt={""} width={600} className={"mx-auto rounded-2xl max-w-[400px] md:max-w-[600px] w-full"} height={200}/>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <Image src={card} alt={""} width={400} className={"mx-auto rounded-2xl rotate-90 md:rotate-0 mt-40 w-full md:w-[50%]"}
                               height={200}/>
                    </DrawerContent>
                </Drawer>
            ) : (
                <>
                    <Skeleton className="mx-auto rounded-2xl w-[340px] md:w-[400px] h-[250px]" />
                </>
            )}

        </>
    )
}