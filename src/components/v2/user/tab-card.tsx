import {UserCard} from "@/src/components/v2/user/user-card";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {
    Form,
} from "@/src/components/ui/form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import {CardInformations} from "@/src/components/v2/forms/card-informations";
import {Button} from "@/src/components/ui/button";

const formSchema = z.object({
    firstname: z.string({required_error: ""}).min(1),
    lastname: z.string({required_error: ""}).min(1),
    surname: z.string({required_error: ""}).min(1),
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

export const TabCard = ({user}: {user: any}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            surname: "",
            picture: undefined
        }
    })

    useEffect(() => {
        if(!user) return
        
        form.setValue('firstname', user.firstname)
        form.setValue('lastname', user.lastname)
        form.setValue('surname', user.surname)
    }, [user])


    const onSubmit = (data: any) => {
    }

    return (
        <>
            <UserCard/>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col text-left gap-2.5 mt-8 pb-12"}>
                    <h3 className={"text-lg font-bold md:text-2xl"}>Tu souhaites modifier tes informations ?</h3>
                    
                    <CardInformations isRegistering={false}  />
                    
                    <Button className={"mt-4 max-w-max"}>Mettre à jour ma carte</Button>
                </form>
            </Form>
        </>
    )
}