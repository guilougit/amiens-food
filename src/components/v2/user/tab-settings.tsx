import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form";
import {
    Form,
} from "@/src/components/ui/form";
import {Input} from "@/src/components/ui/input";
import * as React from "react";
import {Button} from "@/src/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion"
import {signOut} from "next-auth/react";
import {LogOut} from "lucide-react";
import {LogoutButton} from "@/src/components/ui/logout-button";


const updateEmailFormSchema = z.object({
    email: z.string({required_error: ""}).email({
        message: "Entrez une adresse mail correcte"
    }),
})

const updatePasswordFormSchema = z.object({
    old_password: z.string({required_error: ""}).min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères"
    }),
    new_password: z.string({required_error: ""}).min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères"
    }),
    new_password_confirm: z.string({required_error: ""}).min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères"
    }),
}).refine((data) => data.new_password === data.new_password_confirm, {
    path: ['new_password_confirm'],
    message: 'Les deux mots de passe ne correspondent pas'
})

export const TabSettings = ({user}:{user: any}) => {

    const updateEmailForm = useForm<z.infer<typeof updateEmailFormSchema>>({
        resolver: zodResolver(updateEmailFormSchema),
        defaultValues: {
            email: "",
        }
    })

    const updatePasswordForm = useForm<z.infer<typeof updatePasswordFormSchema>>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            old_password: "",
            new_password: "",
            new_password_confirm: "",
        }
    })
    
    useEffect(() => {
        if(!user) return
        
        updateEmailForm.setValue('email', user.email)
    }, [user])
    
    const onSubmitUpdateEmail = (data: any) => {
        console.log(data)
    }

    const onSubmitUpdatePassword= (data: any) => {
        console.log(data)
    }
    
    return (
        <div className={"pb-12"}>
            <h1 className={"text-xl font-semibold"}>Informations personnelles</h1>

            {/* Update EMAIL */}
            <Form {...updateEmailForm}>
                <form onSubmit={updateEmailForm.handleSubmit(onSubmitUpdateEmail)} className={"mt-3"}>
                    <FormField
                        control={updateEmailForm.control}
                        name={"email"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Adresse email</FormLabel>
                                <FormControl>
                                    <Input type={"email"} placeholder="matthieu.dumont@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <Button className={"mt-4"} variant={"secondary"}>Sauvegarder</Button>
                </form>
            </Form>
            
            {/* Update PASSWORD */}
            <Accordion type="single" collapsible className={"mt-4"}>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Modifier mon mot de passe</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            <Form {...updatePasswordForm}>
                                <form onSubmit={updatePasswordForm.handleSubmit(onSubmitUpdatePassword)}
                                      className={"space-y-4"}>
                                    <FormField
                                        control={updatePasswordForm.control}
                                        name={"old_password"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Mot de passe actuel</FormLabel>
                                                <FormControl>
                                                    <Input type={"password"}
                                                           placeholder="Votre mot de passe" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={updatePasswordForm.control}
                                        name={"new_password"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Nouveau mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input type={"password"}
                                                           placeholder="Nouveau mot de passe" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={updatePasswordForm.control}
                                        name={"new_password_confirm"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Confirmer le mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input type={"password"}
                                                           placeholder="Confirmer le nouveau mot de passe" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type={"submit"} className={"mt-4"}
                                            variant={"secondary"}>Sauvegarder</Button>
                                </form>
                            </Form>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            
            <Button variant={"destructive"} className={"mt-8"}>Supprimer mon compte</Button>

            <LogoutButton size={"mobile"} />

        </div>
    )
}