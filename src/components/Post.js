import React from "react";
import './Post.css';
import { LoginContext } from '../App';
import { useState, useContext } from 'react';
import Modal from './Modal';
import axios from "axios";


const Post = (props) => {
    const {userData, setUserData, user, axiosHeader, axiosDefaults} = useContext(LoginContext);
    const createdAtDate = props.postData.created_at.slice(0, 10);
    const postAuthor = props.postData.user.username;
    const [openModal, setOpenModal] = useState(false);
    const [likesCount, setLikesCount] = useState(props.postData.likes.length);
    const [doesUserLiked, setDoesUserLiked] = useState(
        props.postData.likes.filter((like) => like.username === user?.username).length !== 0
    )
    let ownPost = false;
    
    if (userData) {
        if (postAuthor === userData.username) {
            ownPost = true;
        }
    }
    
    const likePost = () => {
        const likeData = JSON.stringify({"post_id": props.postData.id});
        axios.post('https://akademia108.pl/api/social-app/post/like', likeData)
        .then((response) => {
          console.log(response);
          setLikesCount(likesCount + 1);
          setDoesUserLiked(true);
        })
    }

    const disLikePost = () => {
        const disLikeData = JSON.stringify({"post_id": props.postData.id});
        axios.post('https://akademia108.pl/api/social-app/post/dislike', disLikeData)
        .then((response) => {
            console.log(response);
            setLikesCount(likesCount - 1);
            setDoesUserLiked(false);
        })
    }

    return (
        <>
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
                        {ownPost && userData &&
                        <button className='delete-post' onClick={() => setOpenModal(true)}>Delete</button>}
                        {!ownPost && userData &&
                        <button className='unfollow' onClick={() => props.disFollow(props.postData.user.id)}>Unfollow</button>}  
                        {!doesUserLiked && userData &&
                        <button className='like' onClick={likePost}>Like</button>}
                        {doesUserLiked && userData &&
                        <button className='like' onClick={disLikePost}>Dislike</button>}
                        <span className='likes-counter'>{likesCount}</span>
                    </div>
                </div>
            </div>
        </div>
        {ownPost && openModal && <Modal closeModal={setOpenModal} deletePost={props.deletePost} postId={props.postData.id}/>}
        </>
    )
}





export default Post