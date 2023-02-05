import { useState, useContext } from 'react';
import { LoginContext } from '../App';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import React from 'react';
import LoginForm from '../components/LoginForm';
import '../App';


function Login () {
  
    return (
    <>
        <h1>Type your Login and Password</h1>
        <LoginForm />
    </>
)}
    



export default Login;