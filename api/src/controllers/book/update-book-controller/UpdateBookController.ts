import s from "connect-redis";
import { Book } from "../../../models/Book";
import { HttpRequest, HttpResponse, IController } from "../../ComunProtocols";
import { badRequest, ok } from "../../Helpers";
import { IUpdateBookRepository, UpdateBookParams } from "./protocols";


export class UpdateBookController implements IController{
    constructor(private readonly updateBookRepository: IUpdateBookRepository){}
    async handle(httpRequest: HttpRequest<UpdateBookParams>)
    : Promise<HttpResponse<Book | string>> {
        try{
            const id = httpRequest?.params?.id;

            const {body} = httpRequest;

            if(!body){
                return badRequest("Missing Fields");
            }
            
            if(!id){
                return badRequest("Missing book id");
            }

            const allowedFieldsToUpdate:(keyof UpdateBookParams)[]=['title', 'description', 'author', 'price', 'image'];
            
            const someFieldsNotAllowedToUpdate = Object.keys(body)
            .some(
                (key) => !allowedFieldsToUpdate
                .includes(key as keyof UpdateBookParams)
            );

            if (someFieldsNotAllowedToUpdate){
                return badRequest("some included fields are not allowed");
            }

            const book = await this.updateBookRepository.updateBook(id, body);

            return ok<Book>(book)
        }catch(error){
            return badRequest("error trying update book")
        }
    }
    
}