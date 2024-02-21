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
    link: string
}

export const GridSlider = ({images}: {images: images[]}) => {
    return (
        <Swiper
            slidesPerView={3}
            grid={{
                rows: images.length > 3 ? 2 : 1,
            }}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Grid, Pagination]}
            className="mySwiper"
        >
            {images.map((image, index: any) => (
                <SwiperSlide key={index}>
                    <Link href={image.link}
                    >
                        <img
                            className="object-cover aspect-square transform hover:scale-105 transition duration-700 ease-out"
                            src={image.path} alt={image.caption}/>
                    </Link>

                </SwiperSlide>
            ))}
        </Swiper>
    )
}