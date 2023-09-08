import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );
  const author = await db.author.findFirst({
    where: {
      firstName: "Mohamed",
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      return db.book.create({
        data: {
          datePublished: book.datePublished,
          title: book.title,
          isFiction: book.isFiction,
          authorId: author!.id,
        },
      });
    })
  );
}
// inserting the data
seed();
function getAuthors(): Array<Author> {
  return [
    {
      firstName: "Mohamed",
      lastName: "Bahri",
    },
    {
      firstName: "Ali",
      lastName: "Tamer",
    },
    {
      firstName: "Salime",
      lastName: "Sabri",
    },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: "Java",
      datePublished: new Date(),
      isFiction: false,
    },
    {
      title: "Dart",
      datePublished: new Date(),
      isFiction: false,
    },
    {
      title: "TypeScipt",
      datePublished: new Date(),
      isFiction: false,
    },
  ];
}
