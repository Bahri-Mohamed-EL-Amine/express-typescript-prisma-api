import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as BookService from "./book.service";

export const bookRouter = express.Router();

// GET :: Read list of books

bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const books = await BookService.listBooks();
    return res.status(200).json(books);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

// GET :: Read single book

bookRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const book = await BookService.getBook(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (e: any) {
    return res.status(500).json({ messge: e.message });
  }
});

// Post :: create a book
bookRouter.post(
  "/",
  body("title").isString(),
  body("isFiction").isBoolean(),
  body("datePublished").isDate().toDate(),
  body("authorId").isInt(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const book = await BookService.createBook(req.body);
      return res.status(201).json(book);
    } catch (e: any) {
      return res.status(500).json({ messge: e.message });
    }
  }
);
// PUT :: update a book

bookRouter.put(
  "/:id",
  body("title").isString(),
  body("isFiction").isBoolean(),
  body("datePublished").isDate(),
  body("authorId").isInt(),
  async (req:Request,res:Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try{
        const id:number = parseInt(req.params.id); 
        const book = await BookService.updateBook(req.body,id);
        if(!book){
            return res.status(404).json({message:"Book not found "});
        }
        return res.status(200).json(book);
    }
    catch(e:any){
        return res.status(500).json({ message: e.message });
    }
  }
);

// DELETE :: delete a book

bookRouter.delete('/:id',async(req:Request,res:Response) => {
    try{
        const id  = parseInt(req.params.id);
        await BookService.deleteBook(id);
        return res.status(200).json({ message: "Author deleted with success" });
    }
    catch(e:any){
        return res.status(500).json({message:e.message});
    }
})