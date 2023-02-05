import { useState, useContext } from 'react';
import { LoginContext } from '../App';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import React from 'react';
import '../App';

function LoginForm () {
  
    const {userData, setUserData} = useContext(LoginContext);
    const [formData, setFormData] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();
  
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = JSON.stringify({"username": formData.user, "password": formData.password});
        axios.post('https://akademia108.pl/api/social-app/user/login', loginData)
          .then( (response) => {
            if (!response.data.error) {
            console.log(response.data)
            setLoginMessage("Zalogowano poprawnie, nastąpi przekierowanie na stronę główną.");
            setTimeout(() => {
              navigate("/");
              localStorage.setItem('user-item', JSON.stringify(response.data));
              setUserData(localStorage.getItem('user-item'));
            }, 2000);
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
          <form onSubmit={handleSubmit}>
              <label htmlFor="login">Login</label><br></br>
              <input type="text" name="user" onChange={handleInputChange} /><br></br>
              <label htmlFor="password">Password</label><br></br>
              <input type="password" name="password" onChange={handleInputChange} /><br></br>
              <input type="submit" value="submit" />
          </form>
          <h3>{loginMessage}</h3>
      </>
  )}

  export default LoginForm;