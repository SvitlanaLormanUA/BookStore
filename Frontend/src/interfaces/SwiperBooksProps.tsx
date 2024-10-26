import { Book } from "./Book";
export interface SwiperBooksProps {
    books: Book[];
    auto: boolean;
    title: string;
    placeDiscountIcon?: boolean | false;
    forLink: string;
  }
  