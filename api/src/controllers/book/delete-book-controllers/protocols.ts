import { Book } from "../../../models/Book";

export interface IDeleteBookRepository{
    deleteBook(id:string): Promise<Book>
}