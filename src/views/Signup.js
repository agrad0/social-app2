import React from "react";
import axios from "axios";
import { useState } from 'react';
import { Link } from 'react-router-dom' 

function Signup () {
    
    // axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
    axios.defaults.headers.post["Content-Type"] = "application/json";
    const [isValid, setValid] = useState(false);
    const [loginlink, setLoginLink] = useState('');
    const [formData, setFormData] = useState('');
   
    const handleInputChange = event => {
    const target = event.target;
    const name = target.name;  
        setFormData({
        ...formData,
        [name]: target.value,
     })
    }
    
    const signUpSubmit = (e) => {
        e.preventDefault();

        if 
        (
        (formData.username.length >= 4) 
        && 
        (formData.email.length >= 0) 
        && 
        (formData.password.length >= 0) 
        && 
        (formData.confirmPassword.length >= 0)
        ) 
        {
            if (
            (/^[^\s]*$/.test(formData.username)) 
            &&
            (/^[^\s]*$/.test(formData.email)) 
            &&
            (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) 
            &&
            (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password)) 
            &&
            formData.password === formData.confirmPassword
            ) 
                {
                console.log("poprawne dane");
                setValid(true);
                setLoginLink("Rejestracja pomyślna. Przejdź do logowania");
                let newUser = JSON.stringify({
                    "username": formData.username,
                    "email": formData.email,
                    "password": formData.password 
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
        <input type="text" name="username" placeholder="username" onChange={handleInputChange} /><br></br>
        <input type="email" name="email" placeholder="e-mail" onChange={handleInputChange} /><br></br>
        <input type="text" name="password" placeholder="password" onChange={handleInputChange} /><br></br>
        <input type="text" name="confirmPassword" placeholder="confirm password" onChange={handleInputChange} /><br></br>
        <input type="submit" value="submit" disabled={isValid} />
    </form>
    <Link to='../login'> {loginlink} </Link>
    </>
)}


export default Signup;