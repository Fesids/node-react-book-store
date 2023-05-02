import { Book } from "../../../models/Book";
import { HttpRequest, HttpResponse, IController } from "../../ComunProtocols";
import { badRequest, ok } from "../../Helpers";
import { IGetBookRepository } from "./protocols";

export class GetBookController implements IController{
    constructor(private readonly getbookrepository: IGetBookRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<Book | string>> {
        const {id} = httpRequest.params;

        if(!id){
            return badRequest("missing id param");
        }

        const book = await this.getbookrepository.getBook(id);

        if(book){
            return ok(book);
        }

        return badRequest(`book with id ${id} not found`);
    }
    
}