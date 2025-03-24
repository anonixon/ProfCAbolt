import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Router } from './router';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Router />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App; 