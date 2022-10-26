import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

import { FormLabel } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useHandleForm from '../costomHooks/usehandleForm';
import axios from '../axios';
import { Link, useNavigate } from 'react-router-dom'







function Signup() {
    const [data, setData, clearData] = useHandleForm({})
    const [day, setDay] = useState('mm/dd/yyyy');
    const [msg, setMsg] = useState('')

    const navigate = useNavigate()

    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        marginTop: 5
    }

    const handleSubmit = () => {
        data.dob = day
        console.log(data)
        axios.post('/signup', data).then(response => {
            console.log(response.data)
            response.data.msg ? setMsg(response.data.msg) : response.data.userId && navigate('/login');


        })
    }
    const setDOB = (e) => {
        setDay(`${e.$M + 1}/${e.$D}/${e.$y}`)
    }
    useEffect(() => {
        return clearData()
    }, [])

    return (
        <Box sx={{
            backgroundColor: 'whitesmoke',
            padding: 1,
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 5,
            boxShadow: 5,
            borderRadius: 1
        }}>
            <Box sx={{ typography: 'subtitle2', fontSize: 30, textAlign: 'center' }}>Signup</Box>
            <Box sx={{ typography: 'body2', fontSize: 15, textAlign: 'center', color: 'red' }}>{msg}</Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }} >
                <FormControl onSubmit={handleSubmit} >
                    <Box sx={style}>
                        <TextField
                            label="Email"
                            variant="filled"
                            type="email"
                            required
                            value={data.email}
                            name='email'
                            onChange={(e) => { setData(e) }}
                        />
                        <TextField
                            label="First name"
                            variant="filled"
                            type="text"
                            required
                            value={data.fname}
                            name='fname'
                            sx={{ marginTop: 2 }}
                            onChange={(e) => { setData(e) }}
                        />
                        <TextField
                            label="Last name"
                            variant="filled"
                            type="text"
                            required
                            value={data.lname}
                            name='lname'
                            sx={{ marginTop: 2 }}
                            onChange={(e) => { setData(e) }}
                        />
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            name="gender"
                            onChange={(e) => { setData(e) }}
                        >
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                border: 'solid white',
                                marginBottom: 2
                            }}>
                                <FormControlLabel value="male" control={<Radio />} label="male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="costom" control={<Radio />} label="Costom" />
                            </Box>
                        </RadioGroup>


                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date of birth"
                                inputFormat="MM/DD/YYYY"
                                value={day}
                                onChange={setDOB}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <TextField
                            label="Password"
                            variant="filled"
                            type="password"
                            required
                            value={data.password}
                            name='password'
                            sx={{ marginTop: 2 }}
                            onChange={(e) => { setData(e) }}
                        />
                        <div>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', m: 3 }}>
                                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                                    Signup
                                </Button>
                            </Box>
                        </div>
                        <Box sx={{ typography: 'body', fontSize: 15, textAlign: 'center' }}>Already have an account?</Box>
                        <Link style={{ textAlign: 'center' }} to='/login'>Login</Link>


                    </Box>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Signup

