import React from "react";
import './Post.css';
import { LoginContext } from '../App';
import { useState, useContext, useRef } from 'react';


const Post = (props) => {
    const {userData, setUserData} = useContext(LoginContext);
    
    const createdAtDate = props.postData.created_at.slice(0, 10);
    const likesCounter = props.postData.likes.length;
    const postAuthor = props.postData.user.username;
    
    let ownPost = false;


    if (userData) {
        const user = JSON.parse(userData).username;
        if (postAuthor === user) {
        ownPost = true
        }
    }



    return (
        <div className="post-container">
            <div className="avatar">
                <img src={props.postData.user.avatar_url} alt={props.postData.user.username} />
            </div>  
            <div className="post-content">
                <div className='post-header'>
                    <span className="username">{postAuthor}</span>
                    <span className='created-at-date'>Data dodania: {createdAtDate} </span>
                </div>
                <div className='post-text-container'>
                    <p className="post-text">{props.postData.content}</p>
                    <div className='button-panel'>
                        {ownPost &&
                        <button className='follow' onClick={() => props.deletePost(props.postData.id)}>Delete</button>}
                        {!ownPost &&
                        <button className='follow'>Follow</button>}  
                        <button className='like'>Like</button>
                        <span className='likes-counter'>{likesCounter}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default Post