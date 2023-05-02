import axios from "axios";
import Cookie from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Book, ICreateBook, IUpdateBook } from "./interfaces/Book";
import { UserLogin } from "./interfaces/UserLogin";
import { User } from "./pages/Login";

interface AppContextProps{
    currentUser: User | null,
    Uuser: User,
    cookie: string,
    login(e:any, user:any): Promise<string | UserLogin>,
    register(e:any, user:any):void
    logout():void,

    // book
    books: Array<Book>,
    CreateBook(createBody:any):void,
    //GetBookById(id:string): Promise<Book> | Promise<void>,
    GetBookById(id:string): Promise<Book>,
    UpdateBook(id:string, updateBookBody:FormData):void,
    DeleteBook(id:string):void
}

export const AppContext = createContext({} as AppContextProps);


export const AppContextProvider = ({children}: React.PropsWithChildren) =>{
    const [currentUser, setCurrentUser] = useState<null | User>(JSON.parse(localStorage.getItem("currentuser") || '{}'));
    const [err, setErr] = useState("");
    const [Uuser, setUser] = useState({} as User);
    const [cookie, setCookie] = useState("");

    //*
    const [books, setBooks] = useState([] as Array<Book>);
    
    


    const register = async (e:any, user:any) =>{
        e.preventDefault();

        try{
            const res = await axios.post("api/auth/register", user);
            console.log(res)
            

        } catch(err:any){
            setErr(err.response.data)
            console.log(err)
        }
    }

    const login = async (e:any, user:any) =>{
        e.preventDefault();
        const resp = await axios.post("api/auth/login", user);
        setCurrentUser(resp.data);
        setUser(resp.data);
        return resp.data;
        /*if(currentUser){
            Cookie.set("jwtkey", currentUser?.token, {expires: 8})
        }*/
        
       
    }

    /* useEffect to set cookie and localStorage */
    useEffect(()=>{
        //Cookie.set("jwtkey", Uuser.token, {expires:8});
        localStorage.setItem("currentuser", JSON.stringify(currentUser));
        if(currentUser?.token){

            setCookie(currentUser?.token);
        }
    }, [currentUser, cookie])

    /*useEffect(()=>{
        Cookie.set("jwtkey", Uuser.token, {expires:8});
       
    }, [currentUser])*/

    const logout = async ()=>{
        await axios.post("api/auth/logout");
        setCurrentUser(null);
        Cookie.remove("jwtkey")

    }


    //* book 

    useEffect(()=>{
        const getBooks = async () =>{
            await axios.get("api/book/get/all")
            .then(resp => setBooks(resp.data));
        }
        getBooks();
    });

    const CreateBook = async (createBody:any) =>{
        
        const conf = {
            headers: {'Content-Type': 'multipart/form-data'}
        }

        await axios.post("api/book/new", createBody)
        .then((res)=>{
            console.log("response : "+res.data);
        })
        .catch((error) =>{
            const data = JSON.parse(error);
            console.log("error "+data);
        });
    

    }

    const GetBookById = async (id:string) =>{

        /*const resp =await axios.get(`/api/book/${id}`)
        .then(()=>{
            return resp.data;
        }).catch((err)=>{
            console.error(err);
        });*/
        const data = await axios.get(`/api/book/${id}`)
        return data.data
    }

    const UpdateBook = async (id:string, updateBookBody:FormData)=>{
        await axios.patch(`/api/book/update/${id}`, updateBookBody)
        .then((resp)=>{
            console.log(resp.data);
        }).catch((err)=>{
            console.error(err);
        });
    }

    const DeleteBook = async (id:string) =>{
        await axios.delete(`api/book/delete/${id}`)
        .then((resp)=>{
            console.log(resp.data);
        }).catch((err)=>{
            console.error(err);
        })
    }
    return(
        <AppContext.Provider value={{register, login,logout ,currentUser, Uuser, cookie, books, CreateBook, GetBookById, UpdateBook, DeleteBook}} >
            {children}
        </AppContext.Provider>
    )
}