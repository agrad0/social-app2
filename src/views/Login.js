import { useState, useContext } from 'react';
import { LoginContext } from '../App';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import React from 'react';
import '../App';


function Login () {
  
  const {userData, setUserData} = useContext(LoginContext);
  const [formData, setFormData] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      let user;
      const loginData = (JSON.stringify({"username": formData.user, "password": formData.password}));
      axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios.post('https://akademia108.pl/api/social-app/user/login', loginData)
        .then( (response) => {
          if (!response.data.error) {
          console.log(response.data)
          setLoginMessage("Zalogowano poprawnie, nastąpi przekierowanie na stronę główną.");
          setTimeout(() => {
            navigate("/");
            localStorage.setItem('userData', JSON.stringify(response.data));
            setUserData(localStorage.getItem('userData'));
          }, 2000)
          }
          else {
            setLoginMessage("Niepoprawne logowanie, sprawdź dane lub skontaktuj się z działem technicznym")
          }
        })
        .catch( (error) => {
          console.log(error);
        });
  }

  const handleInputChange = event => {

    const target = event.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    })
  
  };

    return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="login">Login</label>
            <input type="text" name="user" onChange={handleInputChange} />
            <label htmlFor="password">Hasło</label>
            <input type="text" name="password" onChange={handleInputChange} />
            <input type="submit" value="submit" />
        </form>
        <h1>{loginMessage}</h1>
    </>
)}
    



export default Login