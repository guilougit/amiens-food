import {MultipleStars} from "@/src/components/ui/multiple-stars";
import {ComCustomerExample} from "@/src/utils/types";
import Image from "next/image";


export const ExampleCustomerCard = ({data}: { data: ComCustomerExample }) => {
    return (
        <div className={'max-w-[1000px] mx-auto'}>
            <h4 className={'uppercase text-2xl text-center font-bold'}>
                De {data.from} à {data.to} 🚀
                <br/>
                <span className={'relative text-primary text-xl'}>
                    abonnés
                <span className={'absolute -right-6 -top-1.5'}>
                    <MultipleStars width={20}/>
                </span>
            </span>
            </h4>

            <div className={`w-full bg-[#F78E3D] h-[300px] rounded-[50px] mt-8 grid grid-cols-2`}>

                <Image
                    src={data.mockup}
                    alt={`${data.name} - Amiens Food communication`}
                    className={`${data.reversed ? 'order-1 mr-20' : 'ml-20'} -mt-12 mx-auto w-[200px]`}
                    width={800}
                    height={800
                }/>

                <div className={`${data.reversed ? 'ml-20' : '-ml-20'} space-y-5`}>
                    <h5 className={`text-white text-4xl font-bold mt-8`}>{data.name}</h5>
                    <p className={`text-white text-sm ${data.reversed ? '' : 'w-[80%]'} text-justify`}>{data.description}</p>
                </div>

            </div>

        </div>


    )
}
