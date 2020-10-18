import React, { Component } from 'react';
import { ApolloClient,InMemoryCache, ApolloLink } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error'
// components
import AddBook from './components/AddBook';
import BookList from './components/BookList';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})



// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    link: ApolloLink.from([errorLink]),
    cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>Ninja's Reading List</h1>
                <BookList />
                <AddBook />
            </div>
        </ ApolloProvider>
    );
  }
}

export default App;
