import { Book } from "../../../models/Book";

export interface IGetBooksRepository{
    getBooks(): Promise<Array<Book>>
}