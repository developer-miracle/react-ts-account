import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function SignUp() {
    return (
        <div>
            <h2>SignUp</h2>
            <div className="container">
                <TextField id="outlined-basic" label="login" variant="outlined" />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
            </div>
            <Button variant="contained">Sign up</Button>
        </div>
    )
}

