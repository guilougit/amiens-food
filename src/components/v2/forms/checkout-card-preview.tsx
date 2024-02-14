import {useFormContext} from "react-hook-form";
import Image from "next/image";

export const CheckoutCardPreview = () => {
    const { watch } = useFormContext();
    const formData = watch();
    
    
    return (
        <div className={"relative mx-auto max-w-max"}>
            <Image src={"/img/card_template_blurred.png"} alt={"Carte amiens food"} width={500} height={300}
                   className={"rounded-xl"}/>

            {/* DATA PREVIEW ON CARD */}
            {formData.picture && <Image src={URL.createObjectURL(formData.picture)} className={"absolute top-0 left-0 w-[30px] md:w-[70px] "} alt="Photo d'identité" width={200} height={300}/>}
            <span className={"absolute top-[51%] sm:top-[52%] left-[32%] text-xs"}>{formData.firstname}</span>
            <span className={"absolute top-[64.5%] sm:top-[65.5%] left-[28%] text-xs"}>{formData.lastname}</span>
            <span className={"absolute top-[79.5%] sm:top-[80.5%] left-[29%] text-xs"}>{formData.surname}</span>
            <span className={"absolute top-[8%] sm:top-[9%] left-[92.5%]"}>00</span>
        </div>
    )
}