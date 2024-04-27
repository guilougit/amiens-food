import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form";
import {
    Form,
} from "@/src/components/ui/form";
import {Input} from "@/src/components/ui/input";
import {Button} from "@/src/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog"
import {LogoutButton} from "@/src/components/ui/logout-button";
import {signIn, useSession} from "next-auth/react";
import {toast} from "sonner";
import {DeleteAccountButton} from "@/src/components/v2/user/delete-account-button";


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
    const { data: session } = useSession()


    const [isSubmittingUpdateEmail, setIsSubmittingUpdateEmail] = useState(false)
    const [isSubmittingUpdatePwd, setIsSubmittingUpdatePwd] = useState(false)
    
    const [password, setPassword] = useState("")
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

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
        // Don't open modal if no changes
        if(data.email === session?.user.email) {
            toast.warning("L'adresse email n'a pas changé.")
        }
        else {
            setIsPasswordModalOpen(true)
        }
    }
    
    const confirmUpdateEmail = () => {
        setIsSubmittingUpdateEmail(true)
        fetch('/api/user/me/update-email', {method: 'POST', body: JSON.stringify({email: updateEmailForm.getValues('email'), password})})
            .then(res => res.json())
            .then(res => {
                console.log(res)
                
                setTimeout(async () => {
                    if (!res.success) {
                        switch (res.code) {
                            case 'BAD_PASSWORD':
                                toast.error("Le mot de passe est incorrect");
                                break;
                            case 'SAME_EMAIL':
                                toast.error("L'adresse email n'a pas changé");
                                break;
                            default:
                                toast.error("Veuillez réessayer plus tard")
                        }
                        setIsSubmittingUpdateEmail(false)
                    } else {
                        // Recreate the session
                        await signIn('credentials', {
                            redirect: false,
                            email: res.user.email,
                            password: password
                        })

                        toast.success("L'adresse mail a bien été modifié")
                        setIsPasswordModalOpen(false)

                        setIsSubmittingUpdateEmail(false)
                    }

                }, 500)
            })
    }

    const onSubmitUpdatePassword= (data: any) => {
        setIsSubmittingUpdatePwd(true)
        
        fetch("/api/user/me/update-password", {
            method: 'POST',
            body: JSON.stringify({oldPassword: data.old_password, newPassword: data.new_password})
        })
            .then(res => res.json())
            .then(res => {
                setTimeout(async () => {
                    if (!res.success) {
                        switch (res.code) {
                            case 'BAD_PASSWORD':
                                toast.error("Le mot de passe actuel est incorrect");
                                break;
                            default:
                                toast.error("Veuillez réessayer plus tard")
                        }
                        setIsSubmittingUpdatePwd(false)
                    } else {
                        toast.success("Le mot de passe a bien été modifié")
                        setIsSubmittingUpdatePwd(false)
                    }
                }, 500)
            })
    }
    
    return (
        <>
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
                        <div className={"px-2"}>
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
                                    <Button type={"submit"} className={"mt-4"} variant={"secondary"} isLoading={isSubmittingUpdatePwd}>Sauvegarder</Button>
                                </form>
                            </Form>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

                {/*
                <div className={"mt-6"}>
                    <DeleteAccountButton />
                </div>
                */}
                
            <LogoutButton size={"mobile"} />

        </div>

            {/* password confirmation modal */}
            <Dialog open={isPasswordModalOpen} onOpenChange={open => setIsPasswordModalOpen(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Veuillez confirmer votre mot de passe</DialogTitle>
                    </DialogHeader>
                    <div className={"mt-4"}>
                        <Input type="password" placeholder="* * * * * * *" onInput={e => setPassword(e.currentTarget.value)}/>
                    </div>
                    <DialogFooter>
                        <Button isLoading={isSubmittingUpdateEmail} onClick={confirmUpdateEmail} >Modifier mon adresse mail</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}