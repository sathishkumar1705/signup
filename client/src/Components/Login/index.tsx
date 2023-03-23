import {  Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import * as React from 'react';
import { userLogin } from "../../../api-request/login" 
import Cookies from "js-cookie";

function Login() {
    const [emailPhonenumber, setEmailphonenumber] = useState("")
    const [info, setInfo] = useState('');
    const [errorinfo, setErrorInfo] = useState(false);
    const onChangeUseremailphonenumber = (event: any) => {
        setEmailphonenumber(event.target.value)
    }
    const onChangeInfo = (e: any) =>{ 
        if (e.target.value.length > 1 || e.target.value.length < 2) {
            setErrorInfo(true)
        }
        if (e.target.value.length > 2) {
            setErrorInfo(false)
        }
        if (e.target.value.length === 0) {
            setErrorInfo(false)
        }
        setInfo(e.target.value)
    }
    const onClickLogin = async() => {
        const data = {
            email: emailPhonenumber,
            password: info
        }
        const response = await userLogin(data)
        Cookies.set("jwt_token", response.token)
        console.log(response)    
    }

    return (
        <Box>
            <Box component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '75ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField id="outlined-error" name="emailPhonenumber" label="Email or phonenumber" variant="outlined" value={emailPhonenumber} onChange={onChangeUseremailphonenumber} />
                <TextField 
                    id="outlined-basic" 
                    label="Enter password" 
                    type ="password" 
                    variant="outlined" 
                    value={info} 
                    onChange = {onChangeInfo}
                    helperText={errorinfo ? "Password should not be empty": null}
                    error={errorinfo}
      />
            </Box>
            <Box>
                <Button variant="contained" sx={{ mx: 1, my: 1 }} onClick={onClickLogin}>Login</Button><br />
                <a href="/" onClick={onClickLogin}>Forget password</a>
            </Box>
        </Box>
    )
}
export default Login

