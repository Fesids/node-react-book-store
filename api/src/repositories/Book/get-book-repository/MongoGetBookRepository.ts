import { ObjectId } from "mongodb";
import { IGetBookRepository } from "../../../controllers/book/get-book-controller/protocols";
import { MongoClient } from "../../../database/MongoDb";
import { Book } from "../../../models/Book";

export class MongoGetBookRepository implements IGetBookRepository{
    async getBook(id: string): Promise<Book> {
        const book = await MongoClient.db
        .collection<Omit<Book, "id">>("books")
        .findOne({_id: new ObjectId(id)});

        if(!book){
            throw new Error(`Book with id ${id} not found!`)
        }

        const {_id, ...rest} = book

        return {id: _id.toHexString(), ...rest}
    }
    
}