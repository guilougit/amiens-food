"use client"

import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form, FormControl, FormField, FormItem, FormLabel,
} from "@/src/components/ui/form";
import * as React from "react";
import {useState} from "react";
import {CheckoutButton} from "@/src/components/checkout-button";
import {signIn} from "next-auth/react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    email: z.string({required_error: ""}).email({
        message: "Entrez une adresse mail correcte"
    }),
    password: z.string({required_error: ""}).min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères"
    })
})

export const SigninForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    
    const onSubmitLogin = async (data: any) => {
        setIsSubmitting(true)

        const response = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        })

        console.log(response)
        if(response && (response.error && response.error === "CredentialsSignin")) {
            toast.error('Les identifiants sont incorrects')
            setIsSubmitting(false)
        }
        else if(!response?.error) {
            window.location.replace("/compte")
        }
        
    }
    
    return (
        <div>
            <div className={"mb-10 space-y-1.5"}>
                <h1 className={"text-[1.700rem] font-bold lg:text-3xl w-full"}>Connecte toi à Amiens food</h1>
                <p className={"text-muted-foreground italic text-sm"}>Connecte toi pour accéder à ta carte Food !</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitLogin)}>
                    <div className={"space-y-6"}>
                        <div className="space-y-1.5">
                            <FormField
                                control={form.control}
                                name={"email"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Adresse mail</FormLabel>
                                        <FormControl>
                                            <Input type={"email"} placeholder="mathieu@example.com" {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <FormField
                                control={form.control}
                                name={"password"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <FormControl>
                                            <Input type={"password"} placeholder="* * * * * *" {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button className={"w-full mt-12"} isLoading={isSubmitting}>Se connecter</Button>

                    <div className={"flex mt-8 justify-center gap-2"}>
                        <p className={"text-center"}>Tu {"n'as"} pas encore ta carte ?</p>
                        <CheckoutButton variant={"link"} />
                    </div>
                </form>
            </Form>
        </div>
    )
}