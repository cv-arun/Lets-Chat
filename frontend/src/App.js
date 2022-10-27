import React from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoutes from './routes.js/protectedRoutes';
import UnprotectedRoutes from './routes.js/unprotectedRoutes';





function App() {
 
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_google_client_id}`}>
      <UnprotectedRoutes/>
      <ProtectedRoutes/>
    </GoogleOAuthProvider>
  );
}

export default App;
