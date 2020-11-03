import React, { useState } from "react";
//import { graphql } from 'react-apollo';
//import {getBooksQuery} from "../queries/queries"
import { gql, useQuery } from "@apollo/client";
// import React, { Component } from 'react';
// import { graphql } from '@apollo/client';
// import { getBookQuery } from '../queries/queries';

const getBookQuery = gql`
  query GetBook($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

function DisplayBookDetails() {
  //   const { loading, error, data } = useQuery(getBooksQuery);
  //   console.log(data);
  //   if (loading) return <p>Loading....</p>;
  //   if (error) return <p>Ops! Something went wrong</p>;
  //   id="book-list"
  return <ul> </ul>;
}
function BookDetails() {
  return <div id="book-details">{DisplayBookDetails()}</div>;
}

export default BookDetails;

// export default function BookDetails(props) {
//   function DisplayBookDetails() {
//     const { book } = props.data;
//     if (book) {
//       return (
//         <div>
//           <h2>{book.name}</h2>
//           <p>{book.genre}</p>
//           <p>{book.author.name}</p>
//           <p>All books by this author:</p>
//           <ul className="other-books">
//             {book.author.books.map((item) => {
//               return <li key={item.id}>{item.name}</li>;
//             })}
//           </ul>
//         </div>
//       );
//     } else {
//       return <div>No book selected...</div>;
//     }
//   }

//   return <div id="book-details">{DisplayBookDetails()}</div>;
// }
