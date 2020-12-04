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


<!DOCTYPE html>
<html lang="en">

<head>
    <!-- meta tags -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="authors" content="Rishi Soni" />

    <!-- title tag -->
    <title>Form</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

    <!-- Custom CSS -->
    <style>
         button#open_book_form {
            font-weight: bold;
            position: fixed;
            bottom: 15px;
            right: 20px;
            font-size: 32px;
            padding: 3px 15px 7px 15px;
         }
    </style>
</head>

<body>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-info rounded-circle" data-toggle="modal" id="open_book_form" data-target="#openBookForm">
        +
    </button>

    <!-- Modal -->
    <div class="modal fade" id="openBookForm" tabindex="-1" aria-labelledby="addBook" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addBook">Add a Book</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="#" id="add-book">

                        <!-- Book Name -->
                        <div class="form-group">
                            <label for="book_name" class="col-form-label">Book Name:</label>
                            <input type="text" id="book_name" value="" class="form-control rounded-0" required />
                        </div>

                        <!-- Book Genre -->
                        <div class="form-group">
                            <label for="book_genre" class="col-form-label">Book Genre:</label>
                            <input type="text" id="book_genre" value="" class="form-control rounded-0" required />
                        </div>

                        <!-- Book Rating -->
                        <div class="form-group">
                            <label for="book_genre" class="col-form-label">Book Rating:</label>
                            <input type="number" id="book_genre" value="" class="form-control rounded-0" min="0" max="5"
                                step="0.1" required />
                        </div>

                        <!-- Book Description -->
                        <div class="form-group">
                            <label for="book_description" class="col-form-label">Book Description:</label>
                            <textarea id="book_description" rows="3" class="form-control rounded-0" required value=""></textarea>
                        </div>

                        <!-- Image URL -->
                        <div class="form-group">
                            <label for="book_image_url" class="col-form-label">Image URL:</label>
                            <input type="url" class="form-control rounded-0" id="book_image_url" value=""
                                placeholder="https://www.example.com/" required />
                        </div>

                        <!-- Author -->
                        <div class="form-group">
                            <label for="book_author">Authors:</label>
                            <select class="custom-select rounded-0" id="book_author">
                                <option selected disabled>Select an Author</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-info rounded">Add Book</button>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery and JS bundle w/ Popper.js -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
        crossorigin="anonymous"></script>

</body>

</html>