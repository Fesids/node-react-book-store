import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext"
import { BookComp } from "../components/BookComp";

export const ListBookPage = () =>{
    const {books, currentUser} = useContext(AppContext);
    const navigate = useNavigate();

    console.log(books);
    return(
        <div className="book-list-container">
            <h1>List Books</h1>
            {currentUser?
                <a onClick={()=>navigate("../book/new", {replace:true})}>+ add a new book</a>:
                <p></p>
            }
            
            <div className="book-list">

                {/*{books?.map(book => <BookComp {...book}/>)}*/}
                {!books.length?<p>No books found</p>
                :
                books.map(book=> <BookComp {...book}/>)
                }
            </div>
        </div>
    )
}