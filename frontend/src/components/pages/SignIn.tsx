import { Box, Button, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
// import { observable } from 'mobx'
import { observer } from 'mobx-react'
import UserStore from '../../store/UserStore'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { display } from "@mui/system";


interface State {
    userName: string;
    password: string;
    showPassword: boolean;
}

const styleBox = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    height: '300px',
    width: '300px',
    justifyContent: 'space-around',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,.2)',
    borderRadius: '10px'
}

const SignIn = observer(() => {

    const [values, setValues] = React.useState<State>({
        userName: '',
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    // const handleInputLogin = function (element: React.FormEvent<HTMLDivElement>): void {
    //     const value = element.target as HTMLInputElement
    //     setInputLogin(value.value)
    // }

    // const handleInputPassword = function (element: React.FormEvent<HTMLDivElement>): void {
    //     const value = element.target as HTMLInputElement
    //     setInputPassword(value.value)
    // }

    const handleClick = (): void => {
        UserStore.login(values.userName, values.password)
    }


    return (
        <Container maxWidth="sm" sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center'
        }}>
            <Box sx={styleBox}>
                <Typography variant="h4" component="div">
                    SignIn
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <TextField
                        label="Login"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        onChange={handleChange('userName')}
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Box>
                <Box sx={{
                    display: 'flex',
                    // justifyContent: 'center',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    height: '60px'
                }}>
                    <Button sx={{ m: 1, width: '25ch' }} onClick={() => handleClick()} color="success" variant="contained">Sign in</Button>

                </Box>
            </Box>
        </Container >
    )
})

export default SignIn