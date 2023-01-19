import React from "react";
import axios from "axios";
import { useState } from 'react';
import { Link } from 'react-router-dom' 

function Signup () {
    
    // axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
    axios.defaults.headers.post["Content-Type"] = "application/json";
    const [isValid, setValid] = useState(false);
    let [loginlink, setLoginLink] = useState('');

    const signUpSubmit = (e) => {
        e.preventDefault();
        const target = e.target;
        const username = target.username.value;
        const email = target.email.value;
        const password = target.password.value;
        const confirmPassword = target.confirmPassword.value;

        if 
        (
        (username.length >= 4) 
        && 
        (email.length >= 0) 
        && 
        (password.length >= 0) 
        && 
        (confirmPassword.length >= 0)
        ) 
        {
            if (
            (/^[^\s]*$/.test(username)) 
            &&
            (/^[^\s]*$/.test(email)) 
            &&
            (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) 
            &&
            (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) 
            &&
            password === confirmPassword
            ) 
                {
                console.log("poprawne dane");
                setValid(true);
                setLoginLink("Rejestracja pomyślna. Przejdź do logowania");
                let newUser = JSON.stringify({
                    "username": username,
                    "email": email,
                    "password": password 
                })
                axios
                .post("http://akademia108.pl/api/social-app/user/signup", newUser)
                .then((req) => {
                    console.log(req.data);
                })
                .catch((error) => {
                    console.error(error);
                })}

            else {
                console.log("błędne dane")
            }
        }   
        else {
            console.log("błędne dane")
        }
    }
    


    return (
    <>
    <h1>Sign up</h1>
    <form onSubmit={signUpSubmit}>
        <input type="text" name="username" placeholder="username" /><br></br>
        <input type="email" name="email" placeholder="e-mail" /><br></br>
        <input type="text" name="password" placeholder="password" /><br></br>
        <input type="text" name="confirmPassword" placeholder="confirm password" /><br></br>
        <input type="submit" value="submit" disabled={isValid} />
    </form>
    <Link to='../login'> {loginlink} </Link>
    </>
)}


export default Signup;