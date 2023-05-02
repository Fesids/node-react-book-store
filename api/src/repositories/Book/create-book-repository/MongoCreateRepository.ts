import { CreateBookParams, ICreateBookRepository } from "../../../controllers/book/create-book-controllers/protocols";
import { MongoClient } from "../../../database/MongoDb";
import { uploadFile } from "../../../middleware/upload";
import { Book } from "../../../models/Book";



export class MongoCreateBookRepository implements ICreateBookRepository{
    async createBook(params: CreateBookParams): Promise<Book> {
        
        
        const {insertedId}= await MongoClient.db
        .collection("books")
        .insertOne(params);

        const book = await MongoClient.db
        .collection<Omit<Book, "id">>("books")
        .findOne({_id: insertedId});

        if(!book){
            throw new Error("book not exist");
        }

        const {_id, ...rest} = book;
        
        return {id: _id.toHexString(), ...rest};

    }
    
}