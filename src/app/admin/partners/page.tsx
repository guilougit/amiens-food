import {PartnersDatatable} from "@/src/components/v2/admin/partner/partners-datatable";
import {CreatePartner} from "@/src/components/v2/admin/partner/create-partner";

export default function AdminPartnersPage () {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            <CreatePartner />
           <PartnersDatatable />
        </div>
    )
}