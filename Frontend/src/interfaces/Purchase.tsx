import { Book } from "./Book";

    export interface Purchase {
        id: string | number;
        books: Book[];
        buyerInfo: {
            fullName: string;
            email: string;
            country: string;
            city: string;
            post: string;
        };
        purchaseDate: string;
        price: number;
    }