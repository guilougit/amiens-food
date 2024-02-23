"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import { Grid, Pagination } from 'swiper/modules';
import Link from "next/link";

interface images {
    path: string,
    caption: string,
    link: string,
    type: "IMAGE" | "VIDEO"
}

import './grid-slider.css'

export const GridSlider = ({images}: {images: images[]}) => {
    return (
        <Swiper
            slidesPerView={3}
            grid={{
                rows: 2,
                fill: 'row'
            }}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Grid, Pagination]}
            className="swiperGrid"
        >
            {images.map((image, index: any) => (
                <SwiperSlide key={index} className={"swiper-slideGrid"}>
                    
                        {image.type === "IMAGE" && (
                            <Link href={image.link}
                            >
                                <img
                                    className="object-cover aspect-square transform hover:scale-105 transition duration-700 ease-out"
                                    src={image.path} alt={image.caption}/>
                            </Link>

                        )}
                    {image.type === "VIDEO" && (
                        <video width="640" height="480" controls>
                            <source src={image.path} type="video/mp4"/>
                        </video>
                    )}

                </SwiperSlide>
            ))}
        </Swiper>
    )
}