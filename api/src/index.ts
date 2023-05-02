import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { BookRouter } from "./routes/book/BookRoutes";
import { authRouter } from "./routes/auth/AuthRoutes";
import { MongoClient } from "./database/MongoDb";
import bodyParser from 'body-parser'
import multer from 'multer';



const main = async () =>{

    await MongoClient.connect();

    const app = express();
    app.use(express.json());
    //app.use(multer().any());
    app.use(express.urlencoded({extended: false}))
    app.use(cors());
    app.use(cookieParser());
    app.use("/api/book", BookRouter);
    app.use("/api/auth", authRouter);
    
   
    

    const port = process.env.PORT || 8080;

    app.listen(port, () =>{
        console.log(`The server has started at port ${port}`)
    })
}

main();