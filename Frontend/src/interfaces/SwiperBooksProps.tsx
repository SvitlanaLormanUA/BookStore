import { Book } from "../type/Book";
export interface SwiperBooksProps {
    books: Book[];
    auto: boolean;
    title: string;
    placeDiscountIcon?: boolean | false;
  }
  