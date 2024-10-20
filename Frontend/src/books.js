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
        popular: false,
        soldCopies: 2000000,
        copiesInStock: 500,
        price: 12.99,
        isForSale: true,
        sale: 10,
        new: false,
        publisher: 'Delacorte Press'
    },
    {
        id: uuidv4(),
        title: 'The Night Circus',
        author: 'Erin Morgenstern',
        year: 2011,
        genre: 'Fantasy',
        description: 'A magical competition between two illusionists that transforms into a deep connection within a mysterious circus.',
        img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387124618i/9361589.jpg',
        popular: true,
        soldCopies: 1000000,
        copiesInStock: 200,
        price: 9.99,
        isForSale: true,
        sale: 15,
        new: false,
        publisher: 'Doubleday'
    },
    {
        id: uuidv4(),
        title: 'The Midnight Library',
        author: 'Matt Haig',
        year: 2020,
        genre: 'Fantasy',
        description: 'A woman finds herself in a library between life and death where she explores the lives she could have lived.',
        img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602190253l/52578297.jpg',
        popular: false,
        soldCopies: 1500000,
        copiesInStock: 350,
        price: 14.99,
        isForSale: false,
        sale: 0,
        new: true,
        publisher: 'Viking'
    },
    {
        id: uuidv4(),
        title: 'Normal People',
        author: 'Sally Rooney',
        year: 2018,
        genre: 'Romance',
        description: 'A complicated relationship between two young adults as they navigate love, friendship, and societal expectations.',
        img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/f/i/file_164_2.png',
        popular: true,
        soldCopies: 1200000,
        copiesInStock: 400,
        price: 11.99,
        isForSale: false,
        sale: 0,
        new: false,
        publisher: 'Faber & Faber'
    },
    {
        id: uuidv4(),
        title: 'The Vanishing Half',
        author: 'Brit Bennett',
        year: 2020,
        genre: 'Historical Fiction',
        description: 'The story of twin sisters who grow up together in a small, Black community but take very different paths in life.',
        img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1577090827l/51791252.jpg',
        popular: false,
        soldCopies: 900000,
        copiesInStock: 300,
        price: 13.99,
        isForSale: false,
        sale: 0,
        new: true,
        publisher: 'Riverhead Books'
    },
    {
        id: uuidv4(),
        title: 'Educated',
        author: 'Tara Westover',
        year: 2018,
        genre: 'Memoir',
        description: 'A memoir of a woman who grows up in a strict and abusive household in rural Idaho but eventually escapes to learn about the world through education.',
        img: 'https://www.usatoday.com/gcdn/-mm-/4453ec9ae81a9fad845c3f03a178477f1bd0f741/c=0-162-1838-2613/local/-/media/2018/02/13/USATODAY/USATODAY/636541388748249933-EDUCATED-Cover.jpg?width=660&height=881&fit=crop&format=pjpg&auto=webp',
        popular: false,
        soldCopies: 1800000,
        copiesInStock: 100,
        price: 16.99,
        isForSale: true,
        sale: 25,
        new: false,
        publisher: 'Random House'
    },
    {
        id: uuidv4(),
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        year: 2019,
        genre: 'Psychological Thriller',
        description: 'A psychotherapist becomes obsessed with uncovering the truth behind a woman’s mysterious silence after she murders her husband.',
        img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/8/1/81_vle6hyol.jpg',
        popular: false,
        soldCopies: 800000,
        copiesInStock: 250,
        price: 10.99,
        isForSale: true,
        sale: 10,
        new: false,
        publisher: 'Celadon Books'
    },
    {
        id: uuidv4(),
        title: 'Circe',
        author: 'Madeline Miller',
        year: 2018,
        genre: 'Fantasy',
        description: 'A retelling of the myth of Circe, the enchantress from Greek mythology, as she carves out a place for herself in a world of gods and mortals.',
        img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565909496i/35959740.jpg',
        popular: true,
        soldCopies: 1300000,
        copiesInStock: 150,
        price: 12.49,
        isForSale: true,
        sale: 5,
        new: false,
        publisher: 'Little, Brown and Company'
    },
    {
        id: uuidv4(),
        title: 'The Seven Husbands of Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        year: 2017,
        genre: 'Historical Fiction',
        description: 'A reclusive Hollywood icon recounts her tumultuous life and seven marriages in a compelling, fictional memoir.',
        img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/7/1/71pievu3eel.jpg',
        popular: false,
        soldCopies: 1400000,
        copiesInStock: 120,
        price: 15.99,
        isForSale: false,
        sale: 0,
        new: true,
        publisher: 'Atria Books'
    },
    {
        id: uuidv4(),
        title: 'A Man Called Ove',
        author: 'Fredrik Backman',
        year: 2012,
        genre: 'Fiction',
        description: 'A grumpy but loveable man finds his world turned upside down when a lively young family moves in next door.',
        img: 'https://static.yakaboo.ua/media/catalog/product/9/1/916fuxlx90l.jpg',
        popular: false,
        soldCopies: 1100000,
        copiesInStock: 180,
        price: 9.99,
        isForSale: true,
        sale: 20,
        new: false,
         publisher: 'Little, Brown and Company'
    },

    {
        id: uuidv4(),
        title: 'Dune',
        author: 'Frank Herbert',
        year: 1965,
        genre: 'Science Fiction',
        description: 'Set on the desert planet Arrakis, this epic tale follows the journey of Paul Atreides as he navigates politics, religion, and the fight for control of the universe’s most valuable resource.',
        img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg',
        popular: false,
        soldCopies: 20000000,
        copiesInStock: 300,
        price: 19.99,
        isForSale: true,
        sale: 0,
        new: false,
         publisher: 'Little, Brown and Company'
    },
    {
        id: uuidv4(),
        title: 'Dune',
        author: 'Frank Herbert',
        year: 1965,
        genre: 'Science Fiction',
        description: 'Set on the desert planet Arrakis, this epic tale follows the journey of Paul Atreides as he navigates politics, religion, and the fight for control of the universe’s most valuable resource.',
        img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img243_1_21.jpg',
        popular: false,
        soldCopies: 20000000,
        copiesInStock: 300,
        price: 19.99,
        isForSale: true,
        sale: 0,
        new: false,
        publisher: 'Random House'
    },
    {
        id: uuidv4(),
        title: 'The Song of Achilles',
        author: 'Madeline Miller',
        year: 2011,
        genre: 'Fantasy',
        description: 'A retelling of the myth of Achilles and Patroclus, exploring their friendship, love, and the events leading up to the Trojan War.',
        img: 'https://m.media-amazon.com/images/I/81msb6gUBTL._AC_UF1000,1000_QL80_.jpg',
        popular: true,
        soldCopies: 500000,
        copiesInStock: 450,
        price: 14.99,
        isForSale: false,
        sale: 0,
        new: true,
         publisher: 'Random House'
    },
   
    {
        id: uuidv4(),
        title: 'Becoming',
        author: 'Michelle Obama',
        year: 2018,
        genre: 'Memoir',
        description: 'In this deeply personal memoir, Michelle Obama reflects on the experiences that shaped her life, from her childhood in Chicago to her years as First Lady of the United States.',
        img:'https://m.media-amazon.com/images/I/81+QX4VMrmS._AC_UF894,1000_QL80_.jpg',
        popular: false,
        soldCopies: 10000000,
        copiesInStock: 200,
        price: 18.99,
        isForSale: false,
        sale: 0,
        new: true,
         publisher: 'Random House'
    },
      {
        id: uuidv4(),
        title: 'Becoming',
        author: 'Michelle Obama',
        year: 2018,
        genre: 'Memoir',
        description: 'In this deeply personal memoir, Michelle Obama reflects on the experiences that shaped her life, from her childhood in Chicago to her years as First Lady of the United States.',
        img:'https://m.media-amazon.com/images/I/81+QX4VMrmS._AC_UF894,1000_QL80_.jpg',
        popular: false,
        soldCopies: 10000000,
        copiesInStock: 200,
        price: 18.99,
        isForSale: false,
        sale: 0,
        new: true,
         publisher: 'Random House'
    },
    {
        id: uuidv4(),
        title: 'The Invisible Life of Addie LaRue',
        author: 'V.E. Schwab',
        year: 2020,
        genre: 'Fantasy',
        description: 'A woman makes a pact to live forever, but is cursed to be forgotten by everyone she meets until one day, someone remembers her.',
        img: "https://d3ddkgxe55ca6c.cloudfront.net/assets/t1669384890/a/c2/67/219279-ml-2162359.jpg",
        popular: true,
        soldCopies: 1500000,
        copiesInStock: 450,
        price: 17.99,
        isForSale: true,
        sale: 10,
        new: false,
        publisher: 'Tor Books'
    },
    {
        id: uuidv4(),
        title: 'The Priory of the Orange Tree',
        author: 'Samantha Shannon',
        year: 2019,
        genre: 'Fantasy',
        description: 'A high fantasy epic featuring dragons, magic, and a world on the brink of destruction.',
        img:'https://www.bookerycincy.com/cdn/shop/products/9_58c52905-e97f-4b36-8d7a-cf6749849114_700x.jpg?v=1661132293',
        popular: false,
        soldCopies: 700000,
        copiesInStock: 320,
        price: 24.99,
        isForSale: true,
        sale: 20,
        new: false,
        publisher: 'Bloomsbury Publishing'
    },
    {
        id: uuidv4(),
        title: 'The House in the Cerulean Sea',
        author: 'TJ Klune',
        year: 2020,
        genre: 'Fantasy',
        description: 'A heartwarming story about a government worker who is sent to oversee a group of magical children and discovers the power of love and acceptance.',
        img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569514209i/45047384.jpg',
        popular: true,
        soldCopies: 1200000,
        copiesInStock: 400,
        price: 16.99,
        isForSale: true,
        sale: 5,
        new: false,
         publisher: 'Bloomsbury Publishing'
    },
    {
        id: uuidv4(),
        title: 'The Seven Deaths of Evelyn Hardcastle',
        author: 'Stuart Turton',
        year: 2018,
        genre: 'Mystery',
        description: 'A man must solve the murder of Evelyn Hardcastle, but every time he dies, he wakes up in the body of a different guest at the event.',
      img:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506896221i/36337550.jpg',
        popular: false,
        soldCopies: 800000,
        copiesInStock: 250,
        price: 14.49,
        isForSale: true,
        sale: 15,
        new: false,
         publisher: 'Bloomsbury Publishing'
    },
    {
        id: uuidv4(),
        title: 'Red, White & Royal Blue',
        author: 'Casey McQuiston',
        year: 2019,
        genre: 'Romance',
        description: 'A romantic comedy about the son of the U.S. president and the Prince of Wales who go from rivals to lovers.',
        img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/7/1/710bsrzv7kl.jpg',
        popular: true,
        soldCopies: 2000000,
        copiesInStock: 500,
        price: 13.99,
        isForSale: true,
        sale: 10,
        new: false,
         publisher: 'Bloomsbury Publishing'
    },
    {
        id: uuidv4(),
        title: 'Red, White & Royal Blue',
        author: 'Casey McQuiston',
        year: 2019,
        genre: 'Romance',
        description: 'A romantic comedy about the son of the U.S. president and the Prince of Wales who go from rivals to lovers.',
        img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/7/1/710bsrzv7kl.jpg',
        popular: true,
        soldCopies: 2000000,
        copiesInStock: 500,
        price: 13.99,
        isForSale: true,
        sale: 10,
        new: false,
         publisher: 'Bloomsbury Publishing'
    },
    {
        id: uuidv4(),
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        genre: 'Romance',
        description: 'The classic story of Elizabeth Bennet and her romantic tension with the wealthy and aloof Mr. Darcy.',
        img: 'https://static.yakaboo.ua/media/catalog/product/9/7/9781847493699_0.jpg',
        popular: false,
        soldCopies: 20000000,
        copiesInStock: 800,
        price: 9.99,
        isForSale: false,
        sale: 0,
        new: false,
        publisher: 'Tor Books'
    },
    {
        id: uuidv4(),
        title: 'Moby-Dick',
        author: 'Herman Melville',
        year: 1851,
        genre: 'Adventure',
        description: 'A sailor Ishmael narrates the obsessive quest of Captain Ahab for revenge against Moby Dick, a giant white whale.',
        img: 'https://images.booksense.com/images/007/839/9781954839007.jpg',
        popular: false,
        soldCopies: 15000000,
        copiesInStock: 600,
        price: 12.99,
        isForSale: false,
        sale: 0,
        new: false,
          publisher: 'Tor Books'
    },
    {
        id: uuidv4(),
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        genre: 'Tragedy',
        description: 'The story of the mysteriously wealthy Jay Gatsby and his obsession with the beautiful Daisy Buchanan.',
        img: 'https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg',
        popular: false,
        soldCopies: 25000000,
        copiesInStock: 700,
        price: 10.99,
        isForSale: true,
        sale: 0,
        new: false,
          publisher: 'Tor Books'
    },
    {
        id: uuidv4(),
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        genre: 'Dystopian',
        description: 'A chilling depiction of a totalitarian state, surveillance, and propaganda in a dystopian future.',
        img: 'https://m.media-amazon.com/images/I/612ADI+BVlL._AC_UF1000,1000_QL80_.jpg',
        popular: false,
        soldCopies: 30000000,
        copiesInStock: 500,
        price: 11.99,
        isForSale: false,
        sale: 0,
        new: false,
          publisher: 'Tor Books'
    },
   
    {
        id: uuidv4(),
        title: 'Frankenstein',
        author: 'Mary Shelley',
        year: 1818,
        genre: 'Horror',
        description: 'The story of a scientist who creates a living being, only to be horrified by the monster he has brought to life.',
        img: 'https://cdn2.penguin.com.au/covers/400/9780241321645.jpg',
        popular: true,
        soldCopies: 18000000,
        copiesInStock: 550,
        price: 8.99,
        isForSale: false,
        sale: 0,
        new: false,
        publisher: 'Bloomsbury Publishing'
    },
    {
        id: uuidv4(),
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        year: 1847,
        genre: 'Romance',
        description: 'The story of an orphan girl who grows up to become a governess and falls in love with her employer, Mr. Rochester.',
        img: 'https://images.squarespace-cdn.com/content/v1/5b19552831d4df0c23869b60/1534516312827-LJIUOECDIVGOIV7SJCZ6/JaneEyre.jpg',
        popular: false,
        soldCopies: 22000000,
        copiesInStock: 650,
        price: 10.49,
        isForSale: true,
        sale: 5,
        new: false,
         publisher: 'Bloomsbury Publishing'
    },
    {
        id: uuidv4(),
        title: 'The Odyssey',
        author: 'Homer',
        year: -800,
        genre: 'Epic Poetry',
        description: 'The story of Odysseus’ long journey home after the Trojan War, facing mythical creatures and divine intervention.',
        img: 'https://m.media-amazon.com/images/I/71FC1AcWTKL._AC_UF894,1000_QL80_.jpg',
        popular: false,
        soldCopies: 12000000,
        copiesInStock: 450,
        price: 13.49,
        isForSale: true,
        sale: 10,
        new: false,
         publisher: 'Bloomsbury Publishing'
    },
    {
        id: uuidv4(),
        title: 'The Picture of Dorian Gray',
        author: 'Oscar Wilde',
        year: 1890,
        genre: 'Philosophical Fiction',
        description: 'A young man remains eternally youthful while a portrait of him ages and shows the consequences of his moral corruption.',
        img: 'https://m.media-amazon.com/images/I/71fm0Ap7JcL._AC_UF894,1000_QL80_.jpg',
        popular: true,
        soldCopies: 15000000,
        copiesInStock: 500,
        price: 14.99,
        isForSale: true,
        sale: 15,
        new: false,
        publisher: 'Tor Books'
    },
    {
        id: uuidv4(),
        title: 'Dracula',
        author: 'Bram Stoker',
        year: 1897,
        genre: 'Gothic Horror',
        description: 'The story of Count Dracula’s attempt to move from Transylvania to England so he may find new blood and spread the undead curse.',
        img: 'https://m.media-amazon.com/images/I/71yhG9std-L._AC_UF1000,1000_QL80_.jpg',
        popular: false,
        soldCopies: 25000000,
        copiesInStock: 600,
        price: 12.99,
        isForSale: true,
        sale: 10,
        new: false,
         publisher: 'Bloomsbury Publishing'
    }
];

export default books;
