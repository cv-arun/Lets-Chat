import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from '../pages/home';
import Chat from '../pages/Chat';
import axios from '../axios';
import io from "socket.io-client";



function ProtectedRoutes(props) {
    const socket = io.connect("http://localhost:5000")




    const navigate = useNavigate()
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('userKey'));
        axios.get('/isLogedIn', { headers: { 'x-access-token': token } }).then(user => {
            localStorage.setItem('user', JSON.stringify(user.data));
        }).catch(err => navigate('/login'))

        !token && navigate('/login');

        return  ()=>token && socket.emit('offline')
           
    }, [])

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('userKey'));
        token && socket.emit('online', token);
    },[socket])

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home socket={socket} />} />
                <Route exact path="/chat" element={<Chat socket={socket} />} />
            </Routes>
        </>
    )
}

export default ProtectedRoutes