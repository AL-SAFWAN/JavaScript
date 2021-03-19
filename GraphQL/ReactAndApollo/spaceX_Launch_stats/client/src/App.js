import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Launches from './components/Launches'
import { ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <h1> SpaceX</h1>
      <Launches/>
    </div></ApolloProvider>
  );
}

export default App;
