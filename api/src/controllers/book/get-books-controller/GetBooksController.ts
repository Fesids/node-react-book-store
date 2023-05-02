import { Book } from "../../../models/Book";
import { HttpRequest, HttpResponse, IController } from "../../ComunProtocols";
import { badRequest } from "../../Helpers";
import { IGetBooksRepository } from "./protocols";

export class GetbooksController implements IController{
    constructor(private readonly getBooksRepository: IGetBooksRepository){}
    async handle(): 
    Promise<HttpResponse<Array<Book> | string>> {
        try{
            const books = await this.getBooksRepository.getBooks();

            if(books.length){
                return{
                    statusCode: 200,
                    body: books
                }
            } else{
                return {
                    statusCode: 200,
                    body: "no book found!"
                }
            }

        } catch(error){
            return badRequest("something went wrong when trying to retrive book list")
        }
    }
    
}