import { rest } from "lodash";
import { IGetBooksRepository } from "../../../controllers/book/get-books-controller/protocols";
import { MongoClient } from "../../../database/MongoDb";
import { Book } from "../../../models/Book";

export class MongoGetBooksRepository implements IGetBooksRepository{
    async getBooks(): Promise<Book[]> {
        const books = await MongoClient.db
        .collection<Omit<Book, "id">>("books")
        .find({})
        .toArray();

        return books.map(({_id, ...rest})=>({
            ...rest,
            id: _id.toHexString()
        }))
    }
    
}