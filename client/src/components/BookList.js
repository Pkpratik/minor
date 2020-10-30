import React, { useState } from "react";
//import { graphql } from 'react-apollo'
//import {getBooksQuery} from "../queries/queries"
import { gql, useQuery } from "@apollo/client";
import BookDetail from "./BookDetails";

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
      author {
        name
      }
      description
      rating
      image
    }
  }
`;
function BooksDisplay() {
  const { loading, error, data } = useQuery(getBooksQuery);
  var [selected, setSelected] = useState("");
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Ops! Something went wrong</p>;
  //   console.log(selected);
  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li
            key={book.id}
            onClick={(e) => {
              setSelected(book.id);
            }}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetail bookid={selected} />
    </div>
  );
}
function BookList() {
  return (
    <div>
      <div>{BooksDisplay()}</div>
    </div>
  );
}

export default BookList;
