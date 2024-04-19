import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Price} from "@/src/components/v2/forms/checkout-choice-price";
import {
    Form,
} from "@/src/components/ui/form";
import {Button} from "@/src/components/ui/button";
import * as React from "react";
import {useState} from "react";
import {signIn} from "next-auth/react";
import {prices} from "@/src/config/prices";
import {CheckoutCardPreview} from "@/src/components/v2/forms/checkout-card-preview";
import {Separator} from "@/src/components/ui/separator";
import {CardInformations} from "@/src/components/v2/forms/card-informations";
import {toast} from "sonner";
import {TextCustom} from "@/src/utils/types";

const formSchema = z.object({
    firstname: z.string({required_error: ""}).min(1),
    lastname: z.string({required_error: ""}).min(1),
    surname: z.string().nullable().optional(),
    email: z.string({required_error: ""}).email({
        message: "Entrez une adresse mail correcte"
    }),
    password: z.string({required_error: ""}).min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères"
    }),
    picture: z
        .custom<File>((v) => v instanceof File, {
            message: ' ',
        }),
    terms: z.literal(true)
})

export const CheckoutAccount = ({price, texts}:{price: Price, texts: TextCustom[]}) => {
    
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            surname: "",
            password: "",
            email: "",
            picture: undefined,
            terms: undefined
        }
    })
    
    const onSubmit = (data: any) => {
        setIsSubmitting(true)
        const formData = new FormData();
        formData.append('file', data.picture);
        formData.append('user', JSON.stringify({email:data.email,firstname:data.firstname,lastname:data.lastname,surname: data.surname, password:data.password}));
        
        fetch("/api/auth/register",{method: 'POST', body: formData})
            .then(res => res.json())
            .then(async (res: any) => {
                if(!res.success) {
                    setIsSubmitting(false)
                    switch (res.code) {
                        case 'EMAIL_ALREADY_TAKEN':
                            toast.error("L'adresse email est déjà utilisée")
                            break;
                        default:
                            toast.error("Erreur lors de l'inscription")
                    }
                    return;
                }
                if (res.user) {
                    // Auto sign in the user
                    await signIn("credentials", {
                        redirect: false,
                        email: data.email,
                        password: data.password
                    })
                    
                    const priceId = price === Price.Monthly ? prices.monthly.stripe_id : prices.annually.stripe_id

                    fetch("/api/payment/checkout_sessions", {
                        method: 'POST',
                        body: JSON.stringify({priceId})
                    })
                        .then(res => res.json())
                        .then(res => {
                            // redirect the user to the checkout page
                           window.location.assign(res.url)
                        })
                }

            })         
    }
    
    return (
        <>
            <Form {...form}>
                <div className={"grid grid-cols-1 md:grid-cols-2 h-full"}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col text-left gap-2.5 space-y-3 md:pb-6"}>
                        <h3 className={"text-xl font-semibold"}>{texts.find(text => text.code === "PAYMENT_FORM_INF")?.text}</h3>
                        
                        <CardInformations isRegistering={true} />
                        
                        <Button type={"submit"} color={"primary"}
                                className={"font-extrabold mb-6 w-full lg:w-2/3 max-w-lg mx-auto"}
                                isLoading={isSubmitting}>
                            {!isSubmitting ? "J'achète ma carte" : "Redirection vers la page de paiement"}
                        </Button>

                    </form>


                    <div className={"flex ml-0 gap-0 md:gap-6 md:ml-6 pb-10 mt-3 md:mt-0"}>
                        <Separator orientation={"vertical"} className={"hidden md:block"}/>
                        <div className={"w-full"}>
                            <h3 className={"text-xl mb-0 md:mb-4 bold text-left font-semibold"}>{texts.find(text => text.code === "PAYMENT_FORM_PREVIEW")?.text}</h3>

                            <CheckoutCardPreview/>
                        </div>

                    </div>

                </div>

            </Form>

        </>
    )
}