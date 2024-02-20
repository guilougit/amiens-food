import {useState} from "react";

import {Button} from "@/src/components/ui/button";
import * as React from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/src/components/ui/dialog";

export const DeleteAccountButton = () => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const deleteAccount = () => {
        setIsSubmitting(true)
    }
    
    return (
        <>
            <Button onClick={() => setIsConfirmModalOpen(true)} variant={"destructive"}>Supprimer mon compte</Button>
            <Dialog open={isConfirmModalOpen} onOpenChange={open => setIsConfirmModalOpen(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</DialogTitle>
                    </DialogHeader>
                    <div className={"text-muted-foreground mr-8 text-[15px]"}>
                        Cette action est irréversible. Elle entrainera {"l'annulation"} automatique de votre abonnement chez Amiens food.
                    </div>
                    <DialogFooter>
                        <Button variant={"outline"} onClick={() => setIsConfirmModalOpen(false)} className={"mt-3 sm:mt-0"}>Annuler</Button>
                        <Button variant={"destructive"} isLoading={isSubmitting} onClick={deleteAccount}>
                            {isSubmitting ? "Suppression en cours" : "Oui, je supprime"}
                        </Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}