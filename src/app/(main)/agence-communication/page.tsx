import {MultipleStars} from "@/src/components/ui/multiple-stars";
import Image from "next/image";

import CAImage from '../../../../public/img/icons/ca.png'
import {PresentationBloc} from "@/src/components/agence-com/presentation-bloc";
import {ServicesCarousel} from "@/src/components/agence-com/services-carousel";
import {ExampleCustomerCard} from "@/src/components/agence-com/example-customer-card";
import {ComCustomerExample} from "@/src/utils/types";

import MockupMamatte from '../../../../public/img/mockup-mamatte-v1.png'
import MockupWiotte from '../../../../public/img/mockup-mamatte-v1.png'
import {AgenceComContact} from "@/src/components/agence-com/contact";


const MamatteExample: ComCustomerExample = {
    from: "11.000",
    to: "21.000",
    name: "Mamatte boulangerie",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    logo: "a",
    mockup: MockupMamatte as any
}

const BoucherieWiotte: ComCustomerExample = {
    from: "3200",
    to: "6400",
    name: "Boucherie wiotte",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    logo: "a",
    mockup: MockupWiotte,
    reversed: true
}

const AgenceCommunicationPage = () => {
    return (
        <section className={'mt-28'}>

            <h1 className={'text-center text-4xl font-bold uppercase'} data-aos="fade-up">
                Amiens Food, votre agence de
                <span className={'text-primary mx-auto block relative max-w-max'}>
                    communication

                    <span className={'absolute -right-6 -top-1'}>
                        <MultipleStars width={25}/>
                    </span>
                </span>
            </h1>

            <h6 className={'text-center flex justify-center text-sm gap-2 mt-3'} data-aos="fade-up">
                <Image src={CAImage} alt={"Booste ton chiffre d'affaire avec Amiens Food"} className={'w-[20px]'}/>
                [SOUS-TITRE ACCROCHEUR]
            </h6>

            {/* FIRST SECTION : PRESENTATION */}
            <section className={'flex justify-center mt-14 w-[90%] sm:w-3/4 max-w-[800px] mx-auto'} data-aos="fade-up">
                <PresentationBloc/>
            </section>

            {/* SECOND SECTION : SERVICES */}
            <section className={'w-full bg-[#F8EBE0] rounded-t-[80px] sm:rounded-t-[120px] mt-28'}>
                <div data-aos="fade-up">
                    <h3 className={'text-center text-3xl max-w-max mx-auto font-bold uppercase py-8 relative'} >
                        Community manager spécialisé <span className={'text-primary'}>FOOD</span>
                        <span className={'absolute -right-7 top-6'}>
                        <MultipleStars width={25}/>
                    </span>
                    </h3>


                    <div className={'pb-20'}>
                        <ServicesCarousel/>
                    </div>
                </div>


                <div className={'space-y-80 sm:space-y-32  mx-2 sm:mx-20'}>
                    <div data-aos="fade-right">
                        <ExampleCustomerCard data={MamatteExample}/>
                    </div>
                    <div data-aos="fade-left">
                        <ExampleCustomerCard data={BoucherieWiotte}/>
                    </div>
                </div>

                <AgenceComContact/>

            </section>


        </section>
    )
}

export default AgenceCommunicationPage
