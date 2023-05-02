import mysql from 'mysql';

const DB = mysql.createConnection(
    {
        /*host: "localhost",
        database: "BookStoree",
        user: "root",
        password: "6789000"*/
        host: "localhost",
        database: "BookStoree",
        user: "root",
        password: "67890000"
    }
)
export default DB;