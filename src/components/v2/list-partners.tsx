"use client"

import React, {useEffect, useState} from "react";
import {PartnerCard} from "@/src/components/v2/partner-card";

const partners = [
    {
        title: "Les Offres",
        offers: ["Mc fleury offert pour tout achat d'un menu best of", 'Offre petit déjeuner à -50%'],
        image: '/img/mcdo.png'
    },
    {title: "Les Offres", offers: ['Le menu King Deal à 4€', '-2€ sur le menu Double Whooper'], image: '/img/bk.png'},
    {
        title: "Les Offres",
        offers: ['Offre du Mardi (bucket de tenders à 7.95) disponible tous les jours'],
        image: '/img/kfc.png'
    },
    {
        title: "Les Offres",
        offers: ['Offre du Mardi (bucket de tenders à 7.95) disponible tous les jours'],
        image: '/img/kfc.png'
    },
    {
        title: "Les Offres",
        offers: ['Offre du Mardi (bucket de tenders à 7.95) disponible tous les jours'],
        image: '/img/kfc.png'
    },
    {
        title: "Les Offres",
        offers: ['Offre du Mardi (bucket de tenders à 7.95) disponible tous les jours'],
        image: '/img/kfc.png'
    },
];

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import Link from "next/link";

export const ListPartnersLandingPage = () => {
    
    const [partners, setPartners] = useState([])

    useEffect(() => {
        fetch("/api/partners")
            .then(res => res.json())
            .then(res => {
                setPartners(res.partners)
            })
    }, []);
    
    return (
        <section className="" data-aos-id-4>
            <div className="relative max-w-7xl mx-auto">
                {/* Bg */}
                <div
                    className="absolute inset-0 rounded-tl-[100px] mb-24 md:mb-0 bg-gradient-to-b from-orange-50 pointer-events-none -z-10"
                    aria-hidden="true"
                />

                <div className="mx-8 px-4 sm:px-6" data-aos="fade-up" data-aos-anchor="[data-aos-id-4]">
                    <div className="py-12 md:pb-20">
                        {/* Content */}
                        <div className="w-full shrink-0">
                            <h2 className="h2 mb-4 text-[#FA8419] ml-4">
                                Nos partenaires
                            </h2>

                            {/* Lists */}
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="swipper-padding"
                                breakpoints={{
                                    576: {
                                        slidesPerView: 2
                                    },
                                    768: {
                                        slidesPerView: 2
                                    },
                                    1024: {
                                        slidesPerView: 3
                                    },
                                    1280: {
                                        slidesPerView: 4
                                    }

                                }}
                            >
                                {partners.map((partner, index: number) => (
                                    <SwiperSlide key={index} className={"h-auto"}>
                                        {<PartnerCard item={partner}/>}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            {/* Button */}
                            <div className="max-w-xs mx-auto sm:max-w-none mt-8 ml-2 bg-white">
                                <div>
                                    <Link
                                        className="btn-sm inline-flex items-center text-white bg-[#FA8419] group shadow-2xl text-xl"
                                        href="/partenaires">
                                        Tous nos partenaires
                                        <span
                                            className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                                                <svg className="fill-white" width="12" height="10"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                  <path
                                                      d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z"/>
                                                </svg>
                                              </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}