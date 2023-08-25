import { useState } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from './components/Nav';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePost from './pages/CreatePost';
import { onError } from '@apollo/client/link/error'
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadWidget from './components/UploadWidget'
import './App.css'

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  if (networkError) console.error(`[Network error]: ${JSON.stringify(networkError, null, 2)})`)
})

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  // link: authLink.concat(httpLink),
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  
});



function App() {


  return (
    <ApolloProvider client={client}>
      <Router>

        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/CreatePost" element={<CreatePost />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>


  )
}

export default App
