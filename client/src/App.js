import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//main graphql endpoint-is object
const httpLink = createHttpLink({
  uri: './graphql',
});
// construct middleware to create token for request as a header
// sets token to local storage
// returns context so httpLink can read
const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('id_token');
    return {
      header: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
});
// sets up new Apollo Client to execute authLink middleware before making request to graphql server
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
  <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<SearchBooks />} 
          />
          <Route 
            path='/saved' 
            element={<SavedBooks />} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
  </ApolloProvider>
  );
}

export default App;
