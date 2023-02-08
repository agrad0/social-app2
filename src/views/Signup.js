import React from "react";
import axios from "axios";
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginlink, setLoginLink] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
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

    function signUpSubmit(e) {
        e.preventDefault();
        let allFields = false;
        // Object.values(formData).forEach(element => {
        //     if (element === '') {
        //     console.log('pusty')}
        //     else {
        //     allFields = true;
        //     }
        // })   


        if
            (
            (!(formData.username.length >= 4))
            ||
            (!(/^[^\s]*$/.test(formData.username)))) {
            allFields = true;
            console.log('błąd');
            setFormErrors({
                ...formErrors,
                usernameError: 'Pole username nie może być puste, min. 4 znaki, nie może zawierać białych znaków'
            })
        }
        else {
            console.log('błąd else')
            setFormErrors({
                ...formErrors,
                usernameError: ''
            })
        }
        console.log(formErrors.usernameError)

        if
            (
            !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email))
            ||
            !(/^[^\s]*$/.test(formData.email))) {
                allFields = true;
                setFormErrors({
                    ...formErrors,
                    emailError: 'Pole email nie może być puste, nie może zawierać białych znaków, musi to być poprawny adres email'});
        }
        else {
            setFormErrors({
                ...formErrors,
                    emailError: ''});
        }
        if
            (
            (!(/\d/.test(formData.password)))
            ||
            (!(formData.password.length >= 6))
            ||
            !(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password))
        ) {
            allFields = true;
            setFormErrors({
                ...formErrors,
                passwordError: 'Pole password nie może być puste, min. 6 znaków, musi zawierać co najmniej 1 cyfrę, musi zawierać co najmniej jeden specjalny znak z następujących: ! # @ $ %'});
        }
        else {
            setFormErrors({
                ...formErrors,
                passwordError: ''})
        }

        if (
            (!(formData.password === formData.confirmPassword))) {
                allFields = true;
                setFormErrors({
                ...formErrors,
                confirmPasswordError: 'Pole confirm-password musi być identyczne jak pole password'})
        }
        else {
            setFormErrors({
                ...formErrors,
                confirmPasswordError:''})
        }

        if (allFields === false) {
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
                <input type="text" name="username" placeholder="username" onChange={handleInputChange} disabled={loggedIn} /><br></br>
                <span>{formErrors.usernameError}</span><br></br>
                <input type="email" name="email" placeholder="e-mail" onChange={handleInputChange} disabled={loggedIn} /><br></br>
                <span>{formErrors.emailError}</span><br></br>
                <input type="password" name="password" placeholder="password" onChange={handleInputChange} disabled={loggedIn} /><br></br>
                <span>{formErrors.passwordError}</span><br></br>
                <input type="password" name="confirmPassword" placeholder="confirm password" onChange={handleInputChange} disabled={loggedIn} /><br></br>
                <span>{formErrors.passwordError}</span><br></br>
                <input type="submit" value="submit" disabled={loggedIn} />
            </form>
            <Link to='../login'> {loginlink} </Link>
        </>
    )
}


export default Signup;