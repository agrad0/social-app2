import { useState, useContext, useRef } from 'react';
import { LoginContext } from '../App';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import React from 'react';
import '../App';
import './AddPost.css'

const AddPost = (props) => {

const {userData, setUserData} = useContext(LoginContext);
const [postContent, setPostContent] = useState('');

    const handlePostChange = event => {
        const target = event.target;
        setPostContent(target.value);
        console.log(postContent);   
    }

    const addPost = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(postContent));
    const postData = JSON.stringify({"content": postContent});
    console.log(postData);
    const user = JSON.parse(userData);
    axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.post('https://akademia108.pl/api/social-app/post/add', postData)
        .then( (response) => {
        console.log(response)
        props.getPrevPosts();
        });
    e.target[0].value = '';
    }



    return (
        <div className='create-post'>
            <form onSubmit={addPost}>
                <textarea name='post-textarea' className='post-textarea' placeholder='Add post...' onChange={handlePostChange} />
                <input type='submit' value='Publikujże' className='submit-new-post' />
            </form>
        </div>
    )
}







export default AddPost;