import { Book } from "../../../models/Book";

/*export interface CreateBookParams{
    title: string,
    description: string,
    price: number,
    image: string,
    author: string,

}*/
export interface CreateBookParams extends Omit<Book, "id">{
    
}
export interface ICreateBookRepository{
    createBook(params: CreateBookParams): Promise<Book>;
}