import {UserCard} from "@/src/components/v2/user/user-card";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {
    Form,
} from "@/src/components/ui/form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardInformations} from "@/src/components/v2/forms/card-informations";
import {Button} from "@/src/components/ui/button";
import {toast} from "sonner";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/src/components/ui/dialog";

const formSchema = z.object({
    firstname: z.string({required_error: ""}).min(1),
    lastname: z.string({required_error: ""}).min(1),
    surname: z.string({required_error: ""}).min(1),
    picture: z
        .custom<File>((v) => v instanceof File, {
            message: ' ',
        }).optional()
})

export const TabCard = ({user}: { user: any }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newImageUrl, setNewImageUrl] = useState<string | null>(null); // État local pour stocker l'URL de la nouvelle image
    
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)


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
        if (!user) return

        form.setValue('firstname', user.firstname)
        form.setValue('lastname', user.lastname)
        form.setValue('surname', user.surname)
    }, [user])


    const onSubmit = (data: any) => {
        setIsConfirmModalOpen(true)
    }
    
    const confirmSubmit = () => {
        setIsSubmitting(true)
        const data = form.getValues()

        const formData = new FormData();
        formData.append('user', JSON.stringify({surname: data.surname}));
        fetch("/api/user", {
            method: 'PATCH',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                if(!res.success) {
                    if(res.code && res.code === "NO_CHANGES") {
                        toast.error("Aucun changement détecté")
                    }
                    setIsSubmitting(false)
                    setIsConfirmModalOpen(false)
                }
                else {
                    // Generate the new card
                    fetch("/api/user/card", {
                        method: 'POST',
                        body: JSON.stringify({afterPayment: false})
                    })
                        .then(res => res.json())
                        .then(res => {
                            setNewImageUrl(res.card);
                            toast.success("Tes informations ont bien été modifiées")
                            setIsSubmitting(false)
                            setIsConfirmModalOpen(false)
                        })
                }
            })
    }

    return (
        <>
            <div data-aos="flip-right">
                <UserCard newImageUrl={newImageUrl}/>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col text-left gap-2.5 mt-8 pb-12"}>
                    <h3 className={"text-lg font-bold md:text-2xl"}>Tu souhaites modifier tes informations ?</h3>

                    <CardInformations isRegistering={false}/>

                    <Button type={"submit"} className={"mt-4 max-w-max"}>Mettre à jour ma
                        carte</Button>
                </form>
            </Form>

            {/* confirmation modal */}
            <Dialog open={isConfirmModalOpen} onOpenChange={open => setIsConfirmModalOpen(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Êtes-vous sûr de vouloir modifier vos informations ?</DialogTitle>
                    </DialogHeader>
                    <div className={"text-muted-foreground mr-8 text-[15px]"}>
                        <p>Une modification de vos informations entraînera la mise à jour de votre carte Food.</p>
                    </div>
                    <DialogFooter>
                        <Button variant={"outline"} onClick={() => setIsConfirmModalOpen(false)} className={"mt-3 sm:mt-0"}>Annuler</Button>
                        <Button isLoading={isSubmitting} onClick={confirmSubmit}>Modifier ma carte</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}