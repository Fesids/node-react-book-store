import { HttpResponse } from "./ComunProtocols";

export const badRequest = (message: string): HttpResponse<string> =>{
    return{
        statusCode: 404,
        body: message
    }
}

export const ok = <T>(body: any): HttpResponse<T> =>{
    return{
        statusCode: 200,
        body
    }
}

export const created = <T>(body:any): HttpResponse<T> =>{
    return{
        statusCode: 201,
        body
    }
}