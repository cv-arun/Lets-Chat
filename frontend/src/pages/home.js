import { Button } from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';


function Home() {
const navigate= useNavigate()
  return (
    <>
    <Button onClick={()=>{ localStorage.removeItem('userKey'); navigate('/login')}}>Logout</Button>
    <Button onClick={()=>{navigate('/chat')}}>Chat</Button>
    <div>home </div>
    </>
  )
}

export default Home