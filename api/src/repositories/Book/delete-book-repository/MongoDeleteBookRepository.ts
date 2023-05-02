import { ObjectId } from "mongodb";
import { IDeleteBookRepository } from "../../../controllers/book/delete-book-controllers/protocols";
import { MongoClient } from "../../../database/MongoDb";
import { Book } from "../../../models/Book";

export class MongoDeleteBookRepository implements IDeleteBookRepository{
    async deleteBook(id: string): Promise<Book> {
        const book = await MongoClient.db
        .collection<Omit<Book, "id">>("books")
        .findOne({_id: new ObjectId(id)});

        if(!book){
            throw new Error("Book not found! provide a valid id");
        }

        const {deletedCount} = await MongoClient.db
        .collection("books")
        .deleteOne({_id: new ObjectId(id)});

        if(!deletedCount){
            throw new Error("Book couldn't be delete");
            
        }

        const {_id, ...rest} = book;

        return{
            id: _id.toHexString(),
            ...rest
        }
    }
    
}