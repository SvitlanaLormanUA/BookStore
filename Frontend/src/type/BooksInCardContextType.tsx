import { Book } from '../interfaces/Book';

export interface BooksInCardContextType {
  booksInCart: Book[];
  toggleBookInCart: (book: Book) => void;
  isBookInCart: (book: Book) => boolean;
  removeBookFromCart: (bookId: string | number) => void;
  purchaseBooks: (books: Book[], fullName: string, email: string, country: string, city: string, post: string) => void;

}
