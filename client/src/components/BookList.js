import React, { useState } from "react";
//import { graphql } from 'react-apollo'
//import {getBooksQuery} from "../queries/queries"
import { gql, useQuery } from "@apollo/client";
import BookDetail from "./BookDetails";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
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
  console.log(data.books);
  return (
    <div>
      <div id="book-list">
        {data.books.map((book) => (
          <div className="container-fluid my-5 books_section">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mt-4">
                <div className="card h-100">
                  <img src={book.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold text-secondary">
                      {book.name}
                    </h5>
                    <p className="card-text">
                      {book.description}
                      <div className="collapse m-0" id="collapseExample">
                        <div className="card card-body border-0 p-0">
                          {book.description}
                        </div>
                      </div>
                    </p>
                    <a
                      className="card-link d-block"
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample">
                      See More
                    </a>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Authors: <span> </span>
                    </li>
                    <li className="list-group-item">
                      Genre: <span>{book.genre}</span>
                    </li>
                    <li className="list-group-item">
                      Ratings: <span>{book.rating}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
