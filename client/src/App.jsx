import { React , useState } from 'react'
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import { onError } from '@apollo/client/link/error'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { getTokenFromLocalStorage } from './utils/authUtils';
import AuthService from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
  headers: {
    Authorization: `Bearer ${AuthService.getToken()}`,
  },
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
  const token = getTokenFromLocalStorage();
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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  
});


function App() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <ApolloProvider client={client}>
          <Header />
          <div className={darkMode ? 'dark-mode' : 'light-mode'}>
          <div className='switch-checkbox'>
          <label className='switch'>
            <input type='checkbox'
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className='slider round'></span>
          </label>
          </div>
          <Outlet />
        </div>
    </ApolloProvider>
  );
}

export default App
