import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';



export function Login() {
    const navigate = useNavigate();
    // const [maxDistance, setmaxDistance] = useState(69);
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