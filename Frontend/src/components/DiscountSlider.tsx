import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation'; 
import 'swiper/css/free-mode';
import 'swiper/css/autoplay'; 

import { DiscountSliderProps } from "../interfaces/DiscountSliderProps";

export default function DiscountSlider({ message }: DiscountSliderProps) {
  return (
    <>
    <div className="discount-slider">
    <Swiper
      loop={true} 
      autoplay={{
        delay: 2500,
        disableOnInteraction: false, 
      }}
      spaceBetween={0} 
      slidesPerView={1} 
      effect="slide" 
    >
      <SwiperSlide>
        <div className="discount-slider">
          <h2>{message}</h2>
        </div>
      </SwiperSlide>
     
      <SwiperSlide>
        <div className="discount-slider">
          <h2>{message}</h2>
        </div>
      </SwiperSlide>
    </Swiper>
    </div>
    </>
  );
}
