"use client"

import * as React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/src/components/ui/drawer"
import {Button} from "@/src/components/ui/button";

import {CheckoutForm, CheckoutFormRef} from "@/src/components/v2/forms/checkout-form";
import {useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {MoveRight} from "lucide-react";

type Variant = "solid" | "default" | "link" | "footer";

export const CheckoutButton = ({variant = "default", size = "normal"}: { variant?: Variant , size?: "normal" | "large"}) => {
    const {data: session, status} = useSession()

    const [currentStep, setCurrentStep] = useState(0)
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)

    const checkoutFormRef = useRef<CheckoutFormRef>(null);

    const [hideButton, setHideButton] = useState(false)

    const handleButtonClick = () => {
        if (checkoutFormRef.current) {
            if (checkoutFormRef.current.step === 0) {
                checkoutFormRef.current.updateStep(1)
                setCurrentStep(1)
            } else {
                setIsCheckoutLoading(true)
            }
        }
    }
    return (
        <>
            <Drawer shouldScaleBackground={true} onClose={() => {
                document.body.style.background = '';
                setCurrentStep(0)
                setIsCheckoutLoading(false)
            }}>
                <DrawerTrigger>
                    {!session?.user && (
                        <>
                            {variant === "default" ? (
                                <div
                                    className={`btn-sm inline-flex items-center text-slate-800 bg-gray-50 hover:bg-gray-100 group ${size === "large" ? 'p-4 text-xl md:px-4 md:py-2 md:text-base' : '' } shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-black`}
                                >
                                    {"J'achète ma carte"}
                                    <MoveRight className={`tracking-normal text-primary group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2 ${size === 'large' ? 'w-[30px] h-[30px] md:w-[22px] md:h-[22px] text-4xl md:text-base' : ''}`} />
                                </div>
                            ) : variant === "solid" ? (

                                <Button color={"primary"} className={"font-bold"} asChild>
                                    <span>{"J'achète ma carte"}</span>
                                </Button>
                            ) : variant === "link" ? (
                                <>
                                    <span className={"underline"}>Clique ici</span>
                                </>
                            ) : (
                                <span className={"underline"}>{"J'achète"} ma carte</span>
                            )}
                        </>
                    )}
                </DrawerTrigger>
                <DrawerContent>
                    <div className={"overflow-auto"}>
                        <DrawerHeader className={"mx-auto"}>
                            <DrawerTitle>
                                <p className={"h4 text-center text-3xl"}>Génère ta carte en <br/> 60 secondes chrono</p>
                            </DrawerTitle>
                            <DrawerDescription>
                            <span className={"text-gray-500 text-center block"}>
                                {currentStep === 0 ? "Une fois l'achat effectué, tu recevras ta carte sur ton adresse mail."
                                    : "On a besoin de quelques informations pour générer ta carte."
                                }
                            </span>
                            </DrawerDescription>

                            {/* Form */}
                            <div className={"mt-2 mx-auto max-w-6xl w-full"}>
                                <CheckoutForm ref={checkoutFormRef}/>
                            </div>
                        </DrawerHeader>
                        {currentStep === 0 && (
                            <DrawerFooter className={"w-full lg:w-1/2 max-w-lg mx-auto"}>
                                <Button type={"submit"} color={"primary"} className={"font-extrabold mb-6"}
                                        isLoading={isCheckoutLoading} onClick={handleButtonClick}>
                                    Continuer
                                </Button>
                            </DrawerFooter>
                        )}

                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}