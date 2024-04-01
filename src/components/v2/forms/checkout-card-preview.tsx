import {useFormContext} from "react-hook-form";
import Image from "next/image";

export const CheckoutCardPreview = () => {
    const { watch } = useFormContext();
    const formData = watch();
    
    
    return (
        <div className={"relative mx-auto max-w-max"}>
            <Image src={"/img/card_template_blurred.jpg"} alt={"Carte amiens food"} width={500} height={300}
                   className={"rounded-xl"}/>

            {/* DATA PREVIEW ON CARD */}
            {formData.picture && <Image src={URL.createObjectURL(formData.picture)} className={"absolute top-2.5 left-2.5 md:top-3.5 md:left-3.5 w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover rounded-full "} alt="Photo d'identité" width={200} height={300}/>}
            <span className={"absolute top-[48.8%] sm:top-[49.5%] left-[32%] text-xs"}>{formData.firstname}</span>
            <span className={"absolute top-[62.4%] sm:top-[62.8%] left-[28%] text-xs"}>{formData.lastname}</span>
            <span className={"absolute top-[76.2%] sm:top-[77%] left-[32%] text-xs"}>{formData.surname}</span>
        </div>
    )
}