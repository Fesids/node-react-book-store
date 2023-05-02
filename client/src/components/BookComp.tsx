import { useNavigate } from "react-router";
import { Book } from "../interfaces/Book";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AppContext } from "../AppContext";

export const BookAction = ({id, post_author}:Book) =>{
    const navigate = useNavigate();
    const {currentUser} = useContext(AppContext);

    let userId= 0
    if(currentUser){
        userId = parseInt(currentUser.id)
    }
    return(
        <div>
            {
                userId == post_author?
                <div>
                    <button onClick={()=> navigate(`../book/update/${id}`, {replace:true})} className="btn btn-primary">update</button>
                    <button onClick={()=> navigate(`../book/delete/${id}`, {replace:true})} className="btn btn-danger">delete</button>
                </div>
                
            :
            <p></p>
            }
            
        </div>
    )
}

export const BookComp = (book:Book) =>{
    return(
        <div className="container border mt-2 mb-2 book">
            <img src={book.image} />
           
            <h2><Link to={`/book/detail/${book.id}`}>{book.title}</Link></h2>
            <p>R$ {book.price}</p>
            <BookAction {...book}/>
        </div>

    )
}