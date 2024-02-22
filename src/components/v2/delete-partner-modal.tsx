"use client"


import {useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/src/components/ui/dialog";
import {Button} from "@/src/components/ui/button";
import {DialogClose, DialogTrigger} from "@radix-ui/react-dialog";
import {toast} from "sonner";

export const DeletePartnerModal = ({partnerSlug, onDelete}:{partnerSlug: string, onDelete?: (slug:string) => void}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const onSubmit = () => {
        setIsSubmitting(true)
        
        fetch(`/api/admin/partners/${partnerSlug}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    toast.success('Le partenaire a bien été supprimé')
                    if(onDelete) onDelete(partnerSlug)
                }
                else {
                    toast.error('Veuillez réessayer plus tard')
                }
            })
    }
    
    return (
        <Dialog>
            <DialogTrigger className={"w-full text-left"}>
                Supprimer
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Êtes-vous sûr de vouloir supprimer ce partenaire ?</DialogTitle>
                </DialogHeader>
                <div className={"text-muted-foreground mr-8 text-[15px]"}>
                    <p>Cette action est définitive. Elle entrainera la suppresion de toutes les informations liées à ce partenaire.</p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"} className={"mt-3 sm:mt-0"}>Annuler</Button>
                    </DialogClose>
                    <Button variant={"destructive"} isLoading={isSubmitting} onClick={onSubmit}>Supprimer</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}