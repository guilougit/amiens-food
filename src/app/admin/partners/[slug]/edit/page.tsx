import {notFound} from "next/navigation";
import {CreatePartnerForm} from "@/src/components/v2/forms/create-partner-form";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

const EditPartner = async ({params}: { params: { slug: string } }) => {
    /*
    const partnerFetch = await fetch(`${process.env.APP_URL}/api/partners/${params.slug}`).then(res => res.json())

    if(!partnerFetch.success || !partnerFetch.partner) return notFound()
    
     */

    const partnerFetch: any = undefined
    const mediaPaths: any = undefined

    return (
        <div className={"px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto"}>
            <Link href={"/admin/partners"} className={"flex gap-1 items-center"}>
                <ArrowLeft />
                Retour
            </Link>
            <h1 className={"text-3xl font-bold md:text-4xl mt-6"}>Éditer {partnerFetch.partner.name}</h1>

            <div className={"mt-8"}>
                <CreatePartnerForm defaultPartner={partnerFetch.partner} isEditing={true} />
            </div>
        </div>
    )
}

export default EditPartner