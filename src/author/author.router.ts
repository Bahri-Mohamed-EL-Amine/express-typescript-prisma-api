import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "./author.service";

export const authorRouter = express.Router();

// GET :: get list of all authors

authorRouter.get("/", async (req: Request, res, Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return res.status(200).json(authors);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

// GET:: get a single author by id

authorRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const author = await AuthorService.getAuthor(id);
    if (author) {
      return res.status(200).json(author);
    } else {
      return res.status(404).json({
        message: "Author not found",
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

// POST ::  Create a Author
authorRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const author = req.body;
      const newAuthor = await AuthorService.createAuthor(author);
      return res.status(201).json(newAuthor);
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
  }
);

// PUT :: Update an Author

authorRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const id: number = parseInt(req.params.id, 10);
    try {
      const author = req.body;
      const newAuthor = await AuthorService.updateAuthor(author, id);
      return res.status(200).json(newAuthor);
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
  }
);

//DELETE :: Delet a Author

authorRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await AuthorService.deleteAuthor(id);
    return res.status(200).json({message:"Author deleted with success"});
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
});
