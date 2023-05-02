import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../AppContext"


export const Navbar = () =>{
    const {currentUser, logout} = useContext(AppContext);

    const Logout = (e:any) =>{
        //e.preventDefault();
        logout();
    }
    return(
        <div className="navbar-container">
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" typeof="" to={""}>Register system with Node</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {currentUser?

                
                    <p>
                        
                        <a className="btn btn-dark" onClick={Logout}>logout</a>
                    </p>

                    :
                    <p>
                        <Link to="login" className="btn btn-dark">login</Link>
                        <Link className="btn btn-dark" to="register">signup</Link>
                    </p>
                }
            </div>
        </nav>
        </div>
        /*<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Node react notes app</a>
            <div className="container-fluid">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/">Home</a>
                    <a className="nav-item nav-link" href="/notes">Notes</a>
                    <a className="nav-item nav-link" href="/add/notes">+ add Notes</a>
                    {currentUser? 
                        <div>
                            <Link className="" to={""}>{currentUser.username}</Link>
                            <a className="btn btn-outline-light" onClick={(e)=> Logout(e)}>Logout</a>
                        </div>
                    
                        :<div>
                            <Link to={"login"}>Login</Link>
                            <Link to={"register"}>Signup</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>   */   
    )
}