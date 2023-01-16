import { useState, useEffect } from 'react';
import axios from "axios";

// 

function Login () {
    
    const [user, setUser] = useState();

    
    const handleSubmit = (element) => {
        console.log(element)
        axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
        axios.post('https://akademia108.pl/api/social-app/user/login', element)
          .then( (res) => {
            console.log(res);
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

    useEffect(() => 
        localStorage.setItem('username', [user])
    , [user]);

    


    return (
    <>
        <h1>Login</h1>
        
        <form onSubmit={handleInputChange}>
            <label for="login">Login</label>
            <input type="text" name="user"  />
            <label for="password">Hasło</label>
            <input type="text" name="password" />
            <input type="submit" value="Submit" />
        </form>
    </>
)}


export default Login