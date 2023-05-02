import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../AppContext";
import { ICreateBook } from "../interfaces/Book";


export const CreateBookPage = () =>{

    const [newBook, setNewBook] = useState({} as ICreateBook);
    const [img, setImg] = useState("");
    const {currentUser, CreateBook} = useContext(AppContext);
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();

    const handleChange=(e:any)=>(
        setNewBook({...newBook, [e.target.name]: e.target.value})
    );

   

    let currentUserId = 0;
    if(currentUser?.id){
        currentUserId = parseInt(currentUser.id);
    }
    
    const handleCreateBook = (e:any) =>{
        
       let formData = new FormData();
       formData.append('title', newBook.title);
       formData.append('description',newBook.description);
       formData.append('price', JSON.stringify(newBook.price));
       formData.append('image', img);
       formData.append('author', newBook.author);
       formData.append('post_author', JSON.stringify(currentUserId));

      
        e.preventDefault();
        CreateBook(formData);
        navigate("../book/list",{replace:true})
    }

    if(redirect){
        navigate("../", {replace:true})
    }

    console.log(newBook);

    return(
        <div className="create-note-form" >
            <h2 className="mt-2 mb-2">Create a book</h2>
            
            <form method="post" onSubmit={(e) => handleCreateBook(e)} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="image" className="form-label mt-3">Image :  </label>
                    <input name="image" className="form-control" id="image" type={"file"} onChange={(e:any)=> setImg(e.target.files[0])} formEncType="multipart/form-data" key={"image"}/>
                </div>

                <div className="form-group">
                    <label htmlFor="title" className="form-label mt-3">Title : </label>
                    <input name="title" className="form-control" id="title" onChange={(e)=> handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label mt-3">Description : </label>
                    <input name="description" className="form-control" id="description" onChange={(e)=> handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="price" className="form-label mt-3">Price : </label>
                    <input name="price" className="form-control" id="price" type={"number"} onChange={(e)=> handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="author" className="form-label mt-3">Author_book : </label>
                    <input name="author" className="form-control" id="author" type={"text"} onChange={(e)=> handleChange(e)}/>
                </div>

               


                <input type={"submit"} value="post" className="btn btn-success mt-2 mb-2"/>
            </form>
        </div>
    )

}