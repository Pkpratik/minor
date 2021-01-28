import React,{useState} from "react";
//import { graphql } from 'react-apollo'
//import {getBooksQuery} from "../queries/queries"
import { gql, useQuery } from "@apollo/client";
// import BookDetail from "./BookDetails";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../App.css"





function BooksDisplay() {
  let refetchquery

  const [searchquery, setSearchquery] = useState({searchby:"books"})
  let {searchby}=searchquery
  console.log("searchquery = ",searchquery);
  console.log("searchby = ",searchby);
  function getBooksQuery(){
    if (searchby==="books") {
      return(gql`
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
    `)
    }if (searchby==="name" ){

      return(gql`
      query ($searchVal: String!) {
        name(name: $searchVal) {
          name
          description
          id
          rating
          genre
          image
          author {
            name
            
          }
        }
      }
    `)
    }if (searchby==="description"){

      return(gql`
      query ($searchVal: String!) {
        description(description: $searchVal) {
          name
          description
          rating
          id
          genre
          image
          author {
            name
            
          }
        }
      }
    `)
    }if (searchby==="genre" ){

      return(gql`
      query ($searchVal: String!) {
        genre(genre: $searchVal) {
          name
          description
          id
          rating
          genre
          image
          author {
            name
            
          }
        }
      }
    `)
  }if (searchby==="author" ){

    return(gql`
    query ($searchVal: String!) {
      authorbooks(author: $searchVal) {
        name
        description
        id
        rating
        genre
        image
        author {
          name
          
        }
      }
    }
  `)
  }if (searchby==="rating"){
    }if (searchby==="rating"){

      return(gql`
        {
        rating{
          name
          description
          id
          rating
          genre
          image
          author {
            name
            
          }
        }
      }
    `)
    }
}

  let finaldata;
  const [search, setSearch] = useState({searchVal:""})
  let {search:searchVal}=search
  const { loading, error, data } = useQuery(getBooksQuery(), {
    variables: { searchVal },
  });
  //const { loading1, error1, data1 } = useLazyQuery(getBooksByName,{variables:{searchVal}});
  
  //[getBookName,{data}]  = useLazyQuery(getBooksByName);
  // data  = useLazyQuery(getBooksQuery);
  console.log(data);
  console.log("refetchquery = ",refetchquery);
  //const { loading, error, data } = useLazyQuery(getBooksQuery);
  console.log(search,searchVal,typeof(searchVal));
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Ops! Something went wrong</p>;

  const handleChange = (key) => (event) => {
    setSearch({[key]: event.target.value });
  };
  const handleSearchBy = (key) => {
    //data = useQuery(getBooksByName)
    setSearchquery({searchby:key});
    refetchquery=1;
    if (key === "books"){
      setSearch("")
    }
  };

  if (searchby==="books"){
    finaldata=data.books
    refetchquery=0
    
  }
  if (searchby==="name"){
    finaldata=data.name
    refetchquery=0
  }
  if (searchby==="rating"){
    finaldata=data.rating
    refetchquery=0
  }
  if (searchby==="description"){
    finaldata=data.description
    refetchquery=0
  }
  if (searchby==="genre"){
    finaldata=data.genre
    refetchquery=0
  }
  if (searchby==="author"){
    finaldata=data.authorbooks
    refetchquery=0
  }

  //console.log("finaldata=",finaldata);
  return (
    <div>
      <div>
    <div className="container mt-5">
<div className="row">
    <div className="col-lg-8 col-md-8 col-sm-10 offset-lg-2 offset-md-2 offset-sm-1">
        <div className="input-group">
            <input type="text" value={searchVal} onChange={handleChange("search")} className="form-control" name="search_field" id="search_field"
                placeholder="Search Your Results...." />
                <div className="input-group-append">
                        <button className="btn px-3" onClick={()=>handleSearchBy("books")} id="clear_search_field">X</button>
                    </div>
        </div>
    </div>
</div>

<div className="row">
    <div className="col-lg-10 col-md-10 col-sm-10 offset-lg-1 offset-md-1 offset-sm-1 text-center">
        <button type="button" onClick={()=>{handleSearchBy("name")}} className="btn search_btn" id="by_book_name" >Search By Book Name</button>
        <button type="button" onClick={()=>{handleSearchBy("genre")}} className="btn search_btn" id="by_genre">Search by Genre</button>
        <button type="button" onClick={()=>{handleSearchBy("description")}} className="btn search_btn" id="by_description">Advance Search</button>
        <button type="button" onClick={()=>{handleSearchBy("author")}} className="btn search_btn" id="by_author">Search by Author</button>
        <button type="button" onClick={()=>{handleSearchBy("rating")}} className="btn search_btn" id="by_rating">Sort by Rating</button>
    </div>
</div>
</div>
</div>
      <div id="book-list">
        <div className="container-fluid my-5 books_section">
          <div className="row">
            {finaldata.map((book,index) => (
              <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mt-4" key={index}>
                <div className="card h-100">
                  <img src={book.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold text-secondary">
                      {book.name}
                    </h5>
                    <span className="card-text">
                      {book.description.slice(0,200)}
                      <div className="collapse m-0" id={"collapseExample"+index}>
                        <div className="card card-body border-0 p-0">
                          {book.description.slice(200,)}
                        </div>
                      </div>
                    </span>
                    <a
                      className="card-link d-block"
                      data-toggle="collapse"
                      href={"#collapseExample"+index}
                      role="button"
                      aria-expanded="false"
                      aria-controls={"collapseExample"+index}>
                      See More
                    </a>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Authors:
                      <span>
                        {book.author.map((author) => author.name).join(" ")}
                      </span>
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
            ))}
            
          </div>
        </div>
      </div>
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
