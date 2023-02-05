import React from "react";
import axios from "axios";
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

function Signup () {
    
    // axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
    // axios.defaults.headers.post["Content-Type"] = "application/json";
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginlink, setLoginLink] = useState('');
    const [isValid, setValid] = useState(null);
    const [formData, setFormData] = useState('');
    const [formErrors, setFormErrors] = useState({
        usernameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    });
    
    const handleInputChange = event => {
    const target = event.target;
    const name = target.name;  
        setFormData({
        ...formData,
        [name]: target.value,
     })
    }
    
    function signUpSubmit (e) {
        e.preventDefault();
        
        console.log(formData);
        
        console.log(!(/\d/.test(formData.password)), !(formData.password.length >= 6), !(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password)));

        if (
            (!(formData.username.length >=4) )
            || 
            (!(/^[^\s]*$/.test(formData.username)))) {
                setFormErrors(formErrors.usernameError = 'Pole username nie może być puste, min. 4 znaki, nie może zawierać białych znaków')
                    console.log(formErrors)
            }
        else {
            setFormErrors(formErrors.usernameError = '')
        }

        // if 
        // (
        //     (formData.email = '') 
        //     ||
        //     (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)))
        //     || 
        //     (!(/^[^\s]*$/.test(formData.email)))) {
        //         setFormErrors(formErrors.emailError = 'Pole email nie może być puste, nie może zawierać białych znaków, musi to być poprawny adres email');
        //         console.log(formErrors)
        // }
        // else {
        //     setFormErrors(formErrors.emailError = '')
        // }
        // if
        // ( 
        //     (formData.password = '') 
        //     // ||
        //     // (!(/\d/.test(formData.password)))
        //     ||
        //     (!(formData.password.length >= 6))
        //     // ||
        //     // !(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password))
        //     ) {
        //         setFormErrors(formErrors.passwordError = 'Pole password nie może być puste, min. 6 znaków, musi zawierać co najmniej 1 cyfrę, musi zawierać co najmniej jeden specjalny znak z następujących: ! # @ $ %');
        //         console.log(formErrors)
        // }
        // else {
        //     setFormErrors(formErrors.passwordError = '')
        // }

        // if (
        // (formData.confirmPassword = '')
        // ||
        // (!(formData.password === formData.confirmPassword))) {
        //     setFormErrors(formErrors.confirmPasswordError = 'Pole confirm-password musi być identyczne jak pole password')
        // }
        // else {
        //     setFormErrors(formErrors.confirmPasswordError = '')
        // }

    //    tu chciałem zmienić stan setValidem na IsValid = przepustka dla axiosa do wysłania .post


        if (isValid) {

            let newUser = JSON.stringify({
                "username": formData.username,
                "email": formData.email,
                "password": formData.password 
            })
            axios
            .post("http://akademia108.pl/api/social-app/user/signup", newUser)
            .then((req) => {
                console.log(req);
                if (req.statusText === "Created") {
                    setLoggedIn(true);
                    setLoginLink("Rejestracja pomyślna. Przejdź do logowania");
                    }
                else {
                    setLoginLink(req.message)
                    }
                })
                .catch((error) => {
                    console.error(error);
                    })
        }
    }
    

    return (
    <>
    <h1>Sign up</h1>
    <form onSubmit={signUpSubmit}>
        <input type="text" name="username" placeholder="username" onChange={handleInputChange} /><br></br>
        <span>{formErrors.usernameError}</span><br></br>
        <input type="email" name="email" placeholder="e-mail" onChange={handleInputChange} /><br></br>
        <span>{formErrors.emailError}</span><br></br>
        <input type="password" name="password" placeholder="password" onChange={handleInputChange} /><br></br>
        <span>{formErrors.passwordError}</span><br></br>
        <input type="password" name="confirmPassword" placeholder="confirm password" onChange={handleInputChange} /><br></br>
        <span>{formErrors.passwordError}</span><br></br>
        <input type="submit" value="submit" disabled={loggedIn} />
    </form>
    <Link to='../login'> {loginlink} </Link>
    </>
)}


export default Signup;