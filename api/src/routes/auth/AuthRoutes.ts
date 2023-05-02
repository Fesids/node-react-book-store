import express from 'express'
import { uploadFile } from '../../middleware/upload';
import { Login, Logout, Register, test } from './AuthFunctions';

const router = express();

router.post("/register", Register);
router.post("/Login", Login);
router.post("/logout", Logout);
router.post("/test", test);

export const authRouter = router;