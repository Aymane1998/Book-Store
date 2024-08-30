import express from 'express';
import {PORT, MONGODBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';


const app = express();

app.get('/', (req, res) => {
    console.log('request',req)
    return res.status(234).send('Welcome To MERN STACK APPLICATION')
})

// Route for save a new Book
app.post('/books', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message :' send all required fileds : title, author, publishYear'
            });
        }
        const newBook = {

    }
    }
    
    catch (error){
        console.log('error', error)
        res.status(500).send({message : error.message})
    }
})


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