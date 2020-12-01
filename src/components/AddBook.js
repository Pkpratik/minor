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
  console.log(data);
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
    <div id="form-box">
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={handleChange("name")} value={name} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={handleChange("genre")} value={genre} />
        </div>
        <div className="field">
          <label>Rating:</label>
          <input type="text" onChange={handleChange("rating")} value={rating} />
        </div>
        <div className="field">
          <label>Description:</label>
          <input
            type="text"
            onChange={handleChange("description")}
            value={description}
          />
        </div>
        <div className="field">
          <label>Image Url:</label>
          <input type="text" onChange={handleChange("image")} value={image} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={handleChange("author")} value={author}>
            <option>Select author</option>
            {AuthorDisplay()}
          </select>
        </div>
        <button >+</button>
      </form>
    </div>
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
//                 <div className="field">
//                     <label>Book name:</label>
//                     <input type="text" onChange={ (e) => setBook({ name: e.target.value }) } />
//                 </div>
//                 <div className="field">
//                     <label>Genre:</label>
//                     <input type="text" onChange={ (e) => setBook({ genre: e.target.value }) } />
//                 </div>
//                 <div className="field">
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
