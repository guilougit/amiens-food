import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {CheckoutChoicePrice, CheckoutPriceRef, Price} from "@/src/components/v2/forms/checkout-choice-price";
import {CheckoutAccount} from "@/src/components/v2/forms/checkout-account";
import {TextCustom} from "@/src/utils/types";

export interface CheckoutFormRef {
    updateStep: (newStep: number) => void;
    step: number,
    texts: TextCustom[]
}

export const CheckoutForm = forwardRef<CheckoutFormRef>((props: any, ref) => {
    const [step, setStep] = useState<number>(0)

    const checkoutChoicePriceRef = useRef<CheckoutPriceRef>(null)
    

    useImperativeHandle(ref, () => ({
        updateStep: (newStep) => setStep(newStep),
        step: step,
        texts: []
    }));
    
    return (
        <>
            {/*@ts-ignore*/}
            {step === 0 && <CheckoutChoicePrice ref={checkoutChoicePriceRef} texts={props.texts} />}
            {step === 1 && <CheckoutAccount price={(checkoutChoicePriceRef.current && checkoutChoicePriceRef.current.price) ?? Price.Monthly} texts={props.texts} />}
        </>
    )
    
})

CheckoutForm.displayName = "CheckoutForm"