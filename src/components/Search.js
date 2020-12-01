import React from "react";
//import { graphql } from 'react-apollo'
//import {getBooksQuery} from "../queries/queries"
//import { gql, useQuery } from "@apollo/client";
// import BookDetail from "./BookDetails";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../App.css"
// const getBooksQuery = gql`
//   {
//     genre {
//       name
//       id
//       genre
//       author {
//         name
//       }
//       description
//       rating
//       image
//     }
//   }
// `;

export default function Search() {
    return (
        <div>
            <div className="container mt-5">
        <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-10 offset-lg-2 offset-md-2 offset-sm-1">
                <div className="form-group">
                    <input type="text" className="form-control" name="search_field" id="search_field"
                        placeholder="Search Your Results...." />
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-10 offset-lg-2 offset-md-2 offset-sm-1 text-center">
                <button type="button" className="btn search_btn" id="by_book">Search Book Name</button>
                <button type="button" className="btn search_btn" id="by_author">Search By Rating</button>
                <button type="button" className="btn search_btn" id="by_genre">Search by Genre</button>
                <button type="button" className="btn search_btn" id="by_rating">Advance Search</button>
            </div>
        </div>
    </div>
        </div>
    )
}
