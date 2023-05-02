export interface Book{
    id: string,
    title: string,
    description: string,
    price: number,
    image: string,
    author: string,
    post_author: number
}

export interface ICreateBook extends Omit<Book, "id">{

}

export interface IUpdateBook extends Omit<Book, "id" |"post_author">{

}