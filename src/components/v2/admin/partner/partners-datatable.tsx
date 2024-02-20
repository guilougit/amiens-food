"use client"

import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/src/components/ui/button";
import {ArrowUpDown, Images, MapPinned, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import {CrudTable} from "@/src/components/v2/admin/crud-table";
import {useEffect, useState} from "react";
import {DateTime} from "luxon";
import {Dialog, DialogContent, DialogTrigger} from "@/src/components/ui/dialog";
import Image from "next/image";

const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "logo",
        header: "Logo",
        cell: ({row}) => <div className="lowercase">
            <Image src={`${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${row.getValue("logo")}`}
                   alt={`Amiens food partenaire`} width={100} height={200}/>
        </div>,
    },
    {
        accessorKey: "medias",
        header: "Images",
        cell: ({row}) => (
            <Dialog>
                <DialogTrigger>
                    <Button variant={"outline"} size={"icon"}>
                        <Images/>
                    </Button>
                </DialogTrigger>
                <DialogContent className={"min-w-max lg:min-w-[800px]"}>
                    <div className={"flex flex-wrap justify-center max-w-[350px] md:max-w-max gap-4"}>
                        {row.getValue("medias") ? (row.getValue("medias") as []).map((media: any) => (
                            <Image src={`${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${media.path}`} alt={`Amiens food partenaire`} width={200} height={200}/>
                        )) : ''}
                    </div>
                </DialogContent>
            </Dialog>
        ),
    },
    {
        accessorKey: "offers",
        header: "Offres",
        cell: ({row}) => (
            <ul>
                {(row.getValue('offers') ? (row.getValue('offers') as []).map((o: any) => <li>{o.text}</li>) : '')}
            </ul>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => <div>{row.getValue("description")}</div>,
    },
    {
        accessorKey: "iframe",
        header: "Localisation",
        cell: ({row}) => (
            <Dialog>
                <DialogTrigger>
                    <Button variant={"outline"} size={"icon"}>
                        <MapPinned/>
                    </Button>
                </DialogTrigger>
                <DialogContent className={"min-w-max lg:min-w-[800px]"}>
                    <iframe
                        src={row.getValue('iframe')} width={"100%"} className={"p-3"}
                        height="450" allowFullScreen={true} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>

                </DialogContent>
            </Dialog>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Ajouté le",
        cell: ({row}) => <div>{DateTime.fromISO(row.getValue("createdAt")).toFormat("dd/mm/yyyy")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}: { row: any }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Éditer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


export const PartnersDatatable = () => {
    const [partners, setPartners] = useState([])


    useEffect(() => {
        fetch("/api/admin/partners")
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setPartners(res.partners)
                }
            })
    }, []);

    return (
        <CrudTable props={{columns, data: partners, search: {active: true, byField: 'name'}}}/>
    )
}