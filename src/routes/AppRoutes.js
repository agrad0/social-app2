import Home from '../views/Home';
import Login from '../components/Login';
import Signup from '../components/Signup.js';
import {Routes, Route } from 'react-router-dom';;

function AppRoutes () {
    return (
    <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="sign-up" element={<Signup />}></Route>
        <Route path="/" element={<Home />} />
    </Routes>
    )
}


export default AppRoutes;