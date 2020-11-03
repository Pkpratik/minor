import React, { Component } from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Readers corner</h1>
          <BookList />
        <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
