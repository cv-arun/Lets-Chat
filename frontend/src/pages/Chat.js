import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import axios from '../axios';





function Chat({ socket }) {

  const navigate = useNavigate()
  const Logout = () => {
    localStorage.removeItem('userKey'); navigate('/login');
    socket.emit('offline')
  }
  const [user, setUser] = useState([]);
  const [myid, setMyid] = useState('')
  const [friend, setFriend] = useState({})
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState('');

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userKey'))
    axios.get('/getUsers', { headers: { 'x-access-token': token } }).then((response) => {

      setMyid(response.data.myid)
      setUser(response.data.users)
    })
  }, [])

  const joinChat = (toid) => {
    const token = JSON.parse(localStorage.getItem('userKey'))
    axios.post('/getChat', { toid }, { headers: { 'x-access-token': token } }).then((response) => {
      setFriend(response.data.friend);
      socket.emit("join_room", response.data.data._id);
      setRoom(response.data.data._id);
      setMessageList(response.data.data.messages)
    })
  }

  const sendMessage = async () => {
    console.log(socket, "socket on sending")
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: myid,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [messageData, ...list]);
      console.log(messageData)
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [data, ...list]);
      console.log(data)
    })
    return () => {
      socket.off('receive_message');

    };
  }, [socket]);

  return (
    <>
      <Box sx={{ backgroundColor: 'grey', height: '100vh', display: 'flex', justifyContent: 'space-evenly' }}>
        {/* right part */}
        <Stack direction="column" sx={{ width: `${friend.first_name ? '20vw' : '40vw'}`, height: '90vh', marginTop: '5vh', backgroundColor: 'white', borderRadius: 3, msOverflowStyle: 'none' }}>
          <Stack sx={{ justifyContent: 'space-between', overflowX: 'scroll' }} direction='row'>
            <Typography variant='h4' sx={{ marginTop: 2, marginLeft: 2 }}>Chats</Typography>
            <Button sx={{ marginTop: 2 }} onClick={Logout}>Logout</Button>
          </Stack>
          <TextField
            label="Search"
            variant="standard"
            sx={{ mx: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Stack direction='column' spacing={2} sx={{ marginTop: 2 }}>
            {user.map((curr) => {
              return <Box onClick={() => { joinChat(curr._id) }} sx={{ backgroundColor: 'whitesmoke', height: 70, display: 'flex' }}>
                <img style={{ height: '100%', borderRadius: '50px', width: '' }} src={`${curr.picture}`} alt='profile ' />
                <Stack direction='column'>
                <Typography variant='h6' sx={{ margin: 2, overflowX: 'hidden' }}>{curr.first_name}</Typography>
                </Stack>
              </Box>

            })}

          </Stack>
        </Stack>


        {/* left part */}
        {friend && friend.first_name && <Stack direction='column' sx={{ width: '70vw', height: '90vh', marginTop: '5vh', backgroundColor: 'white', borderRadius: 3, justifyContent: 'space-between' }}>
          <Box sx={{ backgroundColor: 'whitesmoke', height: 70, display: 'flex' }}>
            <img style={{ height: '100%', borderRadius: 3, width: '' }} src={`${friend.picture ? friend.picture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&usqp=CAU'}`} alt='profile ' />
           <Stack direction='column'>
           <Typography variant='h6' sx={{ marginLeft:2, overflowX: 'hidden' }}>{friend && friend.first_name}</Typography>
           <Typography variant='body2' sx={{marginLeft:2, overflowX: 'hidden' }}>{ friend && friend.isOnline ?'online':`last active ${friend.updatedAt}`}</Typography>
           </Stack>
          </Box>
          <Stack direction='column-reverse' sx={{ backgroundColor: 'whitesmoke', height: '80%', overflowY: 'scroll' }}>
            {messageList.map((curr) => {
              return <Stack sx={{ backgroundColor: 'white', maxWidth: '50%', margin: 2, padding: 2, alignSelf: `${curr.author === myid ? 'flex-end' : 'flex-start'}` }}>
                <Typography variant='body2' sx={{ overflowX: 'hidden', fontSize: '12px' }}>{curr.author}</Typography>
                <Typography variant='body2' sx={{ overflowX: 'hidden', fontSize: '18px' }}>{curr.message}</Typography>
                <Typography variant='body2' sx={{ overflowX: 'hidden', fontSize: '10px' }}>{curr.time}</Typography>
              </Stack>
            })}
          </Stack>
          <Stack direction='row'>
            <TextField value={currentMessage} onChange={(e) => { setCurrentMessage(e.target.value) }} onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }} fullWidth sx={{ borderBlockStyle: 'none' }} placeholder='type something...' id="fullWidth" />
            <Button>Send</Button>
          </Stack>

        </Stack>}
      </Box>
    </>
  )
}

export default Chat