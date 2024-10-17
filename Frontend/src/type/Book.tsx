export type Book = {
    id: string;
    title: string;
    author: string;
    year: number;
    genre: string;
    description: string;
    img: string;


    popular: boolean;
    soldCopies: number;
    copiesInStock: number;
    price: number;
    isForSale: boolean;
    sale: number;

}