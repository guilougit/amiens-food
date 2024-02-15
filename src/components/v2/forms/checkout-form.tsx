import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {CheckoutChoicePrice, CheckoutPriceRef, Price} from "@/src/components/v2/forms/checkout-choice-price";
import {CheckoutAccount} from "@/src/components/v2/forms/checkout-account";
import {z} from "zod";

export interface CheckoutFormRef {
    updateStep: (newStep: number) => void;
    step: number
}

export const CheckoutForm = forwardRef<CheckoutFormRef>((props: any, ref) => {
    const [step, setStep] = useState<number>(0)

    const checkoutChoicePriceRef = useRef<CheckoutPriceRef>(null)
    

    useImperativeHandle(ref, () => ({
        updateStep: (newStep) => setStep(newStep),
        step: step
    }));
    
    return (
        <>
            {step === 0 && <CheckoutChoicePrice ref={checkoutChoicePriceRef}/>}
            {step === 1 && <CheckoutAccount price={(checkoutChoicePriceRef.current && checkoutChoicePriceRef.current.price) ?? Price.Monthly} />}
        </>
    )
    
})

CheckoutForm.displayName = "CheckoutForm"