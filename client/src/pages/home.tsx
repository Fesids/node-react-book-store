import { useContext } from "react"
import { useNavigate } from "react-router"
import { AppContext } from "../AppContext"

export const Home = () =>{
    const {currentUser} = useContext(AppContext)
    return(
        <div className="home mt-3">
            <h2>Home</h2>
            <div className="container border">
                {currentUser?
                    <div>
                        <p>Welcome {currentUser?.username}</p>
                        <a href="/book/list" className="link">go to book list</a>
                    </div>
                 
                   
                    :
                    <p>Please, login or signup in our site</p>
                }
                
            </div>
        </div>
    )
}