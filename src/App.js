import React, { Component } from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Search from "./components/Search";

// components

// apollo client setup
const client = new ApolloClient({
  uri: "https://readers-corner-backend.herokuapp.com/graphql/",
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Readers corner</h1>
          <Search />
          <BookList />
        <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
