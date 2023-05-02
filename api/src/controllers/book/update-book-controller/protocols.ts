import { Book } from "../../../models/Book";

export interface UpdateBookParams extends Omit<Book, "id" |"post_author">{

}

export interface IUpdateBookRepository{
    updateBook(id: string, params:UpdateBookParams):Promise<Book>;
}