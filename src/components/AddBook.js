import React, { useState } from "react";
//import { graphql } from 'react-apollo';
//import {getBooksQuery} from "../queries/queries"
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/react-hooks";


const getAuthorsQuery = gql`
  {
    authors {
      _id
      name
    }
  }
`;
const addBookMutation = gql`
  mutation(
    $name: String!
    $genre: String!
    $rating: Float!
    $author: String!
    $description: String
    $image: String
  ) {
    addBook(
      name: $name
      genre: $genre
      rating: $rating
      author: $author
      description: $description
      image: $image
    ) {
      name
      description
      image
      rating
      author {
        name
      }
      genre
    }
  }
`;
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
function AuthorDisplay() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  if (loading) return <option disabled>Loading Authors...</option>;
  if (error) console.log(error);
  return data.authors.map((author) => {
    return (
      <option key={author._id} value={author.name}>
        {author.name}
      </option>
    );
  });

  //onSubmit={ SubmitForm.bind(this) }
  // onChange={ (e) => setBook({ name: e.target.value }) }
  // onChange={ (e) => setBook({ author: e.target.value }) }
}
function AddBook() {
  const [book, setBook] = useState({
    name: "",
    genre: "",
    author: "",
    rating: "",
    description: "",
    image: "",
  });

  let { name, genre, author, rating, description, image } = book;

  const [addBookMut, { dataMutation }] = useMutation(addBookMutation);

  const handleChange = (key) => (event) => {
    setBook({ ...book, [key]: event.target.value });
  };
console.log(book);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("mutation data", dataMutation);
    rating = Number(rating);
    addBookMut({
      variables: {
        name: name,
        genre: genre,
        author: author,
        rating: rating,
        description: description,
        image: image,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  // function SubmitForm(e) {
  //   e.preventDefault();
  //   console.log(book);
  //   // use the addBookMutation
  //   // props.addBookMutation({
  //   //     variables: {
  //   //         name: book.name,
  //   //         genre: book.genre,
  //   //         author: book.author
  //   //     },
  //   //     refetchQueries: [{ query: getBooksQuery }]
  //   // });
  // }
  return (
<>
<button type="button"  className="btn btn-info rounded-circle" data-toggle="modal" id="open_book_form" data-target="#openBookForm">
    +
</button>


<div className="modal fade" id="openBookForm" tabIndex="-1" aria-labelledby="addBook" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="addBook">Add a Book</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form action="#" id="add-book" >

                    <div className="form-group">
                        <label htmlFor="book_name" className="col-form-label">Book Name:</label>
                        <input type="text" id="book_name" onChange={handleChange("name")} value={name} className="form-control rounded-0" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="book_genre" className="col-form-label">Book Genre:</label>
                        <input type="text" id="book_genre" onChange={handleChange("genre")} value={genre} className="form-control rounded-0" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="book_genre" className="col-form-label">Book Rating:</label>
                        <input type="number" id="book_rating" onChange={handleChange("rating")} value={rating} className="form-control rounded-0" min="0" max="5"
                            step="0.1" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="book_description" className="col-form-label">Book Description:</label>
                        <textarea id="book_description" rows="3" className="form-control rounded-0" required onChange={handleChange("description")} value={description}></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="book_image_url" className="col-form-label">Image URL:</label>
                        <input type="url" className="form-control rounded-0" id="book_image_url" onChange={handleChange("image")} value={image}
                            placeholder="https://www.example.com/" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="book_author">Authors:</label>
                        <select className="custom-select rounded-0" onChange={handleChange("author")} value={author} id="book_author">
                            <option >Select an Author</option>
                            {AuthorDisplay()}
                        </select>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary rounded" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-info rounded" onClick={handleSubmit} data-dismiss="modal">Add Book</button>
            </div>
        </div>
    </div>
</div>

    {/* <div id="form-box">
      <form id="add-book" onSubmit={handleSubmit}>
        <div classNameName="field">
          <label>Book name:</label>
          <input type="text" onChange={handleChange("name")} value={name} />
        </div>
        <div classNameName="field">
          <label>Genre:</label>
          <input type="text" onChange={handleChange("genre")} value={genre} />
        </div>
        <div classNameName="field">
          <label>Rating:</label>
          <input type="text" onChange={handleChange("rating")} value={rating} />
        </div>
        <div classNameName="field">
          <label>Description:</label>
          <input
            type="text"
            onChange={handleChange("description")}
            value={description}
          />
        </div>
        <div classNameName="field">
          <label>Image Url:</label>
          <input type="text" onChange={handleChange("image")} value={image} />
        </div>
        <div classNameName="field">
          <label>Author:</label>
          <select onChange={handleChange("author")} value={author}>
            <option>Select author</option>
            {AuthorDisplay()}
          </select>
        </div>
        <button >+</button>
      </form>
    </div> */}
    </>
    // onClick={setBook({name:"",author:"",description:"",rating:"",genre:"",image:""})}
    // <div>
    // {AuthorDisplay()}
    // </div>
  );
}

export default AddBook;

// function AddBook(props) {
//     const [book, setBook] = useState({
//         name:"",
//         genre:"",
//         author:"",
//     })

//     function DisplayAuthors(){
//         var data = props.getAuthorsQuery;
//         if(data.loading){
//             return( <option disabled>Loading authors</option> );
//         } else {
//             console.log(">>>>>>>>>>>>>>>>"+data)
//             return data.authors.map(author => {
//                 return( <option key={ author.id } value={author.id}>{ author.name }</option> );
//             });
//         }
//     }

//         return(
//             <form id="add-book" onSubmit={ SubmitForm.bind(this) } >
//                 <div classNameName="field">
//                     <label>Book name:</label>
//                     <input type="text" onChange={ (e) => setBook({ name: e.target.value }) } />
//                 </div>
//                 <div classNameName="field">
//                     <label>Genre:</label>
//                     <input type="text" onChange={ (e) => setBook({ genre: e.target.value }) } />
//                 </div>
//                 <div classNameName="field">
//                     <label>Author:</label>
//                     <select onChange={ (e) => setBook({ author: e.target.value }) } >
//                         <option>Select author</option>
//                         { DisplayAuthors() }
//                     </select>
//                 </div>
//                 <button>+</button>
//             </form>
//         );
//     }
