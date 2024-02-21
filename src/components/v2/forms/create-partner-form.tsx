"use client"

import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/src/components/ui/form";
import {Button} from "@/src/components/ui/button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form";
import {Input} from "@/src/components/ui/input";
import * as React from "react";
import {BadgeInfo, Plus, PlusCircle, PlusSquare, Trash, Trash2} from "lucide-react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    name: z.string({required_error: ""}).min(1),
    slug: z.string({required_error: ""}).min(1).optional(),
    description: z.string({required_error: ""}).min(1),
    iframe: z.string().optional(),
    offers: z.string({required_error: ""}).array().min(1),
    logo: z
        .custom<File>((v) => v instanceof File, {
            message: ' ',
        }),
    medias: z.any()
})

export const CreatePartnerForm = () => {
    const router = useRouter()
    const [slug, setSlug] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            iframe: "",
            offers: [''],
        }
    })

    const onSubmit = (data: any) => {
        setIsSubmitting(true)
        const formData = new FormData();
        // Add medias
        for (let i = 0; i < data.medias.length; i++) {
            formData.append(`medias`, data.medias[i])
        }
        formData.append("logo", data.logo)
        formData.append("partner", JSON.stringify({
            name: data.name,
            slug: slug,
            description: data.description,
            offers: data.offers,
            iframe: data.iframe
        }))
        fetch("/api/admin/partners", {method: 'POST', body: formData})
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    toast.success("Le partenaire a bien été ajouté")
                    router.replace("/admin/partners")
                }
            })
    }

    const autoFillSlug = (name: string) => {
        const nameWithoutAccent = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const slug = nameWithoutAccent
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
        setSlug(slug)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full md:w-5/6 mx-auto"}>
                <div className={"flex gap-12 flex-col md:flex-row"}>
                    <div className={"space-y-4 w-full md:w-1/2"}>
                        <h3 className={"text-xl font-semibold"}>Informations</h3>

                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dumont" {...field} maxLength={25}
                                               onInput={(e) => autoFillSlug(e.currentTarget.value)}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"slug"}
                            disabled={true}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input {...field} maxLength={25} value={slug}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"description"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input type={"text"} {...field} maxLength={25}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"iframe"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={"flex items-center gap-1"}>
                                        Lien carte
                                        <BadgeInfo size={20}/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type={"url"} {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"logo"}
                            render={({field: {ref, name, onBlur, onChange}}) => (
                                <FormItem>
                                    <FormLabel>Logo de {"l'entreprise"}</FormLabel>
                                    <FormControl>
                                        <Input type={"file"} name={name} ref={ref} accept={"image/png, image/jpeg"}
                                               onBlur={onBlur} onChange={(e) => {
                                            onChange(e.target.files?.[0]);
                                        }}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"medias"}
                            render={({field: {ref, name, onBlur, onChange}}) => (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <Input type={"file"} name={name} ref={ref} multiple={true}
                                               accept={"image/png, image/jpeg"}
                                               onBlur={onBlur} onChange={(e) => {
                                            onChange(e.target.files?.[e.target.files.length ?? 0]);
                                            if(e.target.files) {
                                                form.setValue("medias", e.target.files)
                                            }
                                            console.log(e.target.files)
                                        }}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className={"w-full md:w-1/2"}>
                        <div className={"flex gap-2 items-center"}>
                            <h3 className={"text-xl font-semibold"}>Offres</h3>
                            <PlusCircle className={"cursor-pointer"} onClick={() => {
                                form.setValue("offers", [...form.getValues("offers"), ""])
                                form.clearErrors()
                            }}/>

                        </div>

                        <div className={"mt-4 space-y-4 "}>
                            <p>Saisissez une ou plusieurs offres</p>
                            {form.getValues("offers").map((offer: string, index: number) => (
                                <FormField
                                    control={form.control}
                                    name={`offers.${index}`}
                                    render={({field}) => (
                                        <FormItem className={"w-full"}>
                                            <FormLabel> </FormLabel>
                                            <div className={"flex items-center gap-1"}>
                                                <FormControl>
                                                    <Input type={"text"} {...field} maxLength={25}
                                                           placeholder={"Offre"}/>
                                                </FormControl>
                                                {form.getValues("offers").length > 1 && (
                                                    <Trash2 className={"text-destructive cursor-pointer"}
                                                            onClick={() => {
                                                                const currentOffers = form.getValues('offers');
                                                                if (currentOffers.length > 1) {
                                                                    const newOffers = currentOffers.filter((_, i) => i !== index);
                                                                    form.setValue('offers', newOffers);
                                                                    form.clearErrors()
                                                                }
                                                            }}/>
                                                )}

                                            </div>
                                        </FormItem>

                                    )}
                                    key={index}
                                />
                            ))}
                        </div>


                    </div>
                </div>

                <Button type={"submit"} className={"mt-8"} isLoading={isSubmitting}>Créer</Button>
            </form>

        </Form>
    )
}