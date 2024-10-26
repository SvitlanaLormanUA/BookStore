export interface Book  {
    calculateSalePrice?: () => number;
        _id: string | number;
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
        new: boolean;
        publisher: string;
        language: string;
        stars: number;
}

