import React from "react";
import { Link, Outlet } from 'react-router-dom';
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

function calculateSalePrice(price: number, sale: number) {
  return price - (price * sale) / 100;
}
function getLinkFromProp(forLink: string) {
  if (forLink.toLowerCase().includes('new')) {
    return '/books/new';
  } else if (forLink.toLowerCase().includes('popular')) {
    return '/books/popular';
  } else if (forLink.toLowerCase().includes('sale')) {
    return '/books/sale';
  }
  else {
    return '/books/all'; 
  }
}

export default function SwiperBooks({ books, auto, title, placeDiscountIcon, forLink }: SwiperBooksProps) {
  return (
    <>
      <div className="swiper-component">
        <h2 className="swiper-title">{title}</h2>
        <div className="seeMoreBooks-container">
         <Link to={getLinkFromProp(forLink)}>
            <div>
              <SeeMoreButton /> 
            </div>
          </Link>
        </div>

        <section className="book-list">
          <Swiper
            spaceBetween={10}
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
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className="swiper-container"
          >
            {books.map((book, index) => (
              <SwiperSlide key={index}>
                <div className="book-item">
                  {book.sale > 0 && placeDiscountIcon ? (
                    <div className="dicount-icon-container">
                      <span className="dicount-icon"> - {book.sale}%</span>
                    </div>
                  ) : null}
                  
                  <img src={book.img} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p className="book-item-author">{book.author}</p>

                  <div className="book-item-buy-container">
                    {book.sale > 0 ? (
                      <div className="book-item-price-container">
                        <p className="crossed" id="book-item-price">
                          {book.price} $
                        </p>
                        <p id="book-item-price-red">
                          {calculateSalePrice(book.price, book.sale).toFixed(2)} $
                        </p>
                      </div>
                    ) : (
                      <p className="ordinary" id="book-item-price">
                        {book.price} $
                      </p>
                    )}
                   
                    <div>
                      <Button id="buy-button" className="btn btn-danger w-100">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </>
  );
}
