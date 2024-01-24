import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Price} from "@/src/components/v2/forms/checkout-choice-price";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/src/components/ui/form";
import {Input} from "@/src/components/ui/input";
import {Button} from "@/src/components/ui/button";
import * as React from "react";
import {useState} from "react";
import {signIn} from "next-auth/react";
import {prices} from "@/src/config/prices";

const formSchema = z.object({
    firstname: z.string({required_error: ""}).min(1),
    lastname: z.string({required_error: ""}).min(1),
    email: z.string({required_error: ""}).email({
        message: "Entrez une adresse mail correcte"
    }),
    password: z.string({required_error: ""}).min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères"
    }),
    picture: z
        .custom<File>((v) => v instanceof File, {
            message: ' ',
        })
})

export const CheckoutAccount = ({price}:{price: Price}) => {
    
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            password: "",
            email: "",
            picture: undefined
        }
    })
    
    const onSubmit = (data: any) => {
        setIsSubmitting(true)
        const formData = new FormData();
        formData.append('file', data.picture);
        formData.append('user', JSON.stringify({email:data.email,firstname:data.firstname,lastname:data.lastname,password:data.password}));
        fetch("/api/auth/register",{method: 'POST', body: formData})
            .then(res => res.json())
            .then(async (res: any) => {
                if (res.user) {
                    //todo : handle error -> account already exists
                    
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col text-left gap-4"}>
                <div className={"flex gap-6"}>
                    <FormField
                        control={form.control}
                        name={"firstname"}
                        render={({ field }) => (
                            <FormItem className={"w-1/2"}>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Matthieu" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"lastname"}
                        render={({ field }) => (
                            <FormItem className={"w-1/2"}>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dumont" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>


                <FormField
                    control={form.control}
                    name={"email"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adresse email</FormLabel>
                            <FormControl>
                                <Input type={"email"} placeholder="matthieu.dumont@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"password"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input type={"password"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"picture"}
                    render={({ field: {ref, name, onBlur, onChange } }) => (
                        <FormItem>
                            <FormLabel>Photo {"d'identité"}</FormLabel>
                            <FormControl>
                                <Input type={"file"} name={name} ref={ref} accept={"image/png, image/jpeg"} onBlur={onBlur} onChange={(e) => {
                                    onChange(e.target.files?.[0]);
                                }} />
                            </FormControl>
                            <FormDescription>Elle est seulement utilisée pour la génération de la carte.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button type={"submit"} color={"primary"} className={"font-extrabold mb-6 w-full lg:w-1/2 max-w-lg mx-auto"} isLoading={isSubmitting}>
                    {!isSubmitting ? "J'achète ma carte" : "Redirection vers la page de paiement"}
                </Button>

            </form>
        </Form>
    )
}