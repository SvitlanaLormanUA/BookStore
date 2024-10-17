import { v4 as uuidv4 } from 'uuid';

const books = [
    {
        id: uuidv4(),
        title: 'Where the Crawdads Sing',
        author: 'Delia Owens',
        year: 2018,
        genre: 'Mystery',
        description: 'A young woman raised in the marshes of North Carolina becomes the prime suspect in a murder case.',
        img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36809135.jpg',
        soldCopies: 2000000,
        copiesInStock: 500,
        price: 12.99,
        isForSale: true,
        sale: 10 // 10% off
    },
    {
        id: uuidv4(),
        title: 'The Night Circus',
        author: 'Erin Morgenstern',
        year: 2011,
        genre: 'Fantasy',
        description: 'A magical competition between two illusionists that transforms into a deep connection within a mysterious circus.',
        img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387124618i/9361589.jpg',
        soldCopies: 1000000,
        copiesInStock: 200,
        price: 9.99,
        isForSale: true,
        sale: 15 // 15% off
    },
    {
        id: uuidv4(),
        title: 'The Midnight Library',
        author: 'Matt Haig',
        year: 2020,
        genre: 'Fantasy',
        description: 'A woman finds herself in a library between life and death where she explores the lives she could have lived.',
        img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602190253l/52578297.jpg',
        soldCopies: 1500000,
        copiesInStock: 350,
        price: 14.99,
        isForSale: true,
        sale: 5
    },
    {
        id: uuidv4(),
        title: 'Normal People',
        author: 'Sally Rooney',
        year: 2018,
        genre: 'Romance',
        description: 'A complicated relationship between two young adults as they navigate love, friendship, and societal expectations.',
        img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/f/i/file_164_2.png',
        soldCopies: 1200000,
        copiesInStock: 400,
        price: 11.99,
        isForSale: true,
        sale: 20 // 20% off
    },
    {
        id: uuidv4(),
        title: 'The Vanishing Half',
        author: 'Brit Bennett',
        year: 2020,
        genre: 'Historical Fiction',
        description: 'The story of twin sisters who grow up together in a small, Black community but take very different paths in life.',
        img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1577090827l/51791252.jpg',
        soldCopies: 900000,
        copiesInStock: 300,
        price: 13.99,
        isForSale: true,
        sale: 10
    },
    {
        id: uuidv4(),
        title: 'Educated',
        author: 'Tara Westover',
        year: 2018,
        genre: 'Memoir',
        description: 'A memoir of a woman who grows up in a strict and abusive household in rural Idaho but eventually escapes to learn about the world through education.',
        img: 'https://www.usatoday.com/gcdn/-mm-/4453ec9ae81a9fad845c3f03a178477f1bd0f741/c=0-162-1838-2613/local/-/media/2018/02/13/USATODAY/USATODAY/636541388748249933-EDUCATED-Cover.jpg?width=660&height=881&fit=crop&format=pjpg&auto=webp',
        soldCopies: 1800000,
        copiesInStock: 100,
        price: 16.99,
        isForSale: true,
        sale: 25 // 25% off
    },
    {
        id: uuidv4(),
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        year: 2019,
        genre: 'Psychological Thriller',
        description: 'A psychotherapist becomes obsessed with uncovering the truth behind a woman’s mysterious silence after she murders her husband.',
        img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/8/1/81_vle6hyol.jpg',
        soldCopies: 800000,
        copiesInStock: 250,
        price: 10.99,
        isForSale: true,
        sale: 10
    },
    {
        id: uuidv4(),
        title: 'Circe',
        author: 'Madeline Miller',
        year: 2018,
        genre: 'Fantasy',
        description: 'A retelling of the myth of Circe, the enchantress from Greek mythology, as she carves out a place for herself in a world of gods and mortals.',
        img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565909496i/35959740.jpg',
        soldCopies: 1300000,
        copiesInStock: 150,
        price: 12.49,
        isForSale: true,
        sale: 5
    },
    {
        id: uuidv4(),
        title: 'The Seven Husbands of Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        year: 2017,
        genre: 'Historical Fiction',
        description: 'A reclusive Hollywood icon recounts her tumultuous life and seven marriages in a compelling, fictional memoir.',
        img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/7/1/71pievu3eel.jpg',
        soldCopies: 1400000,
        copiesInStock: 120,
        price: 15.99,
        isForSale: true,
        sale: 15
    },
    {
        id: uuidv4(),
        title: 'A Man Called Ove',
        author: 'Fredrik Backman',
        year: 2012,
        genre: 'Fiction',
        description: 'A grumpy but loveable man finds his world turned upside down when a lively young family moves in next door.',
        img: 'https://static.yakaboo.ua/media/catalog/product/9/1/916fuxlx90l.jpg',
        soldCopies: 1100000,
        copiesInStock: 180,
        price: 9.99,
        isForSale: true,
        sale: 20
    }
];

export default books;
