import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
// import { observable } from 'mobx'
import { observer } from 'mobx-react'
import UserStore from '../../store/UserStore'

const SignIn = observer(() => {

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

    const handlerClick = (): void => {
        UserStore.login(inputLogin, inputPassword)
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
            <Button onClick={() => handlerClick()} variant="contained">Sign in</Button>
        </div>
    )
})

export default SignIn