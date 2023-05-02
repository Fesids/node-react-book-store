import express from 'express';
import { uploadFile } from '../../middleware/upload';
import { CreateBookFunction, DeleteBookFunction, GetBookFunction, GetBooksFunction, UpdateBookFunction } from './BookFunction';

const router = express.Router();

router.post("/new", uploadFile.single("image") ,CreateBookFunction);
router.delete("/delete/:id", DeleteBookFunction);
router.patch("/update/:id",uploadFile.single("image"), UpdateBookFunction);
router.get("/get/all", GetBooksFunction);
router.get("/:id", GetBookFunction)

export const BookRouter = router;