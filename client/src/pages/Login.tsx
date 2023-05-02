import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserLogin } from "../interfaces/UserLogin";
import Cookie from "js-cookie"
import {} from "react-cookie"
import { useNavigate } from "react-router";
import { json } from "body-parser";
import { AppContext } from "../AppContext";


export interface User{
    id: string,
    username: string,
    email: string,
    role: string,
    token: string
}
export const Login =()=>{
    //const [currentUser, setCurrentUser] = useState<null | User>(JSON.parse(localStorage.getItem("user") || '{}'));
    const [user, setUser] = useState({} as User)
    const [newUser, setNewUser] = useState({} as UserLogin);
    const [teste, setTeste] = useState();
    const [err, setErr] = useState({} as any);
    const {currentUser, login, Uuser, cookie} = useContext(AppContext);

    const navigate = useNavigate()

    const handleChange = (e:any) =>{
        const U = {...newUser, [e.target.name]: e.target.value}
        setNewUser(U);
    }  

   
    const LoginUser = async (e:any) =>{
        /*try{
            await login(e, newUser);
        } catch(err:any){
            
        }*/
        /*e.preventDefault();
        const resp = await axios.post("api/users/login", newUser)
       
        setUser(resp.data);*/
        //setCurrentUser(resp.data);
        
        /*axios.get("api/users/teste")
        .then(resp => resp.data)
        .then(setTeste);*/
        try{            
            login(e, newUser)
            .then(resp => setErr(resp));
            Cookie.set("jwtkey", cookie, {expires: 8});
            return navigate("../", {replace:true})
        } catch(err){
            
        }
       

        /*e.preventDefault();
        const resp = await axios.post("api/users/login", newUser)
       
        setUser(resp.data);*/
        //setCurrentUser(resp.data)
    }

  
    /*if(currentUser){
        localStorage.setItem("currentuser", JSON.stringify(user));
    }*/

    

    //Cookie.set("jwtkey", Uuser.token, {expires: 8})
    
    return(
        
        <div className="create-note-form" >
            <h2 className="mt-2 mb-2">Login</h2>
            <p>Enter your credentials</p>
            
            <form method="post" onSubmit={(e:any)=>LoginUser(e)}>

                <div className="form-group">
                    <label htmlFor="email" className="form-label mt-3">Email : </label>
                    <input name="email" className="form-control" id="email" onChange={(e)=>handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-3">Password : </label>
                    <input name="password" className="form-control" id="password" onChange={(e)=>handleChange(e)}/>
                </div>


                <input type={"submit"} value="login" className="btn btn-success mt-2 mb-2"/>
            </form>
        </div>
    )

    
}