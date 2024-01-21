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


const formSchema = z.object({
    firstname: z.string({required_error: ""}).min(1),
    lastname: z.string({required_error: ""}).min(1),
    email: z.string({required_error: ""}).email({
        message: "Entrez une adresse mail correcte"
    }),
    password: z.string({required_error: ""}).min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères"
    }),
    picture: z.string({required_error: "Veuillez sélectionner un fichier"}).min(1, {message: " "})
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
            picture: ""
        }
    })
    
    const onSubmit = (data: any) => {
        console.log(data, price)
        setIsSubmitting(true)
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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Photo {"d'identité"}</FormLabel>
                            <FormControl>
                                <Input type={"file"} {...field} />
                            </FormControl>
                            <FormDescription>Elle est seulement utilisée pour la génération de la carte.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button type={"submit"} color={"primary"} className={"font-extrabold mb-6"} isLoading={isSubmitting}>
                    {"J'achète ma carte"}
                </Button>

            </form>
        </Form>
    )
}