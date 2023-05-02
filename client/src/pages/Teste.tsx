import axios from "axios";
import { any } from "prop-types";
import { useState } from "react"

export const Teste = () =>{

    const [img, setImg] = useState('');

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", img)
        axios.post("api/teste/upload", formData);
    }
   
    return(
        <div>
            <form method="post" onSubmit={(e)=> handleSubmit(e)}>
                <input type={"file"} name="image" onChange={(e:any)=> setImg(e.target.files[0])}></input>
                <input type={"submit"} value="ainn"></input>
            </form>
        </div>

    )
}