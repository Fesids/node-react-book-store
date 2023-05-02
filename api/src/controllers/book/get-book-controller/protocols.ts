import { Book } from "../../../models/Book";

export interface IGetBookRepository{
    getBook(id: string): Promise<Book>;
}