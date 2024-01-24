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
import {useRef, useState} from "react";

type Variant = "solid" | "default";

export const CheckoutButton = ({variant = "default"}:{variant?: Variant}) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)

    const checkoutFormRef = useRef<CheckoutFormRef>(null);

    const handleButtonClick = () => {
        if(checkoutFormRef.current) {
            if(checkoutFormRef.current.step === 0) {
                checkoutFormRef.current.updateStep(1)
                setCurrentStep(1)
            }
            else {
                setIsCheckoutLoading(true)
            }
        }
    }

    return (
        <Drawer shouldScaleBackground={true} onClose={() => {
            document.body.style.background = '';
            setCurrentStep(0)
            setIsCheckoutLoading(false)
        }} >
            <DrawerTrigger>
                {variant === "default" ? (
                    <div
                        className="btn-sm inline-flex items-center text-slate-800 bg-gray-50 hover:bg-gray-100 group shadow-sm"
                    >
                        {"J'achète ma carte"}
                        <span
                            className="tracking-normal text-sky-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                        <svg className="fill-primary" width="12" height="10"
                             xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z"/>
                        </svg>
                    </span>
                    </div>
                ) : (

                    <Button color={"primary"} className={"font-bold"} asChild>
                        <span>{"J'achète ma carte"}</span>
                    </Button>
                )}

            </DrawerTrigger>
            <DrawerContent>
                <div className={"overflow-auto"}>
                    <DrawerHeader className={"mx-auto"}>
                        <DrawerTitle>
                            <p className={"h4 text-center"}>Achète ta carte Amiens food</p>
                        </DrawerTitle>
                        <DrawerDescription>
                            <span className={"text-gray-500 text-center block"}>
                                {currentStep === 0 ? "Une fois l'achat effectué, tu recevras ta carte sur ton adresse mail."
                                    : "On a besoin de quelques informations pour générer ta carte."
                                }
                            </span>
                        </DrawerDescription>

                        {/* Form */}
                        <div className={"mt-2 mx-auto max-w-4xl w-full"}>
                            <CheckoutForm ref={checkoutFormRef} />
                        </div>
                    </DrawerHeader>
                    { currentStep === 0 && (
                        <DrawerFooter className={"w-full lg:w-1/2 max-w-lg mx-auto"}>
                            <Button type={"submit"} color={"primary"} className={"font-extrabold mb-6"} isLoading={isCheckoutLoading} onClick={handleButtonClick}>
                                Continuer
                            </Button>
                        </DrawerFooter>
                    )}

                </div>
            </DrawerContent>
        </Drawer>

    )
}