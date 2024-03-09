import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



export function Login() {
    const navigate = useNavigate();
    function navv(e) {
        e.preventDefault();
        navigate("/home");
    }
    return (
        <>
            <h1>Hello from Login</h1>
            <Button variant="outlined" onClick={navv}>Home</Button>
        </>
    )
}