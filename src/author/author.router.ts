import express from 'express';
import type {Request, Response}from 'express';
import  {body,validationResult} from 'express-validator';

import *  as  AuthorService from  './author.service';


export const authorRouter = express.Router();
 
// GET :: get list of all authors

authorRouter.get('/',async (req:Request,res,Response) => {
    try{
        const authors = await AuthorService.listAuthors();
        return res.status(200).json(authors);
    }
    catch(e:any){
        return res.status(500).json(e.message);
    }

});

// GET:: get a single author by id

authorRouter.get('/:id',async (req:Request,res:Response) => {
    try{
        const id = parseInt(req.params.id);
        const author = await AuthorService.getAuthor(id);
        if(author){
             return res.status(200).json(author);
        }
        else{
             return res.status(404).json({
                "message":"Author not found"
             });
        }

    }   
    catch(e:any){
        return res.status(500).json({
          message: e.message,
        });
    }
});