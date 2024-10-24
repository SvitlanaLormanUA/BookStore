const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

// MongoDB configuration
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://mern-book-store:OaxbaeRd0rEIcsw7@cluster0.odv0v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Create a collection of documents
    const bookCollections = client.db('BookInventory').collection('books');

    // Insert a book into the collection: POST method
    app.post('/upload-book', async (req, res) => {
      try {
        const data = req.body;
        const result = await bookCollections.insertOne(data);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to upload the book', error });
      }
    });
    

    // Get all books from the database
    app.get('/books', async (req, res) => {
      try {
        const books = bookCollections.find({});
        const result = await books.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch books', error });
      }
    });

    // Update book data
    app.patch('/book/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const updateBook = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };

        const updateDoc = {
          $set: {
            ...updateBook,
          },
        };
        const result = await bookCollections.updateOne(filter, updateDoc, options);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to update the book', error });
      }
    });

    // Delete a book
    app.delete('/book/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await bookCollections.deleteOne(filter);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to delete the book', error });
      }
    });

    //filter by cathegory
app.get("/books", async (req, res) => {
    let query = {};

   
    if (req.query?.genre) {
        query.genre = req.query.genre;
    }
    if (req.query?.new) {
        query.new = req.query.new === 'true'; 
    }
    if (req.query?.author) {
        query.author = req.query.author;
    }
    if (req.query?.onSale) {
        query.onSale = req.query.onSale === 'true'; 
    }
    if (req.query?.popular) {
        query.popular = req.query.popular === 'true';  
    }

    // Fetch and return the filtered results
    const result = await bookCollections.find(query).toArray();
    res.send(result);
});


    // Ping MongoDB to confirm successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when finished/error occurs
    // await client.close();
  }
}
run().catch(console.dir);

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
