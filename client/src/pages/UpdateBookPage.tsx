import { number } from "prop-types";
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../AppContext";
import { Book, IUpdateBook } from "../interfaces/Book";

export const UpdateBookPage = () =>{
    const navigate = useNavigate();
    const {id} = useParams()
    const [img, setImg] = useState("");
    const [bookUpBody, setBookUpBody] = useState({} as IUpdateBook);
    const [book, setBook] = useState({} as Book);
    const {GetBookById, UpdateBook} = useContext(AppContext);

    /*const titleRef = useRef("");
    const descriptionRef = useRef("");
    const priceRef = useRef({} as unknown);
    const authorBookRef = useRef("");*/

    useEffect(()=>{
        let bookId = ""
        if(id){
            bookId = id
        }
        GetBookById(bookId)
        .then(resp => setBook(resp));

        

    }, [id])
    console.log(bookUpBody);

    const handleUpdateBook = (e:any) =>{
        let upImg = ""
        if(img){
            upImg = img
        }
        const bUp = {
            "author" : book.author,
            "description" : book.description,
            "price": book.price,
            "title": book.title,
            "image": img
        }

        const formData = new FormData()
        formData.append("author", book.author);
        formData.append("description", book.description);
        formData.append("price", JSON.stringify( book.price));
        formData.append("title", book.title);
        formData.append("image", img);

        
        e.preventDefault();
        const bookId = id? id: ""
        UpdateBook(bookId, formData);
        navigate(`../book/detail/${id}`, {replace:true})
    }

    
    /*useEffect(()=>{
       
        titleRef.current = book.title;
        descriptionRef.current = book.description;
        priceRef.current = book.price
        authorBookRef.current = book.author

    })*/
    

    const handleChange=(e:any)=>{
        setBook({...book, [e.target.name]: e.target.value})
    }

    return(
        <div className="create-note-form" >
            <h2 className="mt-2 mb-2">Update book</h2>
            
            <form method="post" onSubmit={(e) => handleUpdateBook(e)} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="image" className="form-label mt-3">Image :  </label>
                    <input name="image" className="form-control" id="image" type={"file"} onChange={(e:any)=> setImg(e.target.files[0])} formEncType="multipart/form-data" key={"image"}/>
                </div>

                <div className="form-group">
                    <label htmlFor="title" className="form-label mt-3">Title : </label>
                    <input value={book.title || ''} name="title" className="form-control" id="title" onChange={(e)=> handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label mt-3">Description : </label>
                    <input value={book.description ||''} name="description" className="form-control" id="description" onChange={(e)=> handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="price" className="form-label mt-3">Price : </label>
                    <input name="price" className="form-control" id="price" type={"number"} onChange={(e)=> handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="author" className="form-label mt-3">Author_book : </label>
                    <input value={book.author || ''} name="author" className="form-control" id="author" type={"text"} onChange={(e)=> handleChange(e)}/>
                </div>

               


                <input type={"submit"} value="post" className="btn btn-success mt-2 mb-2"/>
            </form>
        </div>
    )
}