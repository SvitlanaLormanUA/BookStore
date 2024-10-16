import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay'; 

import '../styles/mediaQueries.css';

import { FreeMode, Pagination, Autoplay } from "swiper/modules";

export default function SwiperBooks({ books }) {
  return (
    <>
    <h2>Popular Books</h2>
      <section className="book-list" >
        <Swiper
          spaceBetween={10} 
          slidesPerView={3}
          centeredSlides={true}
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
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="swiper-container"
        >
          {books.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="book-item">
                <img src={book.img} alt={book.title} style={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
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
