import { CreateBookController } from "../../controllers/book/create-book-controllers/CreateBookController";
import { MongoCreateBookRepository } from "../../repositories/Book/create-book-repository/MongoCreateRepository"
import {Request, Response} from "express";
import { MongoDeleteBookRepository } from "../../repositories/Book/delete-book-repository/MongoDeleteBookRepository";
import { DeleteBookController } from "../../controllers/book/delete-book-controllers/DeleteBookController";
import { MongoUpdateBookRepository } from "../../repositories/Book/update-book-repository/MongoUpdateBookRepository";
import { UpdateBookController } from "../../controllers/book/update-book-controller/UpdateBookController";
import { GetbooksController } from "../../controllers/book/get-books-controller/GetBooksController";
import { MongoGetBooksRepository } from "../../repositories/Book/get-books-repository/MongoGetBooksRepository";
import { GetBookController } from "../../controllers/book/get-book-controller/GetBookController";
import { MongoGetBookRepository } from "../../repositories/Book/get-book-repository/MongoGetBookRepository";
import { uploadFile } from "../../middleware/upload";
import { string } from "prop-types";
import { stringify } from "querystring";


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

export const CreateBookFunction = async (req:Request, res:Response) =>{

    

    //await uploadFileMiddleware(req, res);
    //const url = 'C:/Users/felip/OneDrive/Área de Trabalho/MyReactProjects2/MyReacts3/BookStore/api/src/middleware/upload/';
    /** URL com finalidade de teste, utilizando a extensão Chrome webserver */
    const url = 'http://127.0.0.1:8887/'
    

    /*formData.append("title", req.body.title)
    formData.append("image", url+req.file?.filename);
    formData.append("description", req.body.description);
    formData.append("price", req.body.price);
    formData.append("author", req.body.author);
    formData.append("post_author", req.body.post_author)*/
    
    const price = stringify(req.body.price).replace("\"", "")

    const bookObject = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: url+req.file?.filename,
        author: req.body.author,
        post_author: req.body.post_author
    }
    

    const mongoCreateBookRepository = new MongoCreateBookRepository();

    const createBookController = new CreateBookController(
        mongoCreateBookRepository
    );

    const {body, statusCode} = await createBookController.handle({
        body: bookObject
    });
    

    res.status(statusCode).send(body);

}

export const DeleteBookFunction = async (req: Request, res: Response) =>{
    const mongoDeleteBookRepository = new MongoDeleteBookRepository();

    const deleteBookController = new DeleteBookController(
        mongoDeleteBookRepository
    );

    const {statusCode, body} = await deleteBookController.handle({
        params: req.params,
    });

    return res.status(statusCode).send(body);

}

export const UpdateBookFunction = async (req: Request, res:Response)=>{
    const mongoUpdateBookRepository = new MongoUpdateBookRepository();


    const url = 'http://127.0.0.1:8887/';

    const bookObject = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: url+req.file?.filename,
        author: req.body.author,
        
    }

    const updateBookController = new UpdateBookController(
        mongoUpdateBookRepository
    );

    const {body, statusCode} = await updateBookController.handle({
        body: bookObject,
        params: req.params
    });

    res.status(statusCode).send(body);
}

export const GetBooksFunction = async (req:Request, res:Response) =>{
    const mongogetbooksrepository = new MongoGetBooksRepository();

    const getBooksController = new GetbooksController(mongogetbooksrepository);

    const {body, statusCode} = await getBooksController.handle();

    res.status(statusCode).send(body);

}

export const GetBookFunction = async (req:Request, res:Response) =>{
    const mongogetbookrepository = new MongoGetBookRepository();

    const getbookcontroller = new GetBookController(mongogetbookrepository);

    const {body, statusCode} = await getbookcontroller.handle({
        params: req.params
    });

    return res.status(statusCode).send(body);

}