"use client"
import {useEffect, useState} from "react";
import {User} from "@prisma/client";
import {Button} from "@/src/components/ui/button";

import LoadingGif from "@/public/img/loterie.gif"
import Image from "next/image";

export default function RandomPage() {
    
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<User | undefined>()
    
    const onLoadRandom = () => {
        setIsLoading(true)
        setResult(undefined)
        setIsVisible(false)
        
        fetch("/api/admin/random")
            .then(res => res.json())
            .then(res => {
                setTimeout(() => {
                setResult(res)
                    setIsLoading(false)
                }, 3000)
            })
    }

    const [isVisible, setIsVisible] = useState(false);

    // Mettez à jour l'état isVisible lorsque result change
    useEffect(() => {
        if (result) {
            setIsVisible(true);
        }
    }, [result]);
    
    return (
        <div className={"m-6 md:m-12"}>
            <h1 className={"text-3xl md:text-6xl font-bold text-center"}>
                {result ? (
                    <span>Résultat du tirage</span>
                ) : (
                    <span>Tirage au sort {isLoading && 'en cours'}</span>
                )}
            </h1>

            <div className={`${result ? 'mt-6' : 'mt-20'}`}>
                {!isLoading && !result && <Button className={"block mx-auto"} onClick={onLoadRandom}>Lancer un tirage au sort</Button>}

                {isLoading && (
                    <>
                        <Image src={LoadingGif} alt={""} width={300} className={"mx-auto"}/>
                    </>
                )}

                <div className={`text-center ${isVisible ? 'fade-in' : ''}`}>
                    {result && (
                        <div className={"text-center"}>
                            <p className={"font-semibold text-2xl"}>Carte gagnante : <span className={"text-primary text-4xl align-bottom"}>{result.card_number}</span></p>

                            <Image
                                src={`${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${result.card}`}
                                width={400}
                                height={200}
                                alt={""}
                                className={"mt-4 rounded-xl mx-auto min-w-[360px] min-h-[228px] bg-gray-100"}
                            />

                            <Button className={"block mx-auto mt-24"} onClick={onLoadRandom} variant={"outline"}>Relancer un tirage</Button>

                        </div>
                    )}
                </div>

            </div>


        </div>
    )
}
