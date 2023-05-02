import { Book } from "../../../models/Book";
import { HttpRequest, HttpResponse, IController } from "../../ComunProtocols";
import { badRequest, ok } from "../../Helpers";
import { IDeleteBookRepository } from "./protocols";

export class DeleteBookController implements IController{
    constructor(private readonly deleteBookRepository: IDeleteBookRepository){}
    async handle(httpRequest: HttpRequest<any>)
    : Promise<HttpResponse<Book | string>> {
        try{
            const id = httpRequest?.params?.id;

            if(!id){
                return badRequest("Missing book id");
            }

            const book = await this.deleteBookRepository.deleteBook(id);

            return ok<Book>(book);
        } catch(error){
            return badRequest("Something went wrong");
        }
        
    }

}