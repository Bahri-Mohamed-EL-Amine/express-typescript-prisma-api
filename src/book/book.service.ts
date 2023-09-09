import { db } from "../utils/db.server";
import type { Author } from "../author/author.service";

type BookRead = {
  id: number;
  title: string;
  isFiction: boolean;
  datePublished: Date;
  author: Author;
};

type BookWrite = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
  authorId: number;
};
const select =  {
  id: true,
  title: true,
  isFiction: true,
  datePublished: true,
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
};
export const listBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select:select,
  });
};

export const getBook = async (id: number): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: {
      id,
    },
    select: select,
  });
};

export const createBook = async (bookWrite: BookWrite): Promise<BookRead> => {

    const {authorId,datePublished,isFiction,title} = bookWrite;
    const parsedDate : Date =  new Date(datePublished); 
    return db.book.create({
      data: {
        authorId,
        isFiction,
        title,
        datePublished: parsedDate,
      },
      select: select,
    });
};

export const updateBook = async (bookWrite:BookWrite,id:number):Promise<BookRead | null>=>{
    const { authorId, datePublished, isFiction, title } = bookWrite;
    const parseDate: Date = new Date(datePublished); 
    return db.book.update({
      where: {
        id,
      },
      select: select,
      data: {
        authorId,
        isFiction,
        title,
        datePublished: parseDate,
      },
    });
}

export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete(
    {
        where:{
            id
        }
    }
  );
};