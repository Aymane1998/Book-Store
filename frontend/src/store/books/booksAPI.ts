import axios from "axios";
import { BACK_URL } from "../../config";
import { Book } from "../../utils/types/Book";
import { CreateBookPayload } from "../types";



export const getBooks = async (): Promise<Book[]> => {

  const url = `${BACK_URL}/books`;

  const response = await axios.get<Book[]>(url);

  return response.data;
};

export const createBooks = async (
  payload: CreateBookPayload
): Promise<Book> => {
  const url = `${BACK_URL}/books`;

  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('author', payload.author);
  formData.append('publishYear', payload.publishYear.toString());
  if (payload.description) {
    formData.append('description', payload.description);
  }

  if (payload.image) {
    formData.append('image', payload.image);
  }

  // Note: axios will automatically set the 'Content-Type' to 'multipart/form-data' for FormData requests.
  const response = await axios.post<Book>(url, formData);

  return response.data;
};