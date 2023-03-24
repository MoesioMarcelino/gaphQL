import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ErrorBoundary } from './ErrorBoundary'
import { AppProvider } from './hooks'
import { App } from './App'
import './index.scss'

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <AppProvider>
          <App />
        </AppProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
