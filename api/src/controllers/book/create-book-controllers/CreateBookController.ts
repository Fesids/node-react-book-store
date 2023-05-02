import { Book } from "../../../models/Book";
import {HttpResponse, IController, HttpRequest } from "../../ComunProtocols";
import { badRequest, created } from "../../Helpers";
import { CreateBookParams, ICreateBookRepository } from "./protocols";


/*export class CreateBookController implements IController{
    constructor(private readonly createBookRepository: ICreateBookRepository){}
    async handle(httpRequest: HttpRequest<CreateBookParams>): 
    Promise<HttpResponse<Book | string>> {
        try{
            const requiredFields = ['title', "description", "price", "image", "author"];

            for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateBookParams]?.length){
                    return badRequest(`Field ${field} is required`)
                }
            }

            if(!httpRequest.body){
                return  
            }
        }
    }
    
}*/

/*export class CreateBookController implements IController{
    constructor(private readonly createBookRepository: ICreateBookRepository){}
    async handle(httpRequest: HttpRequest<CreateBookParams>)
    : Promise<HttpResponse<Book | string>> {
        try{
            const requiredFields = ['title', 'description', 'author', 'price', 'image'];
            
            for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateBookParams].valueOf.length){
                    return badRequest(`Field ${field} is required`)
                }
            }

            if(!httpRequest.body){
                return badRequest("Please, specify a body")
            }
            const note = await this.createBookRepository.createBook(httpRequest.body);
            //const note = await this.createBookRepository.createBook();
            return created<Book>(note);
        } catch(error){
            return badRequest("Something went wrong");
        }

       
    }
    
}*/

export class CreateBookController implements IController{
    constructor(private readonly createBookRepository: ICreateBookRepository){}
    async handle(httpRequest: HttpRequest<CreateBookParams>) 
    : Promise<HttpResponse<Book | string>> {
       try{
            const requiredFields = ['title', 'description', 'author', 'price', 'image'];

            
           
            /*for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateBookParams]?.toString?.length){
                    return badRequest(`Field ${field} is required`)
                
                }
            }*/

            if(!httpRequest.body){
                return badRequest("Please, specify a body")
            }

            const book = await this.createBookRepository.createBook(httpRequest.body);
            return created<Book>(book);
            
       }catch(error){
        return badRequest("Something went wrong")
       }
    }
    
}