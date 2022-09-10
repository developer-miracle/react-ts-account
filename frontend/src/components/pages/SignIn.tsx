import { Button, TextField } from "@mui/material";
import React, { useState } from "react";




export default function SignIn() {

    const [inputLogin, setInputLogin] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const handlerInputLogin = function (element: React.FormEvent<HTMLDivElement>): void {
        const value = element.target as HTMLInputElement
        setInputLogin(value.value)
    }

    const handlerInputPassword = function (element: React.FormEvent<HTMLDivElement>): void {
        const value = element.target as HTMLInputElement
        setInputPassword(value.value)
    }

    const handlerClick = function (callback: (data: templateResponse) => void): void {

    }

    const callbackCheckPassword = (data: templateResponse): void => {
        if (data.password === inputPassword) {
            console.log('log in')

        } else {
            console.log('incorrect password')
        }

    }

    return (
        <div>
            <h2>SignIn</h2>
            <div className="container">
                <TextField id="outlined-basic" label="login" variant="outlined"
                    onInput={element => handlerInputLogin(element)}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onInput={element => handlerInputPassword(element)}
                />
            </div>
            <Button onClick={() => handlerClick(callbackCheckPassword)} variant="contained">Sign in</Button>
        </div>
    )
}