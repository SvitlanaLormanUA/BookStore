import { createContext } from 'react';
import { Book } from '../type/Book';

export const BooksContext = createContext<Book[]>([]);
