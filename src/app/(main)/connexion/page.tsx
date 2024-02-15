import {SigninForm} from "@/src/components/v2/forms/signin-form";
import Image from "next/image";
import LoginImage from "@/public/img/mockup_carte.png";

export default function LoginPage() {
    return (
        <main className="flex pt-20 min-h-screen bg-white" >
            {/* Content */}
            <div className="w-full h-full lg:w-1/2 mt-12 lg:mt-28">
                <div className="mx-4 lg:w-3/4 lg:mx-auto">
                    <div data-aos="fade-up">
                        <SigninForm />
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="hidden lg:block lg:w-1/2 relative rounded-2xl z-10" aria-hidden="true">
                {/* Bg */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white pointer-events-none -z-10 rounded-3xl"
                     aria-hidden="true">
                    <Image src={LoginImage} width="800" height="545" alt="Carte amiens food" data-aos="fade-up" className={"mt-12 block mx-auto w-[75%] max-w-[800px]"}/>
                </div>

            </div>
        </main>
    )
}