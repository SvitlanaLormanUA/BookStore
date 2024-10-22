const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello");
})

app.listen(port, () => {
    console.log(`App is listening o port ${port}`);
})