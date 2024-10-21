import React from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SeeMoreButton from './SeeMoreButton';
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import { Book } from "../type/Book";
import { SwiperBooksProps } from "../interfaces/SwiperBooksProps";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation'; 
import 'swiper/css/free-mode';
import 'swiper/css/autoplay'; 
import '../styles/mediaQueries.css';
import '../styles/App.css';
import BookItem from "./BookItem";



export default function SwiperBooks({ books, auto, title, placeDiscountIcon, forLink }: SwiperBooksProps) {


  return (
    <>
      <div className="swiper-component">
        <h2 className="swiper-title">{title}</h2>
        <div className="seeMoreBooks-container">
              <SeeMoreButton forLink={forLink}/> 
        </div>

        <section className="book-list">
          <Swiper
            spaceBetween={0}
            loop={true}
            grabCursor={false}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 200,
              modifier: 1.5,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
            }}
            freeMode={true}
            autoplay={auto ? {
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            } : false}
            navigation={!auto}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
                slideToClickedSlide: true,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 0,
                slideToClickedSlide: true,
                pagination: false,
              },
              1000: {
                slidesPerView: 1,
                spaceBetween: 0,
                slideToClickedSlide: true,
                pagination: false,
              },
              1283: {
                slidesPerView: 3,
                centeredSlides: true,
                spaceBetween: 10,
                pagination: true,
              },
            }}
            modules={auto ? [FreeMode, Pagination, Autoplay] : [FreeMode, Pagination, Navigation]}
            className="swiper-container"
          >
            {books.map((book, index) => (
              <SwiperSlide key={index}>
                <BookItem book={book} placeDiscountIcon={placeDiscountIcon}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </>
  );
}
