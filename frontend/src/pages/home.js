import { Button } from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';


function Home({socket}) {
const navigate= useNavigate()
const Logout = () => {
  localStorage.removeItem('userKey'); navigate('/login');
  socket.emit('offline');
}

  return (
    <>
    <Button onClick={ Logout }>Logout</Button>
    <Button onClick={()=>{navigate('/chat')}}>Chat</Button>
    <div>home</div>
    </>
  )
}

export default Home