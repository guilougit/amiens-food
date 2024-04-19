"use client"

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './thumbnail-slider.css'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import {useState} from "react";
import Image from "next/image";

export const ThumbnailSlider = ({images}:{images: []}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    []

    return (
        <div className={"max-w-[260px] md:max-w-[500px]"}>
            <Swiper
                style={{
                    // @ts-ignore
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={"swiper-no-nav-mobile"}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={"swiper-slideThumbnail"}>
                        <Image src={image} width={800} height={600} alt={`Amiens food partenaire`} className={"h-[200px] md:h-auto max-h-[420px]"} />
                    </SwiperSlide>
                ))}
                
            </Swiper>
            <Swiper
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiperThumbnail mt-2"
                onSwiper={setThumbsSwiper}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={"swiper-slideThumbnail "}>
                        <Image src={image} width={400} height={300} alt={`Amiens food partenaire`} className={"h-full"}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}