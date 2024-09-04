import express, { response } from 'express';
import {PORT, MONGODBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handeling CORS Policy
//Option 1 : Allow all origins with Default odf cors(*)
// app.use(cors());

//Option 2 : Allow custom origins
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);
app.get('/', (req, res) => {
    console.log('request',req)
    return res.status(234).send('Welcome To MERN STACK APPLICATION')
})

app.use('/books', booksRoute);

mongoose
    .connect(MONGODBURL)
    .then(()=>{
        console.log('App is connected to database')
        app.listen(PORT, () => {
          console.log(`Application is listening on port : ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(`${error} has occured while connecting to database`);
    });