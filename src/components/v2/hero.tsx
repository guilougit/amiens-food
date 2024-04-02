"use client";

import Image from "next/image";

import Illustration from "@/public/img/hero-illustration.svg";
import HeroImage from "@/public/img/mockup_v1.png";

import Tilt from "react-parallax-tilt";
import { CheckoutButton } from "@/src/components/checkout-button";
import { TextCustom } from "@/src/utils/types";

export default function Hero({ texts }: { texts: TextCustom[] }) {
  return (
    <>
      <section className="relative">
        {/* Bg */}
        <div
          className="absolute inset-0 rounded-bl-[100px] mb-28 md:mb-0 bg-gradient-to-r from-[#FB943C] via-[#FBBF26] to-[#FB943C] pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-20 md:pt-40 md:pb-20">
            {/* Hero content */}
            <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left min-h-[300px] pt-6">
              {/* Content */}
              <div className="md:w-[600px]">
                {/* Copy */}
                <div
                    className="text-4xl sm:text-6xl font-bold text-slate-800 mb-6 leading-[40px] md:leading-[60px] uppercase font-rubik "
                    dangerouslySetInnerHTML={{
                      __html: texts.find((text) => text.code === "LANDING_HERO_TITLE")?.text as string
                    }}
                >
                </div>
                <div
                    className="text-lg text-slate-700 mb-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    dangerouslySetInnerHTML={{
                      __html: texts.find(
                          (text) => text.code === "LANDING_HERO_SUBTITLE"
                      )?.text as string,
                    }}
                ></div>

                {!texts.find(text => text.code === "LANDING_HERO_SUBTITLE")?.text && (
                 <p className={"md:mt-24"}></p>   
                )}

                {/* Buttons */}
                <div className={"relative"}>
                  <div
                      className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12 md:mb-0 absolute left-1/2 top-36 sm:top-0 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 z-10"
                  >
                      <CheckoutButton variant={"default"} size={"large"}/>
                  </div>
                </div>

                {/* Image */}
                <div
                    className="max-w-sm mx-auto md:max-w-none md:absolute md:left-[600px] md:top-0 -mb-12 md:-mt-12 md:mb-0" data-aos={"fade-up"}> 
                  <div className="relative -ml-3 -mr-24 md:mx-0">
                    <Image
                        className="absolute -top-10 -left-40 pointer-events-none -z-10 w-[1200px] max-w-none mix-blend-lighten"
                        src={Illustration}
                        priority
                        alt="Hero illustration"
                        aria-hidden="true"
                    />
                    <Tilt>
                      <Image
                          src={HeroImage}
                          className="md:max-w-none -mt-10 md:mt-0"
                          width="548"
                          height="545"
                          alt="Carte amiens food"
                      />
                    </Tilt>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
