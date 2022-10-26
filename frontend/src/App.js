import React from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoutes from './routes.js/protectedRoutes';
import UnprotectedRoutes from './routes.js/unprotectedRoutes';
import io from "socket.io-client";



const socket = io.connect("http://localhost:5000",{query:'loggeduser=user1'});


function App() {
 
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_google_client_id}`}>
      <ProtectedRoutes socket={socket}/>
      <UnprotectedRoutes/>
    </GoogleOAuthProvider>
  );
}

export default App;
