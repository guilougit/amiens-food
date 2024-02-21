"use client"

import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form";
import {Input} from "@/src/components/ui/input";
import {Form} from "@/src/components/ui/form";
import {Button} from "@/src/components/ui/button";
import {Textarea} from "@/src/components/ui/textarea";
import {toast} from "sonner";

const formSchema = z.object({
    name: z.string({required_error: ""}).min(1),
    email: z.string({required_error: ""}).email({message: "Entrez une adresse mail correct"}).min(1),
    content: z.string({required_error: ""}).min(1),
})

export const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            content: ""
        }
    })
    
    const onSubmit = (data: any) => {
        setIsSubmitting(true)
        fetch("/api/contact", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    toast.success('Votre message a bien été envoyé')
                    form.reset()

                }
                else {
                    toast.error('Veuillez reéssayer plus tard')
                }
                setIsSubmitting(false)
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez votre nom" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adresse mail</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez votre adresse mail" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Contenu de votre message" {...field} rows={8} className={"resize-none"}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                
                <Button isLoading={isSubmitting} className={ "mx-auto w-1/3 rounded-xl flex"}>
                    {isSubmitting ? 'Envoie en cours' : 'Envoyer'}
                </Button>
            </form>
        </Form>
    )
}