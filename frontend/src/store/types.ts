

export interface CreateBookPayload {
  title: string;
  author: string;
  publishYear: number;
  image: File | null; // Change to File to match the file input type
  description: string | null;
}