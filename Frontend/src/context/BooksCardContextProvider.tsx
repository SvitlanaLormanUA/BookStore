import { createContext } from "react";
import { BooksInCardContextType } from "../type/BooksInCardContextType";

const BooksCardContext = createContext<BooksInCardContextType | undefined>(undefined);

export const BooksCardContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};