export interface UserLogin{
    email: String,
    password: String
}

export interface UserRegister{
    username: String,
    password: String,
    email: String,
    role: "USER"
}