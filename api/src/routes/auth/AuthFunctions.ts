import {Request, Response} from 'express';
import DB from '../../database/MySqlDb';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

export const test = (req:Request, res:Response)=>{
    var q = "insert into teste(name) values(?)";

    DB.query(q, [req.body.name], (err, data)=>{
        if(err) return res.status(400).json("uma drogada");
        return res.status(200).json("genio");
    })

}

export const Login = (req:Request, res:Response) =>{
    const q = "select * from users where email=?";

    DB.query(q, [req.body.email], (err, data)=>{
        if(err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if(!isPasswordCorrect) return res.status(400).json("email or password incorrect");

        const token = jwt.sign({id: data[0].id}, "jwtkey");
        const {password, ...other} = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);

    })

}

export const Register = (req:Request, res:Response) => {

    var q = "select * from users where email = ? or username = ?";


    DB.query(q, [req.body.email, req.body.username], (err, data)=>{
        if(err) return res.status(400).json("deu ruim");
        if(data.length) return res.status(409).json("user with this credentials already exists");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        var qq = "insert into users(`username`, `email`, `password`) values(?)";
    
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]
    
        DB.query(qq, [values], (err, data)=>{
            if (err) return res.json("an unexpected error occur in your registration, try again");
            return res.status(200).json("User has been created");
        })
    });

    /*var qq = "insert into users(`username`, `email`, `password`) values(?)";
    
        const values = [
            req.body.username,
            req.body.email,
            req.body.password
        ]
    
        DB.query(qq, [values], (err, data)=>{
            if (err) return res.json("an unexpected error occur in your registration, try again");
            return res.status(200).json("User has been created");
        })*/

   
}

export const Logout = (req:Request, res:Response) =>{
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has logout")
}