import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { AppContext } from "../AppContext";
import { BookComp } from "../components/BookComp";
import { Book } from "../interfaces/Book";


export const BookDetail = () =>{
    const {id} = useParams();
    const [book, setBook] = useState({} as Book);
    const {GetBookById} = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(()=>{
        let bookId = ""
        if(id){
            bookId = id
        }
        GetBookById(bookId)
        .then(resp => setBook(resp));

        

    }, [id]);


    return(
        <div className="container">
            <BookComp {...book}/>
        </div>
    )
}