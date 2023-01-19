import Home from '../views/Home';
import Login from '../views/Login';
import Signup from '../components/Signup.js';
import {Routes, Route } from 'react-router-dom';;

function AppRoutes (props) {
    return (
    <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="sign-up" element={<Signup />}></Route>
        <Route path="/" element={<Home />} />
    </Routes>
    )
}


export default AppRoutes;