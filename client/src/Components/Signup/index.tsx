import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import {userSignup} from '../../../api-request/signup'

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobilenumber, setMobilenumber] = useState("")
    const [enterpassword, setEnterpassword] = useState("")
    const [conformpassword, setConformpassword] = useState("")
    const [age, setAge] = React.useState('');
    const onChangeUsername = (event: any) => {
        setName(event.target.value)
    }
    const onChangeUseremail = (event: any) => {
        setEmail(event.target.value)
    }
    const onChangeUsermobilenumber = (event: any) => {
        setMobilenumber(event.target.value)
    }
    const onChangeUserenterpassword = (event: any) => {
        setEnterpassword(event.target.value)
    }
    const onChangeUserconformpassword = (event: any) => {
        setConformpassword(event.target.value)
    }

    const onChangeUserhandleChange = (event: any) => {
        setAge(event.target.value);
    };

    const onClickSignUp = async() => {
        const data = {
            user_name: name,
            email: email,
            phone: mobilenumber,
            password: enterpassword,
            primary_profile: 1
           
        }
        const response = await userSignup(data)
        console.log(data)
    }

    return (
        <Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '75ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Enter name" variant="outlined" value={name} onChange={onChangeUsername} />
                <TextField id="outlined-basic" label="Email" type="email" value={email} variant="outlined" onChange={onChangeUseremail} />
                <TextField id="outlined-basic" label="Mobile Number" type="number" value={mobilenumber} variant="outlined" onChange={onChangeUsermobilenumber} />
                <TextField id="outlined-password-input" label="Enter password" value={enterpassword} type="password" autoComplete="current-password" onChange={onChangeUserenterpassword} />
                <TextField id="outlined-password-input" label="Conform password" value={conformpassword} type="password" autoComplete="current-password" onChange={onChangeUserconformpassword} />
            </Box>
            <FormControl sx={{ m: 2, width: '75ch' }} size="small">
                <InputLabel id="demo-select-small">Select</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="age"
                    value={age}
                    onChange={onChangeUserhandleChange}
                >

                    <MenuItem value={10}>Journal Editor</MenuItem>
                    <MenuItem value={20}>Thought leader</MenuItem>
                </Select>
            </FormControl>
            <br />
            <Box>
            <Button variant="contained" sx={{mx:1}} onClick={onClickSignUp}>Sign up</Button>
            <a href='/login'>
                <Button variant="contained" color="primary">
                    Login
                </Button>
            </a>
            </Box>
        </Box>
    )
}
export default Signup