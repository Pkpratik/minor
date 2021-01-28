import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react'

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;


// components

// apollo client setup
const client = new ApolloClient({
    uri: 'https://readers-corner-backend.herokuapp.com/graphql'
});


ReactDOM.render(
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
        <ApolloProvider client={client}> 
            <App /> 
        </ApolloProvider>
    </Auth0Provider>, 
    document.getElementById('root')
);


