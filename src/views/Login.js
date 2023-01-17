import { useEffect, useState } from 'react';
import axios from "axios";
import React from 'react';

// 

function Login () {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
    axios.defaults.headers.post["Content-Type"] = "application/json";

    
    const handleSubmit = (element) => {
        console.log(element)
        // axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
        // axios.defaults.headers.post["Content-Type"] = "application/json";
        axios.post('https://akademia108.pl/api/social-app/user/login', element)
          .then( (response) => {
            console.log(response.data.error);
          })
          .catch( (error) => {
            console.log(error);
          });
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const target = e.target;
        const userName = target.user.value;
        const password = target.password.value;
        const loginPackage = JSON.stringify({username: userName, password: password})
        handleSubmit(loginPackage);
        // console.log([userName], [password])
        console.log(loginPackage)
    }

    // useEffect(() => 
    //     localStorage.setItem('username', [user])
    // , [user]);

    


    return (
    <>
        <h1>Login</h1>
        
        <form onSubmit={handleInputChange}>
            <label htmlFor="login">Login</label>
            <input type="text" name="user"  />
            <label htmlFor="password">Hasło</label>
            <input type="text" name="password" />
            <input type="submit" value="submit" />
        </form>
    </>
)}


export default Login