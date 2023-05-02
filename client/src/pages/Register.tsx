import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router";
import { AppContext } from "../AppContext";
import { UserRegister } from "../interfaces/UserLogin"


export interface UserRegistered{
    id: string,
    username: string,
    email: string,
    role: string,
}
export const Register =()=>{
    const [newUser, setNewUser] = useState({} as UserRegister);
    const [registered, setRegistered] = useState({} as UserRegistered)
    const navigate = useNavigate();
    const {register}= useContext(AppContext)

    const handleChange = (e:any) =>{
        const newU = {...newUser, [e.target.name]: e.target.value}
        setNewUser(newU);
    }  

    console.log(newUser)

    const createUser = async (e:any) =>{
        /*e.preventDefault();
        /*await axios.post("api/users/register", newUser)
        await axios.get("api/users/teste")
        .then(resp => resp.data)
        .then(setTeste);
        try{

            await axios.post("api/users/new", {username: newUser.username,
            email: newUser.email, password: newUser.password, role:"USER"})
            .then(res => res.data)
            .then(setRegistered);
            return navigate("../login")
        } catch(err){

        }*/
        const u = {username: newUser.username,
            email: newUser.email, password: newUser.password, role:"USER"}
        register(e, u);
        return navigate("../login", {replace:true})
   
    }

    
    console.log("registered : "+ registered);

    return(
        
        <div className="create-note-form" >
            <h2 className="mt-2 mb-2">Register</h2>
            <p>Enter your credentials</p>
            <form method="post" onSubmit={(e:any)=>createUser(e)}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label mt-3">Username : </label>
                    <input name="username" className="form-control" id="username" onChange={(e)=>handleChange(e) }/>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label mt-3">Email : </label>
                    <input name="email" className="form-control" id="email" onChange={(e)=>handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-3">Password : </label>
                    <input name="password" className="form-control" id="password" onChange={(e)=>handleChange(e)}/>
                </div>


                <input type={"submit"} value="create" className="btn btn-success mt-2 mb-2"/>
            </form>
        </div>
    )

    
}