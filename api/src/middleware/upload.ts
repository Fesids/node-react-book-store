import util from 'util'
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { dbutil } from './dbutil';

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    
    destination: (req, file, cb ) =>{
        cb(null,__dirname+"/upload");
    },
    filename: (req, file, cb) =>{
        console.log(file.originalname);
        cb(null, file.originalname)
    },
    
});

export const uploadFile = multer({
    storage: storage,
    limits: {fileSize: maxSize},

});

//export let uploadFileMiddleware = util.promisify(uploadFile);

/*let dbConfigUrl = ""
let dbConfigDatabase = ""
if (process.env.MONGODB_URL && process.env.database){
    dbConfigUrl = process.env.MONGODB_URL
    dbConfigDatabase = process.env.database
}

var storage = new GridFsStorage({
    url: dbutil.MONGODB_URL + dbutil.database,
    options:{ useNewUrlParser: true, useUnifiedTopology: true},
    file:(req, file)=>{
        const match = ['image/png', 'image/jpeg']

        if (match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}-fe-${file.originalname}`;
            return filename;
        }

        return{
            bucketName : dbutil.imgBucket,
            filename : `${Date.now()}-fe-${file.originalname}`
        }
    }


});

var uploadFile = multer({storage: storage}).single("image");

export const uploadFileMiddleware = util.promisify(uploadFile);*/