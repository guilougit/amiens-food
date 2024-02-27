"use client"
 
import {CrudTable} from "@/src/components/v2/admin/crud-table";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/src/components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import {useEffect, useRef, useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/src/components/ui/dialog";
import {Input} from "@/src/components/ui/input";
import {DialogClose, DialogTrigger} from "@radix-ui/react-dialog";
import {Textarea} from "@/src/components/ui/textarea";
import {toast} from "sonner";
import {TextCustom} from "@/src/utils/types";

export const TextsDatatable = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [texts, setTexts] = useState<any[]>([])
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    
    const [openModal, setOpenModal] = useState(false)
    const [textToEdit, setTextToEdit] = useState<any>()

    useEffect(() => {
        fetch("/api/texts")
            .then(res => res.json())
            .then(res => {
                setTexts(res)
            })
    }, []);
    
    const handleOpenModal = (id: string) => {
        setTextToEdit(id)
        setOpenModal(true)
    }
    
    const onUpdate = (id: string) => {
        if(textAreaRef.current) {
            setIsSubmitting(true)
            fetch(`/api/admin/texts/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({text: (textAreaRef.current.value)})
            })
                .then(res => res.json())
                .then(res => {
                    if(res.success) {
                        toast.success('Le texte a bien été modifié')
                        setTexts(prevTexts => prevTexts.map(text => text.id === id ? { ...text, text: res.text.text } : text));
                        setOpenModal(false)
                        
                        setTimeout(() => {
                            setIsSubmitting(false)
                        }, 300) 
                    }
                    else {
                        toast.error('Veuillez réessayer plus tard')
                        setIsSubmitting(false)

                    }
                })
        }
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "libelle",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Titre
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("libelle")}</div>,
        },
        {
            accessorKey: "text",
            header: "Texte",
            cell: ({ row }) => <div>{row.getValue("text")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }: {row: any}) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenModal(row.original)} 
                            >
                                Éditer
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]


    return (
        <>
            <CrudTable props={{columns, data: texts, search: {active: false}}} />
            <Dialog open={openModal} onOpenChange={open => setOpenModal(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{textToEdit?.libelle}</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Textarea
                            ref={textAreaRef}
                            defaultValue={textToEdit?.text}
                            rows={3}
                            className={"resize-none"}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"} className={"mt-3 sm:mt-0"}>Annuler</Button>
                        </DialogClose>
                        <Button onClick={() => onUpdate(textToEdit?.id)} isLoading={isSubmitting}>Modifier</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>

        </>
    )
}