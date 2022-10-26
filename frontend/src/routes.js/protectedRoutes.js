import React,{useEffect} from 'react'
import { Routes, Route,useNavigate } from "react-router-dom";

import Home from '../pages/home';
import Chat from '../pages/Chat';


function ProtectedRoutes(props) {
    const navigate=useNavigate()
    useEffect(()=>{
        let token=localStorage.getItem('userKey');
        !token && navigate('/login');
    },[])

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/chat" element={<Chat socket={props.socket} />} />
            </Routes>
        </>
    )
}

export default ProtectedRoutes