import { Book } from "./Book";

    export interface Purchase {
        _id: string | number;
        books: Book[];
        buyer: {
            fullName: string;
            email: string;
            country: string;
            city: string;
            post: string;
        };
        purchaseDate: string;
        price: number;
        sent: boolean;
    }