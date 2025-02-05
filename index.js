const express = require('express');
const { resolve } = require('path');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});



const mongoURI = process.env.MONGO_URI || 'your_mongodb_connection_string';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
