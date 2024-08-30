import mongoose from "mongoose";

const bookScheme = mongoose.Schema(
    
{
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
},
{
    Timestamp:true,
}
);

export const Book = mongoose.model('Book',bookScheme);