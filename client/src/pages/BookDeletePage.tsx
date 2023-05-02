import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { AppContext } from "../AppContext";
import { Book } from "../interfaces/Book";

export const BookDeletePage = () =>{
    const {id} = useParams()
    const [book, setBook] = useState({} as Book);
    const {GetBookById, DeleteBook} = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(()=>{
        let bookId = ""
        if(id){
            bookId = id
        }
        GetBookById(bookId)
        .then(resp => setBook(resp));

        

    }, [id]);

    const handleDelete = (e:any) =>{
        e.preventDefault();
        let bookId = ""
        if(id){
            bookId = id
        }
        DeleteBook(bookId);
        navigate("../book/list", {replace:true});
    }
    return(
        <div>
            <h2>Are ypu sure that you want to delete book '{book.title}'</h2>
            <form onSubmit={(e:any)=>handleDelete(e)}>
                <input type={"submit"} value="delete" className="btn btn-danger"/>
            </form>
        </div>

    )
}