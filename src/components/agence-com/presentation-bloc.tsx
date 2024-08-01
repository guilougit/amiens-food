import {Button} from "@/src/components/ui/button";

import MockupPhoneEmpty from '../../../public/img/mockup-phone-empty.png'
import Image from "next/image";
import Link from "next/link";

export const PresentationBloc = () => {
    return (
        <div className={'bg-[#F8EBE0] px-8 py-5 rounded-[50px]'}>

            <div className={'flex gap-4'}>
                <div className={'w-3/4 sm:w-2/3'}>
                    <h2 className={'text-2xl font-bold'}>Amiens food</h2>

                    <p className={'text-justify text-sm mt-2 '}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                    </p>

                    <Button className={'rounded-full font-bold mt-4'} asChild>
                        <Link href={'#contact'}>
                            Je suis intéréssé
                        </Link>
                    </Button>

                </div>


                <div className={'w-1/4 sm:w-1/3 relative'}>
                    <Image src={MockupPhoneEmpty} alt={"Amiens food - Votre agence de communication"} className={'absolute min-w-[140px] w-[220px] sm:w-[180px] -bottom-12 -right-12 sm:-top-16 sm:left-1/2 sm:transform sm:-translate-x-1/2'} />
                </div>

            </div>


        </div>
    )
}
