import {CreatePartnerForm} from "@/src/components/v2/forms/create-partner-form";

const CreatePartner = () => {
    return (
        <div className={"px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto"}>
            
            <h1 className={"text-3xl font-bold md:text-4xl"}>Nouveau partenaire </h1>
            
            <div className={"mt-8"}>
                <CreatePartnerForm />
            </div>
        </div>
    )
}

export default CreatePartner