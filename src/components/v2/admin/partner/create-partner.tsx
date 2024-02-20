import {Button} from "@/src/components/ui/button";
import Link from "next/link";

export const CreatePartner = () => {
    return (
        <>
            
            <Button variant={"secondary"} asChild>
                <Link href={"/admin/partners/create"}>
                    Créer un partenaire

                </Link>
            </Button>
        </>
    )
}