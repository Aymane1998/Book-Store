import axios from "axios";
import { BACK_URL } from "../../config";
import { Book } from "../../utils/types/Book";



export const getBooks = async (): Promise<Book[]> => {

  const url = `${BACK_URL}/books`;

  const response = await axios.get<Book[]>(url);

  return response.data;
};
