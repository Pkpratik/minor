import React, { Component } from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import "./App.css"

//import Search from "./components/Search";

// components

// apollo client setup
const client = new ApolloClient({
uri: process.env.NODE_ENV === 'development' ? `http://localhost:4000` : `https://readers-corner-backend.herokuapp.com/graphql`,
});

class App extends Component {
  render() {
    
    
    return (
      <ApolloProvider client={client}>
        <div id="main">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p className="navbar-brand" >Readers Corner - The Books Store</p>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <Profile/>
                <li className="nav-item mr-2">
                <LoginButton />
                    
                </li>
                <li className="nav-item">
                    <LogoutButton/>
                    
                </li>

            </ul>
        </div>
    </nav>
          
          
          
          <BookList />
        <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
