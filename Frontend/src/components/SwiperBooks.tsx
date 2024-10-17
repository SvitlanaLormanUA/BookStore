import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation'; 
import 'swiper/css/free-mode';
import 'swiper/css/autoplay'; 

import '../styles/mediaQueries.css';

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules"; // Import navigation module

interface Book {
  img: string;
  title: string;
  author: string;
}

interface SwiperBooksProps {
  books: Book[];
  auto: boolean;
  title: string;
}

export default function SwiperBooks({ books, auto, title }: SwiperBooksProps) {
  return (
    <>
      <h2 className="swiper-title">{title}</h2>
      <section className="book-list">
        <Swiper
          spaceBetween={10}
          loop={true}
          grabCursor={true}
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
          } : false}

          // Conditionally include navigation arrows if auto is false
          navigation={!auto}

          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
              slideToClickedSlide: true,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1,
              spaceBetween: 0,
              slideToClickedSlide: true,
              pagination: false,
            },
            1014: {
              slidesPerView: 3,
              centeredSlides: true,
              spaceBetween: 10,
              pagination: true,
            },
          }}
          modules={auto ? [FreeMode, Pagination, Autoplay] : [FreeMode, Pagination, Navigation]} // Use Navigation module if not autoplay
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="swiper-container"
        >
          {books.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="book-item">
                <img
                  src={book.img}
                  alt={book.title}
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }}
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
