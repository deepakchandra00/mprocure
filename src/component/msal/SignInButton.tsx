import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config/authConfig";
import { Button } from '@mui/material';
import { loadingError } from "../utils/utils";
import React from "react";


/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();
    const [snack, setSnack] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [error, setError] = React.useState("");
    const handleLogin = (loginType: string) => {
        if (loginType === "popup") {
            instance.loginRedirect(loginRequest).catch(e => {
                setStatus("failed")
                setError(e)
                console.log(e)
            });
        }
    }
    return (
        <>
            {loadingError(status, error, setSnack)}
            <Button variant="contained" className="ml-auto btnColor" onClick={() => handleLogin("popup")}>Sign in </Button>
        </>
    );
}